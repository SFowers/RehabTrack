import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../stylesheet/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatientData, Patient, Session, Exercise } from '../patientdata/patientDataStructures';

export default function NewSessionScreen() {
  const [patientData, setPatientData] = useState(new PatientData());
  const [patientText, onChangePatientText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]); // State to store selected exercises
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);


  // Function to add exercises to the session state
  const addExercise = () => {
    if (selectedPatient) {
      setSelectedExercises([...selectedExercises, exercise]);
    } else {
      // Handle the case where no patient has been assigned
      // You can show an alert or take any other action here
      console.log("No patient assigned");
    }
  };
  

  // Function to save the session with selected exercises
  // Function to save the session with selected exercises
const saveSession = async () => {
  try {
    // Create a new session with the current timestamp
    const newSession = new Session(new Date().toISOString());
    newSession.exercises = selectedExercises;

    // Create a new patient with the entered patient name
    const newPatient = new Patient(patientText);
    
    // Add the new session to the new patient
    newPatient.sessions.push(newSession);

    // Add the new patient to patientData
    const updatedPatientData = { ...patientData };
    updatedPatientData.patients.push(newPatient);

    // Save the updated patient data to AsyncStorage
    await AsyncStorage.setItem('Patient Data', JSON.stringify(updatedPatientData));
    
    // Close the modal
    setModalVisible(false);
  } catch (error) {
    console.error('Error saving session:', error);
  }
};


  const loadPatientData = async () => {
    try {
      const data = await AsyncStorage.getItem('Patient Data');
      if (data) {
        const parsedData = JSON.parse(data);
        setPatientData(parsedData);
      }
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
      <StatusBar style="auto" />

      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => {
            setSelectedPatient(patientText);
            setSelectedSession(new Session(new Date().toISOString())); // Create a new session
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles.buttonText}>New Patient</Text>
          <Icon name="plus" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => {
            setSelectedPatient(patientText);
            setSelectedSession(null); // Clear the selected session when assigning a new patient
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles.buttonText}>Assign Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            if (selectedPatient) {
              addExercise();
            } else {
              // Handle the case where no patient has been assigned
              // You can show an alert or take any other action here
            }
          }}
        >
          <Text style={styles.buttonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              onChangeText={(text) => onChangePatientText(text)}
              value={patientText}
              placeholder="Patient Name"
              style={styles.input}
            />

            {/* Exercise selection and input goes here */}
            {/* Example: */}
            {/* <ExerciseSelection onAddExercise={addExercise} /> */}
            {/* <ExerciseInput onAddExercise={addExercise} /> */}

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={saveSession}
            >
              <Text style={styles.textStyle}>Save Session</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.exerciseList}>
        {selectedSession && selectedSession.exercises.length > 0 ? (
          selectedSession.exercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exerciseItem}
              onPress={() => {
                // Handle navigation to exercise details screen here
              }}
            >
              <Text style={styles.exerciseText}>{exercise.name}</Text>
              <Text style={styles.exerciseCount}>{exercise.count}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noExerciseText}>No exercises added to this session</Text>
        )}
      </View>

    </View>
  );
}
