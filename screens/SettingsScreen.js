import React from 'react';
import { StatusBar, Text, View, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../stylesheet/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PatientData from '../patientdata/patientDataStructures';
import Patient from '../patientdata/patientDataStructures';
import Session from '../patientdata/patientDataStructures';
import Exercise from '../patientdata/patientDataStructures';

export default function SettingsScreen({ navigation }) {
  // Function to clear AsyncStorage data
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      // Optionally, you can navigate back to the Home screen or perform any other action
      // navigation.navigate('Home'); // Uncomment this line to navigate back
      Alert.alert('Data Cleared', 'All data has been cleared from AsyncStorage.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  // Function to add dummy data
  const addDummyData = async () => {
    try {
      const patientData = new PatientData();
      
      // Dummy Patient 1
      const patient1 = new Patient('Patient 1');
      const session1 = new Session('2023-09-20T10:00:00');
      session1.addExercise('Exercise 1', 10);
      patient1.sessions.push(session1);
      patientData.patients.push(patient1);
  
      // Dummy Patient 2
      const patient2 = new Patient('Patient 2');
      const session2 = new Session('2023-09-21T14:30:00');
      session2.addExercise('Exercise 2', 8);
      patient2.sessions.push(session2);
      patientData.patients.push(patient2);
  
      await patientData.saveToStorage();
      Alert.alert('Dummy Data Added', 'Dummy data has been added to AsyncStorage.');
    } catch (error) {
      console.error('Error adding dummy data to AsyncStorage:', error);
    }
  };  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Show an alert to confirm data clearing
          Alert.alert(
            'Confirm Data Clear',
            'Are you sure you want to clear all data from AsyncStorage?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Data clear cancelled'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => clearAsyncStorage(), // Call the clearAsyncStorage function
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Text style={styles.buttonText}>Clear Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Show an alert to confirm adding dummy data
          Alert.alert(
            'Add Dummy Data',
            'Are you sure you want to add dummy patient data to AsyncStorage?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Adding dummy data cancelled'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => addDummyData(), // Call the addDummyData function
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Text style={styles.buttonText}>Add Dummy Data</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

