import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { styles } from '../stylesheet/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatientData, Patient, Session, Exercise } from '../patientdata/patientDataStructures';
//import { saveDataToStorage, loadDataFromStorage, patientData } from '../patientdata/patientDataStructures';

export default function SettingsScreen({ navigation }) {
  // Function to clear AsyncStorage data
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      // Optionally, you can navigate back to the Home screen or perform any other action
      // navigation.navigate('Home'); // Uncomment this line to navigate back
      console.log("Data Storage Cleared");
      Alert.alert('Data Cleared', 'All data has been cleared from AsyncStorage.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  
  const key = "Patient Data";
  const [patientRecords, setPatientRecords] = useState([]);
  // Function to add dummy data
  const addDummyData = async () => {
    try {
      
      const patientData = new PatientData();
      // Dummy Patient 1
      const patient1 = new Patient('Patient 1');
      const session1 = new Session('2023-09-20T10:00:00');
      session1.addExercise('Exercise 1', 10);
      session1.addExercise('Exercise 1', 12);
      session1.addExercise('Exercise 1', 15);
      session1.addExercise('Exercise 1', 12);
      patient1.sessions.push(session1);
      patientData.patients.push(patient1);
      //Dummy Patient 2
      const patient2 = new Patient('Patient 2');
      const session2 = new Session('2023-09-21T14:30:00');
      const session4 = new Session('2023-08-13T14:30:00')
      session2.addExercise('Exercise 2', 8);
      session2.addExercise('Arm Stretch', 3);
      session2.addExercise('Arm Stretch', 6);
      session4.addExercise('Exercise 2', 12);
      session4.addExercise('Arm Stretch', 5)
      session4.addExercise('Arm Stretch', 8)
      patient2.sessions.push(session2);
      patient2.sessions.push(session4);
      patientData.patients.push(patient2);
      // Dummy Patient 3
      const patient3 = new Patient('Patient 3');
      const session3 = new Session('2023-09-20T10:00:00');
      session3.addExercise('Exercise 3', 10);
      patient3.sessions.push(session3);
      patientData.patients.push(patient3);
      // Serialize the session object to a JSON string
      const patientStorage = JSON.stringify(patientData);

      await AsyncStorage.setItem(key, patientStorage);
      console.log("Data Saved");
      Alert.alert('Dummy Data Added', 'Dummy data has been added to AsyncStorage.');
    } catch (error) {
      console.error('Error adding dummy data to AsyncStorage:', error);
    }
  };  

  const checkdata = async () => {
    //const patientData2 = new PatientData();
    //console.log(await patientData2.loadFromStorage);
    const storedPatientData = await AsyncStorage.getItem(key);
    const parsedPatientRecords = JSON.parse(storedPatientData);
    setPatientRecords(parsedPatientRecords);
    console.log(key + ' ' + storedPatientData);
    //const pdata = loadDataFromStorage('patientData');
    //console.log("\nSESSIONS: " + pdata[0].patientName);
  };

  const loadPatientData = async () => {
    try {
      const storedPatientData = await AsyncStorage.getItem(key);
      const parsedPatientData = JSON.parse(storedPatientData);
      setPatientRecords(parsedPatientData);
      console.log("attempting load");
    } catch (error) {
      console.error('Error loading patient data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // Load patient data when the component mounts
    loadPatientData();
  }, []);

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
      <TouchableOpacity onPress={() => {checkdata()}}><Text>Check</Text></TouchableOpacity>
      <View>
        <Text>Settings</Text>
        {/* Display patientRecords data */}
        <Text>Patient Records:</Text>
        <Text>{JSON.stringify(patientRecords, null, 2)}</Text>
        <Button title="Load Data" onPress={loadPatientData} />
      </View>
      <StatusBar style="auto" />
    </View>
    
  );
}

