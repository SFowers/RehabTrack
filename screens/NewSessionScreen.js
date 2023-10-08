import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { styles } from '../stylesheet/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatientData, Patient, Session, Exercise } from '../patientdata/patientDataStructures';
import DropDownPicker from 'react-native-dropdown-picker';
import RepetitionsScreen from './RepetitionsScreen';
import { v4 as uuidv4 } from 'uuid';

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
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [sessionModalVisible, setSessionModalVisible] = useState(false); // State for the session modal
  const [sessions, setSessions] = useState([]);
  const [openS, setOpenS] = useState(false);
  const [valueS, setValueS] = useState(null);
  const [repetitionsModalVisible, setRepetitionsModalVisible] = useState(false);

  const openRepetitionsModal = async (index) => {
    await setSelectedExercise(exercises[index]);
    if (selectedExercise) {
      setRepetitionsModalVisible(true);
    } else {
      // Handle the case where no exercise is selected
      console.log("No exercise selected");
    }
  };
  
  // Function to close the RepetitionsScreen modal
  const closeRepetitionsModal = () => {
    setRepetitionsModalVisible(false);
  };
  // Function to add a new exercise to the selected session
  const addExercise = () => {
    if (selectedPatient && selectedSession) {
      const exerciseID = uuidv4();
      // Sample exercise data (you should replace this with actual exercise data)
      const sampleExercise = {
        id: exerciseID,
        exerciseName: 'New Exercise',
        repetitions: 0,
      };

      // Add the new exercise to the selected session
      selectedSession.exercises.push(sampleExercise);

      // Update the patientData with the new exercise
      const updatedPatientData = { ...patientData };
      updatedPatientData.patients = updatedPatientData.patients.map((patient) => {
        if (patient.patientName === selectedPatient.patientName) {
          return selectedPatient; // Update the selected patient with the new session and exercise
        }
        return patient; // Keep other patients as they are
      });

      // Save the updated patient data to AsyncStorage
      AsyncStorage.setItem('Patient Data', JSON.stringify(updatedPatientData))
        .then(() => {
          // Update the exercises state
          setExercises([...selectedSession.exercises]);
        })
        .catch((error) => {
          console.error('Error saving patient data:', error);
        });
    } else {
      console.log("No patient or session assigned");
    }
  };
  
  // Inside your updateExercise function in NewSessionScreen.js
  const updateExercise = (exerciseId, exerciseName, repetitions) => {
    if (selectedPatient && selectedSession) {
      // Find the exercise by ID in the selected session's exercises array
      const updatedExercises = exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return { ...exercise, exerciseName, repetitions }; // Update exerciseName and repetitions
        }
        return exercise;
      });
  
      setExercises(updatedExercises);
  
      // Update the patientData with the updated exercise data
      const updatedPatientData = { ...patientData };
      updatedPatientData.patients = updatedPatientData.patients.map((patient) => {
        if (patient.patientName === selectedPatient.patientName) {
          const updatedSessions = patient.sessions.map((session) => {
            if (session.sessionDateTime === selectedSession.sessionDateTime) {
              const updatedSession = { ...session };
              updatedSession.exercises = updatedExercises;
              return updatedSession;
            }
            return session;
          });
          return { ...patient, sessions: updatedSessions };
        }
        return patient;
      });
  
      // Save the updated patient data to AsyncStorage
      AsyncStorage.setItem('Patient Data', JSON.stringify(updatedPatientData))
        .then(() => {
          // Data saved successfully
          console.log('Exercise data updated and saved to AsyncStorage.');
        })
        .catch((error) => {
          console.error('Error saving patient data:', error);
        });
    }
  };

  // Function to add a new session to the selected patient
  const addSession = () => {
    if (selectedPatient) {
      const currentDateTime = new Date().toISOString();

      // Create a new session with the current timestamp
      const newSession = new Session(currentDateTime);
      selectedPatient.sessions.push(newSession);
      
      // Update the patientData with the new session
      const updatedPatientData = { ...patientData };
      updatedPatientData.patients = updatedPatientData.patients.map((patient) => {
        if (patient.patientName === selectedPatient.patientName) {
          return selectedPatient; // Update the selected patient with the new session
        }
        return patient; // Keep other patients as they are
      });

      // Save the updated patient data to AsyncStorage
      AsyncStorage.setItem('Patient Data', JSON.stringify(updatedPatientData))
        .then(() => {
          // Set the newly added session as the selected session
          setSelectedSession(newSession);
          
          // Close the session modal
          setSessionModalVisible(false);
        })
        .catch((error) => {
          console.error('Error saving patient data:', error);
        });

        setExercises([]);
    } else {
      console.log("No patient assigned");
    }
  };
  

  // Function to handle the selection of a session from the DropDownPicker
  const handleSessionSelection = (sessionName) => {
    const foundSession = selectedPatient.sessions.find((session) => session.sessionDateTime === sessionName);
    if (foundSession) {
      setExercises([]);
      setSelectedSession(foundSession);

      // Update the exercises state with the exercises of the selected session
      setExercises([...foundSession.exercises]);
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
        {selectedPatient ? (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              if (selectedPatient) {
                setSessionModalVisible(!sessionModalVisible);
              } else {
                alert('No Patient Selected');
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
                alert('No Patient/Session Selected');
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


      <ScrollView style={styles.exerciseList}>
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exerciseItem}
              onPress={() => {
                //console.log(index);
                openRepetitionsModal(index); // This function will open the modal conditionally
              }}
            >
              <Text style={styles.exerciseText}>{exercise.exerciseName}</Text>
              <Text style={styles.exerciseCount}>{exercise.repetitions}</Text>
            </TouchableOpacity>
          ))          
        ) : (
          <Text style={styles.noExerciseText}>No exercises added to this session</Text>
        )}
      </ScrollView>

      <RepetitionsScreen
        visible={repetitionsModalVisible}
        onClose={closeRepetitionsModal}
        onSave={(exerciseId, exerciseName, repetitions) => {
          // Update exercise in NewSessionScreen's state and save to storage
          updateExercise(exerciseId, exerciseName, repetitions);
        }}
        exercise={selectedExercise} // Pass the selected exercise to the modal
      />

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
            <DropDownPicker
              placeholder='Select a Session or Add New'
              searchable={true}
              items={sessions}
              open={openS}
              value={valueS}
              setOpen={setOpenS}
              setValue={setValueS}
              setItems={setItems}
              onSelectItem={(item) => {
                handleSessionSelection(item.value);
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={addSession}
            >
              <Text style={styles.textStyle}>Add New Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
