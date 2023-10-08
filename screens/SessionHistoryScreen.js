import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
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
        // Sort sessions by sessionDateTime in descending order (most recent first)
        const sortedSessions = patient.sessions.sort((a, b) => {
          return new Date(b.sessionDateTime) - new Date(a.sessionDateTime);
        });
      
        // Set the sorted sessions and original sessions for the selected patient
        setSessions(sortedSessions);
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
    // Load sessions for the selected patient when the component mounts
    loadSessionsForPatient();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
  
      <Text style={styles.headerText}>{patientName}</Text>
  
      <ScrollView>
        {sessions.map((session, index) => (
          // Render each session as a touchable button
          <TouchableOpacity
            key={index}
            style={styles.navButton}
            onPress={() => {
              // Navigate to the individual session screen with patientName and sessionDateTime as parameters
              navigation.navigate('Session', { patientName, SDT: session.sessionDateTime })
            }}
          >
            <Text style={styles.buttonText}>{formatDateTime(session.sessionDateTime)}</Text>
            <Text style={styles.buttonCount}>{session.exercises.length}</Text>
            <Icon name="edit" size={30} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={[styles.navButton]}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" size={30} />
        <Text style={styles.navText}>Return to Home</Text>
        <Icon name="right" size={30} />
      </TouchableOpacity>
    </View>
  );
}