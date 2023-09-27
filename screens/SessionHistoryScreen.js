import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../stylesheet/Style';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SessionHistoryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [sessions, setSessions] = useState([]);
  const patientName = route.params?.patientName || ''; // Get the patient name from route params

  // Function to load sessions for the selected patient
  const loadSessionsForPatient = async () => {
    try {
      // Load patient data from storage (you need to implement this)
      const storedPatientData = await AsyncStorage.getItem('Patient Data');
      const patientData = JSON.parse(storedPatientData);

      // Find the patient with the matching name
      const patient = patientData.patients.find(
        (patient) => patient.patientName === patientName
      );

      if (patient) {
        // Set the sessions for the selected patient
        setSessions(patient.sessions);
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    loadSessionsForPatient();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.headerText}>{patientName}</Text>

      {sessions.map((session, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navButton}
          onPress={() => navigation.navigate('Session', { patientName, exerciseId: index })}
        >
          <Text style={styles.buttonText}>{formatDateTime(session.sessionDateTime)}</Text>
          <Text style={styles.buttonCount}>{session.exercises.length}</Text>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

