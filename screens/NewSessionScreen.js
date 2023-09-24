import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../stylesheet/Style';
import { useNavigation } from '@react-navigation/native';

import PatientData from '../patientdata/patientDataStructures';
import Patient from '../patientdata/patientDataStructures';
import Session from '../patientdata/patientDataStructures';
import Exercise from '../patientdata/patientDataStructures';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewSessionScreen() {
  const [patientData, setPatientData] = useState(new PatientData());
  const navigation = useNavigation();
  const [patientText, onChangePatientText] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);

  async function loadPatientData() {
    try {
      const data = await AsyncStorage.getItem('patientData');
      if (data) {
        const parsedData = JSON.parse(data);
        setPatientData(new PatientData(parsedData));
      }
    } catch (error) {
      console.error('Error loading patient data from AsyncStorage:', error);
    }
    console.log(patientData);
  }

  useEffect(() => {
    // Load patient data when the component mounts
    loadPatientData();
  }, []);
  
  async function addAndSavePatient(pName) {
    if (pName) {
      const newPatient = new Patient(pName);
      patientData.addPatient(newPatient);
      await patientData.saveToStorage(); // Save changes to AsyncStorage
    }
    console.log(patientData);
  }

  //Add exercise and create session if no existing exercises
  async function addExercise() {

  }

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.selectionContainer}>
          <TouchableOpacity style={styles.selectorButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.buttonText}>New Patient</Text>
            <Icon name="plus" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectorButton}>
            <Text style={styles.buttonText}>Assign Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              addExercise();
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
            //Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <TextInput
              //onChangeText={onChangePatientText}
              onChangeText={(text) => onChangePatientText(text)}
              value={patientText}
              placeholder="Patient Name"
              style={styles.input}
            />

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  if (patientText) {
                    addAndSavePatient(patientText);
                  }
                }}
              >
                <Text style={styles.textStyle}>Add New Patient</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.navButton}
          onPress={() => navigation.navigate("Repetitions")}>
          <Text style={styles.buttonText}>Repetition Exercise 1</Text>
          <Text style={styles.buttonCount}>12</Text>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}
          onPress={() => navigation.navigate("Repetitions")}>
          <Text style={styles.buttonText}>Repetition Exercise 2</Text>
          <Text style={styles.buttonCount}>8</Text>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}
          onPress={() => navigation.navigate("Repetitions")}>
          <Text style={styles.buttonText}>Repetition Exercise 3</Text>
          <Text style={styles.buttonCount}>3</Text>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
      </View>
    );
}