import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../stylesheet/Style';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SessionScreen() {
  const route = useRoute();
  const { patientName } = route.params || {};
  const [exercises, setExercises] = useState([]);
  const [sessionDateTime, setSessionDateTime] = useState('');

  // Function to load exercise data for the selected patient
  const loadExerciseData = async () => {
    try {
      const storedPatientData = await AsyncStorage.getItem("Patient Data");
      const patientData = JSON.parse(storedPatientData);

      // Find the patient with the matching name
      const patient = patientData.patients.find(patient => patient.patientName === patientName);

      if (patient && patient.sessions.length > 0) {
        // Let's assume we are loading exercises from the first session
        const session = patient.sessions[0]; // Change this logic as needed
        // Set the exercise data
        setExercises(session.exercises);

        // Format the session date time
        setSessionDateTime(new Date(session.sessionDateTime).toLocaleString());
      }
    } catch (error) {
      console.error('Error loading exercise data:', error);
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
      {exercises && exercises.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navButton}
           // Pass exerciseName to RepetitionsScreen
        >
          <Text style={styles.buttonText}>{exercise.exerciseName}</Text>
          <Text style={styles.buttonCount}>{exercise.repetitions}</Text>
          {/*<Icon name="edit" size={30} />*/}
        </TouchableOpacity>
      ))}
    </View>
  );
}





