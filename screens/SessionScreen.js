import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../stylesheet/Style';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatientData, Patient, Session, Exercise } from '../patientdata/patientDataStructures';

export default function SessionScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientName, exerciseId } = route.params || {};
  const [exercise, setExercise] = useState(null);
  const [sessionDateTime, setSessionDateTime] = useState('');

  // Function to load exercise data for the selected exerciseId
  const loadExerciseData = async () => {
    try {
      const storedPatientData = await AsyncStorage.getItem("Patient Data");
      const patientData = JSON.parse(storedPatientData);
      
      // Find the patient with the matching name
      const patient = patientData.patients.find(patient => patient.patientName === patientName);

      if (patient && patient.sessions && exerciseId >= 0 && exerciseId < patient.sessions.length) {
        const session = patient.sessions[exerciseId];
        // Set the exercise data for the selected exerciseId
        setExercise(session.exercises);

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

      {/* Display the exercises and navigate to RepetitionsScreen */}
      {exercise && exercise.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navButton}
          onPress={() => navigation.navigate('Repetitions', { exerciseName: exercise.exerciseName })} // Pass exerciseName to RepetitionsScreen
        >
          <Text style={styles.buttonText}>{exercise.exerciseName}</Text>
          <Text style={styles.buttonCount}>{exercise.repetitions}</Text>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
      ))}
    </View>
  );
}




