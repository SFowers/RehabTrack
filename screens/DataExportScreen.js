import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../stylesheet/Style';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
 
export default function DataExportScreen({ navigation, route }) {
  // let patientRecords = route.params.patientRecords;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'patient1', value: 'patient 1' },
    { label: 'patient2', value: 'patient 2' }
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };
 
  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };
 
  // Define the path to save the CSV file
  const getPath = (name) => `${FileSystem.documentDirectory}${name}.csv`;
 
  const exportAllData = async (patientRecords) => {
    let csvData = [];
 
    patientRecords.patientsList.forEach(patient => {
      patient.sessionsList.forEach(session => {
        session.exercisesList.forEach(exercise => {
          csvData.push({
            'Patient Name': patient.name,
            'Session Date': session.dateTime,
            'Exercise Name': exercise.name,
            'Repetitions': exercise.reps
          });
        });
      });
    });
 
    let csv = Papa.unparse(csvData);
    try {
      await FileSystem.writeAsStringAsync(getPath("exported_data"), csv);
      console.log('Data exported successfully.');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };
 
  const exportRangeData = async (patientRecords, startDate, endDate) => {
    let csvData = [];
 
    patientRecords.patientsList.forEach(patient => {
      patient.sessionsList.forEach(session => {
        const sessionDate = new Date(session.dateTime);
        if (sessionDate >= startDate && sessionDate <= endDate) {
          session.exercisesList.forEach(exercise => {
            csvData.push({
              'Patient Name': patient.name,
              'Session Date': session.dateTime,
              'Exercise Name': exercise.name,
              'Repetitions': exercise.reps
            });
          });
        }
      });
    });

    let csv = Papa.unparse(csvData);
    try {
      await FileSystem.writeAsStringAsync(getPath("exported_range_data"), csv);
      console.log('Range data exported successfully.');
    } catch (error) {
      console.error('Error exporting range data:', error);
    }
  };
 
  const exportPatientData = async (patientRecords, patientName) => {
    let csvData = [];
 
    const patient = patientRecords.patientsList.find(p => p.name === patientName);
    if (patient) {
      patient.sessionsList.forEach(session => {
        session.exercisesList.forEach(exercise => {
          csvData.push({
            'Patient Name': patient.name,
            'Session Date': session.dateTime,
            'Exercise Name': exercise.name,
            'Repetitions': exercise.reps
          });
        });
      });
    }
 
    let csv = Papa.unparse(csvData);
    try {
      await FileSystem.writeAsStringAsync(getPath(`exported_patient_data_${patientName}`), csv);
      console.log(`Data for ${patientName} exported successfully.`);
    } catch (error) {
      console.error(`Error exporting ${patientName}'s data:`, error);
    }
  };
 
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <Text>Export all data between date range</Text>
        <Icon name="export" size={30} />
      </View>
      <View style={styles.infoItem}>
        <TouchableOpacity style={styles.infoItemButton} onPress={() => setShowStartDatePicker(true)}>
          <Text>{startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            testID="startDatePicker"
            value={startDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onStartDateChange}
          />
        )}
        <Text>{"\n"}To</Text>
        <TouchableOpacity style={styles.infoItemButton} onPress={() => setShowEndDatePicker(true)}>
          <Text>{endDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            testID="endDatePicker"
            value={endDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onEndDateChange}
          />
        )}
        <TouchableOpacity onPress={() => exportRangeData(patientRecords, startDate, endDate)}>
          <Text>Export Range</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}