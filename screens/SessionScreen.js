import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../stylesheet/Style';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SessionScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName, SDT } = route.params || {};
  const [exercises, setExercises] = useState([]);
  const [sessionDateTime, setSessionDateTime] = useState('');

  // Function to load exercise data for the selected patient
  const loadExerciseData = async () => {
    try {
      const storedPatientData = await AsyncStorage.getItem("Patient Data");
      const patientData = JSON.parse(storedPatientData);
  
      // Find the patient with the matching name
      const patient = patientData.patients.find((patient) => patient.patientName === patientName);
  
      if (patient) {
        // Find the session based on sessionDateTime (SDT)
        const session = patient.sessions.find((s) => s.sessionDateTime === SDT);
  
        if (session) {
          // Set the exercise data
          setExercises(session.exercises);
  
          // Format the session date time
          setSessionDateTime(new Date(session.sessionDateTime).toLocaleString());
        }
      }
    } catch (error) {
      console.error('Error loading exercise data:', error);
    }
  };

  const deleteSession = async () => {
    try {
      const storedPatientData = await AsyncStorage.getItem('Patient Data');
      const patientData = JSON.parse(storedPatientData);
  
      // Find the patient with the matching name
      const patientIndex = patientData.patients.findIndex(
        (patient) => patient.patientName === patientName
      );
  
      if (patientIndex !== -1) {
        // Find the session based on sessionDateTime (SDT)
        const sessionIndexToDelete = patientData.patients[patientIndex].sessions.findIndex(
          (session) => session.sessionDateTime === SDT
        );
  
        if (sessionIndexToDelete !== -1) {
          // Remove the session with the specified index
          patientData.patients[patientIndex].sessions.splice(sessionIndexToDelete, 1);
  
          // Save the updated patient data to AsyncStorage
          await AsyncStorage.setItem('Patient Data', JSON.stringify(patientData));
  
          // Navigate back to the previous screen (e.g., SessionHistoryScreen)
          navigation.navigate('Patient', { patientName: patientName });
        }
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      Alert.alert('Error', 'Failed to delete session.');
    }
  };  

  useEffect(() => {
    loadExerciseData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
  
      <Text style={styles.headerText}>{patientName}'s Session</Text>
      <Text style={styles.headerText}>{sessionDateTime}</Text>
  
      {/* Display the exercises */}
      <ScrollView>
        {exercises && exercises.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navButton}
            // Pass exerciseName to RepetitionsScreen
          >
            <Text style={styles.buttonText}>{exercise.exerciseName}</Text>
            <Text style={styles.buttonCount}>{exercise.repetitions}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: 'red' }]}
        onPress={() => deleteSession()}
      >
        <Text style={styles.deleteButtonText}>Delete Session</Text>
      </TouchableOpacity>
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