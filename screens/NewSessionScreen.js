import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../stylesheet/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatientData, Patient, Session, Exercise } from '../patientdata/patientDataStructures';
import DropDownPicker from 'react-native-dropdown-picker';
import RepetitionsScreen from './RepetitionsScreen';

export default function NewSessionScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [patientData, setPatientData] = useState(new PatientData());
  const [patientText, onChangePatientText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [exercises, setExercises] = useState([]); // State to store exercises
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionModalVisible, setSessionModalVisible] = useState(false); // State for the session modal
  const [sessions, setSessions] = useState([]);
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);

  const handleExerciseOpenModal = () => {
    // Show the modal when exercise is selected
    setIsModalVisible(true);
  };
  const handleExerciseCloseModal = () => {
    // Close the modal
    setExerciseModalVisible(false);
  };
  // Function to add exercises to the session state
  const addExercise = () => {
    if (selectedPatient && selectedSession) {
      // Sample exercise data (you should replace this with actual exercise data)
      const sampleExercise = {
        name: 'New Exercise',
        count: 0, // Change this to the actual count
      };

      setExercises([...exercises, sampleExercise]);
      console.log(exercises);
    } else {
      // Handle the case where no patient or session has been assigned
      console.log("No patient or session assigned");
    }
  };

  const addSession = () => {
    if (selectedPatient) {
      const currentDateTime = new Date().toISOString();

      // Create a new session with the current timestamp
      const newSession = new Session(currentDateTime);
      selectedPatient.sessions.push(newSession);
      
      setSessions(selectedPatient.sessions.map((session) => ({
        label: new Date(session.sessionDateTime).toLocaleString(),
        value: session.sessionDateTime
      })));
      // Set the newly added session as the selected session
      setSelectedSession(newSession);
      
      // Close the session modal
      setSessionModalVisible(false);
    } else {
      console.log("No patient assigned");
    }
  };
  

  // Function to handle the selection of a session from the DropDownPicker
  const handleSessionSelection = (sessionName) => {
    const foundSession = selectedPatient.sessions.find((session) => session.sessionDateTime === sessionName);
    if (foundSession) {
      setSelectedSession(foundSession);
    } else {
      setSelectedSession(null); // Set to null if the session is not found
    }
    toggleSessionModal(); // Close the session modal
  };


  // Function to toggle the visibility of the session modal
  const toggleSessionModal = () => {
    if(selectedPatient) {
      setSessionModalVisible(!sessionModalVisible);
    } else {
      console.log("No patient assigned");
    }
  };

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

  const setPatient = (patientName) => {
    const foundPatient = patientData.patients.find((patient) => patient.patientName === patientName);
    if (foundPatient) {
      setSelectedPatient(foundPatient);
      setSessions(foundPatient.sessions.map((session) => ({
        label: new Date(session.sessionDateTime).toLocaleString(),
        value: session.sessionDateTime
      })));
    } else {
      setSelectedPatient(null); // Set to null if the patient is not found
      setSessions([]);
    }
  }


  const loadPatientData = async () => {
    try {
      const data = await AsyncStorage.getItem('Patient Data');
      if (data) {
        const parsedData = JSON.parse(data);
        setPatientData(parsedData);
        setItems(parsedData.patients.map((patient) => ({
          label: patient.patientName,
          value: patient.patientName,
        })));
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
        <DropDownPicker
          placeholder='Select a Patient'
          searchable={true}
          items={items}
          open={open}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={(item) => {
            //console.log(item);
            setPatient(item.value);
          }}
        />
      </View>

      <View style={styles.selectionContainer}>
        {/*}
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
        */}
        {selectedPatient ? (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              if (selectedPatient) {
                setSessionModalVisible(!sessionModalVisible);
              } else {
                // Handle the case where no patient has been assigned
                // You can show an alert or take any other action here
              }
            }}
          >
            <Text style={styles.buttonText}>Select Session</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.disabledButton}>
            <Text style={styles.buttonText}>Select Session</Text>
          </View>
        )}
        {selectedSession ? (
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
        ) : (
          <View style={styles.disabledButton}>
            <Text style={styles.buttonText}>Add Exercise</Text>
          </View>
        )}
      </View>

      <Text style={styles.headerText}>{selectedPatient.patientName}</Text>
      <Text style={styles.headerText}>
        {selectedSession ? new Date(selectedSession.sessionDateTime).toLocaleString() : "No session selected"}
      </Text>


      <View style={styles.exerciseList}>
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exerciseItem}
              onPress={handleExerciseOpenModal}
            >
              <Text style={styles.exerciseText}>{exercise.name}</Text>
              <Text style={styles.exerciseCount}>{exercise.count}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noExerciseText}>No exercises added to this session</Text>
        )}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={sessionModalVisible}
        onRequestClose={() => {
          toggleSessionModal();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Add a DropDownPicker to select a session */}
            <DropDownPicker
              placeholder='Select a Session or Add New'
              searchable={true}
              items={sessions}
              open={open}
              value={value}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onSelectItem={(item) => {
                handleSessionSelection(item.value);
              }}
            />

            {/* Add an option to add a new session */}
            <TouchableOpacity
              style={styles.button}
              onPress={addSession}
            >
              <Text style={styles.textStyle}>Add New Session</Text>
            </TouchableOpacity>

            {/* Add exercise selection and input here */}
          </View>
        </View>
      </Modal>

      
    </View>
  );
}
