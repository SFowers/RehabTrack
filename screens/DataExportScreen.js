import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
import RehabilitationChart from './RehabilitationChart';
import FileOp from 'react-native-fs'; // Import react-native-fs

const DataExportScreen = ({ exerciseData, normativeData }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // Replace 'patient1' with actual patient names(hardcoded)
  const [selectedPatient, setSelectedPatient] = useState('patient1'); 
  // Function to handle data export
  const handleExportData = () => {
    // Filter data based on selected date range and patient
    const filteredExerciseData = exerciseData.map((exercise) => ({
      ...exercise,
      data: exercise.data.filter(
        (item) =>
          item.timeDate >= new Date(startDate) && item.timeDate <= new Date(endDate)
      ),
    }));

    const filteredNormativeData = normativeData.filter(
      (item) =>
        item.dateTime >= new Date(startDate) && item.dateTime <= new Date(endDate)
    );

    // Combine filteredExerciseData and filteredNormativeData into a single array
    const combinedData = [...filteredExerciseData, { name: 'normative', data: filteredNormativeData }];

    // Convert data to .csv format
    const csvData = "name,timeDate,reps\n"; // Add the column headers

    // Iterate through combinedData and convert each row to a .csv line
    combinedData.forEach((exercise) => {
      exercise.data.forEach((item) => {
        const line = `${exercise.name},${item.timeDate.toISOString()},${item.reps}\n`; // Assuming timeDate and reps are your data properties
        csvData += line;
      });
    });

    // File path to save the .csv file
    const filePath = FileOp.DocumentDirectoryPath + '/exported_data.csv';

    // Write .csv data to file
    FileOp.writeFile(filePath, csvData, 'utf8')
      .then(() => {
        console.log('CSV file created successfully:', filePath);
        Alert.alert('Data Export', 'Data exported successfully.');
      })
      .catch((error) => {
        console.log('Error creating CSV file:', error.message);
        Alert.alert('Error', 'Failed to export data.');
      });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Data Export
      </Text>
      {/* Date Range Selection */}
      <Text>Start Date:</Text>
      <DatePicker
        style={{ width: 200, marginBottom: 20 }}
        date={startDate}
        mode="date"
        placeholder="Select Start Date"
        format="DD-MM-YYYY"
        onDateChange={(date) => setStartDate(date)}
      />
      <Text>End Date:</Text>
      <DatePicker
        style={{ width: 200, marginBottom: 20 }}
        date={endDate}
        mode="date"
        placeholder="Select End Date"
        format="DD-MM-YYYY"
        onDateChange={(date) => setEndDate(date)}
      />

      {/* Patient Selection */}
      <Text>Select Patient:</Text>
      <Picker
        selectedValue={selectedPatient}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue) => setSelectedPatient(itemValue)}
      >
        {/* Replace 'patient1', 'patient2', etc., with actual patient names */}
        <Picker.Item label="Patient 1" value="patient1" />
        <Picker.Item label="Patient 2" value="patient2" />
        {/* Add more patients as needed */}
      </Picker>

      {/* Button to Export Data */}
      <Button title="Export Data" onPress={handleExportData} />

      {/* Optional: Display the chart for the selected patient and date range */}
      <RehabilitationChart exerciseData={exerciseData} normativeData={normativeData} />

    </View>
  );
};

export default DataExportScreen;
