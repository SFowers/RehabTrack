import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { styles } from '../stylesheet/Style';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatientData, Patient, Session, Exercise } from '../patientdata/patientDataStructures';

export default function PatientRecordsScreen() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [patientData, setPatientData] = useState({ patients: [] });
  const [patientText, onChangePatientText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Function to load patient data from AsyncStorage
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
    loadPatientData();
  }, []);

  const savePatient = async () => {
    try {
      // Create a new patient with the entered patient name
      const newPatient = new Patient(patientText);
  
      // Add the new patient to patientData
      const updatedPatientData = { ...patientData };
      updatedPatientData.patients.push(newPatient);
  
      // Save the updated patient data to AsyncStorage
      await AsyncStorage.setItem('Patient Data', JSON.stringify(updatedPatientData));
      
      // Close the modal
      setModalVisible(false);
      await loadPatientData();
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => navigation.navigate('Patient', { patientName: item.patientName })}
    >
      <Text style={styles.navText}>{item.patientName}</Text>
      <Icon name="right" size={30} />
    </TouchableOpacity>
  );

  const handlePatientSelection = (selectedPatientName) => {
    // Navigate to the selected patient's screen
    navigation.navigate('Patient', { patientName: selectedPatientName });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => {
            setSelectedPatient(patientText);
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles.buttonText}>New Patient</Text>
          <Icon name="plus" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.selectionContainer}>
        <DropDownPicker
          placeholder='Select or Search for a Patient'
          searchable={true}
          items={items}
          open={open}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={(item) => {
            //console.log(item);
            handlePatientSelection(item.value);
          }}
        />
      </View>

      <FlatList
        data={patientData.patients}
        renderItem={renderItem}
        keyExtractor={(item) => item.patientName}
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

            {/* Exercise selection and input goes here */}
            {/* Example: */}
            {/* <ExerciseSelection onAddExercise={addExercise} /> */}
            {/* <ExerciseInput onAddExercise={addExercise} /> */}

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={savePatient}
            >
              <Text style={styles.textStyle}>Add New Patient</Text>
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
    </View>
  );
}



