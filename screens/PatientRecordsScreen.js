import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
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
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientData, setPatientData] = useState({ patients: [] });

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
    setSelectedPatient(selectedPatientName); // Update the selectedPatient state
    // Navigate to the selected patient's screen
    navigation.navigate('Patient', { patientName: selectedPatientName });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.selectionContainer}>
        <TouchableOpacity style={styles.selectorButton}>
          <Text style={styles.buttonText}>New Patient</Text>
          <Icon name="plus" size={30} />
        </TouchableOpacity>
        <DropDownPicker
          items={patientData.patients.map((patient) => ({
            label: patient.patientName,
            value: patient.patientName,
          }))}
          defaultValue={selectedPatient}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdownStyle}
          itemStyle={styles.dropdownItemStyle}
          onChangeItem={(item) => handlePatientSelection(item.value)}
        />
      </View>

      <FlatList
        data={patientData.patients}
        renderItem={renderItem}
        keyExtractor={(item) => item.patientName}
      />
    </View>
  );
}



