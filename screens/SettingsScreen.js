import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Alert, Button, FlatList, TextInput } from 'react-native';
import { styles } from '../stylesheet/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatientData, Patient, Session, Exercise } from '../patientdata/patientDataStructures';

export default function SettingsScreen({ navigation }) {
  const [exercises, setExercises] = useState([]); // State to manage the list of exercises
  const [newExercise, setNewExercise] = useState(''); // State to store the new exercise name
  const exerciseListKey = 'Exercise List';

  // Function to add a new exercise to the list
  const addExercise = async () => {
    try {
      if (newExercise.trim() !== '') {
        // Add the new exercise to the list
        const updatedExercises = [...exercises, newExercise];
        setExercises(updatedExercises);

        // Serialize the updated exercise list to a JSON string
        const exerciseListStorage = JSON.stringify(updatedExercises);

        // Save the updated exercise list to AsyncStorage
        await AsyncStorage.setItem(exerciseListKey, exerciseListStorage);
        console.log("Exercise Added:", newExercise);
        Alert.alert('Exercise Added', `The exercise "${newExercise}" has been added to the list.`);
        setNewExercise(''); // Clear the input field
      } else {
        Alert.alert('Error', 'Please enter a valid exercise name.');
      }
    } catch (error) {
      console.error('Error adding exercise to AsyncStorage:', error);
    }
  };

  // Function to remove an exercise from the list
  const removeExercise = (exerciseToRemove) => {
    const updatedExercises = exercises.filter((exercise) => exercise !== exerciseToRemove);
    setExercises(updatedExercises);
    saveExerciseList(updatedExercises); // Save the updated list to AsyncStorage
  };

  // Function to clear all exercises from storage
  const clearExerciseList = async () => {
    try {
      await AsyncStorage.removeItem(exerciseListKey);
      setExercises([]); // Clear the exercises in state
      console.log("Exercise List Cleared");
      Alert.alert('Exercise List Cleared', 'All exercises have been cleared from AsyncStorage.');
    } catch (error) {
      console.error('Error clearing exercise list from AsyncStorage:', error);
    }
  };

  // Function to save the exercise list to AsyncStorage
  const saveExerciseList = async (exerciseList) => {
    try {
      const exerciseListStorage = JSON.stringify(exerciseList);
      await AsyncStorage.setItem(exerciseListKey, exerciseListStorage);
    } catch (error) {
      console.error('Error saving exercise list to AsyncStorage:', error);
    }
  };

  // Function to load the exercise list from AsyncStorage
  const loadExerciseList = async () => {
    try {
      const storedExerciseList = await AsyncStorage.getItem(exerciseListKey);
      if (storedExerciseList) {
        const parsedExerciseList = JSON.parse(storedExerciseList);
        setExercises(parsedExerciseList);
      }
    } catch (error) {
      console.error('Error loading exercise list from AsyncStorage:', error);
    }
  };

  // Function to clear AsyncStorage data
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
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
    const storedPatientData = await AsyncStorage.getItem(key);
    const parsedPatientRecords = JSON.parse(storedPatientData);
    setPatientRecords(parsedPatientRecords);
    console.log(key + ' ' + storedPatientData);
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
    loadExerciseList();
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

      <View style={styles.addExerciseContainer}>
        <TextInput
          style={styles.addExerciseInput}
          placeholder="Enter a new exercise"
          value={newExercise}
          onChangeText={(text) => setNewExercise(text)}
        />
        <TouchableOpacity
          style={styles.addExerciseButton}
          onPress={() => addExercise()}
        >
          <Text style={styles.buttonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.exerciseListContainer}>
        <Text style={styles.titleText}>Exercise List:</Text>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseListItemContainer}>
            <Text style={styles.exerciseListItem}>{exercise}</Text>
            <TouchableOpacity onPress={() => {
              Alert.alert(
                'Delete exercise',
                'Are you sure you want to delete ' + exercise + '?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Exercise deletion cancelled'),
                    style: 'cancel',
                  },
                  {
                    text: 'Confirm Delete',
                    onPress: () => removeExercise(exercise),
                  },
                ],
                { cancelable: false }
              );
            }}
              style={{
                backgroundColor:'gray',
                padding: 10,
                margin: 5,
                borderRadius: 5,
              }}
            >
              <Text style={styles.removeExerciseText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Show an alert to confirm clearing the exercise list
          Alert.alert(
            'Confirm Clear Exercise List',
            'Are you sure you want to clear all exercises from the list and storage?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Clear exercise list cancelled'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => clearExerciseList(),
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Text style={styles.buttonText}>Clear Exercise List</Text>
      </TouchableOpacity>
    </View>
  );
}