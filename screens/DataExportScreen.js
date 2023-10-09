import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FileSystem from "expo-file-system";
import Papa from "papaparse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import {
  PatientData,
  Patient,
  Session,
  Exercise,
} from "../patientdata/patientDataStructures";
import * as Sharing from "expo-sharing";

export default function DataExportScreen({ navigation, route }) {
  const loadPatientData = async () => {
    try {
      const storedPatientData = await AsyncStorage.getItem(key);
      const parsedPatientData = JSON.parse(storedPatientData);
      setPatientRecords(parsedPatientData);
      console.log("attempting load");
    } catch (error) {
      console.error("Error loading patient data from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("Patient Data");
        if (data) {
          const jsonData = JSON.parse(data);
          if (jsonData && jsonData.patients && jsonData.patients.length > 0) {
            setPatientRecords(jsonData);
            setItems(
              jsonData.patients.map((patient) => ({
                label: patient.patientName,
                value: patient.patientName,
              }))
            );
          } else {
            console.error("jsonData is null or does not have patients");
          }
        } else {
          console.error("Data is null");
        }
      } catch (error) {
        console.error("Error loading patient data", error);
      } finally {
        //setLoading(false); // Ensure loading is set to false
      }
    };
    // Load patient data when the component mounts
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "patient1", value: "patient 1" },
    { label: "patient2", value: "patient 2" },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const key = "Patient Data";
  const [patientRecords, setPatientRecords] = useState([]);

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

  // Check if patientRecords is null or undefined before proceeding
  if (!patientRecords) {
    console.error("patientRecords is undefined or null");
    return (
      <View>
        <Text>Error: Patient records not found</Text>
      </View>
    );
  }

  const [isExporting, setIsExporting] = useState(false);

  const saveFile = async (uri, filename) => {
    try {
      console.log("Checking if the file can be shared");
      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        alert("Sharing is not available on this device!");
        return;
      }

      console.log('File URI:', uri);
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Error sharing the file:", error);
      alert("Could not share the file.");
    }
  };

  const exportAllData = async () => {
    setIsExporting(true);
    let csvData = [];

    patientRecords.patients.forEach((patient) => {
      console.log(patient);
      if (patient.sessions) {
        patient.sessions.forEach((session) => {
          if (session.exercises) {
            session.exercises.forEach((exercise) => {
              // Correcting data serialization here
              csvData.push({
                "Patient Name": patient.patientName,
                "Session Date": session.sessionDateTime,
                "Exercise Name": exercise.exerciseName,
                Repetitions: exercise.repetitions,
                Details: JSON.stringify(exercise.details), // Example of converting nested object into string
              });
            });
          }
        });
      } else {
        console.log("Sessions not found for patient:", patient.patientName);
      }
    });

    let csv = Papa.unparse(csvData);
    try {
      const path = getPath("exported_data");
      await FileSystem.writeAsStringAsync(path, csv);
      console.log("Data exported successfully.");
      saveFile(path, "exported_data.csv");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const exportRangeData = async (patientRecords, startDate, endDate) => {
    if (!patientRecords) {
      console.error("patientRecords is not defined");
      return;
    }
    let csvData = [];

    patientRecords.patients.forEach((patient) => {
      if (patient.sessions) {
        // Add this check here
        patient.sessions.forEach((session) => {
          const sessionDate = new Date(session.sessionDateTime);
          if (sessionDate >= startDate && sessionDate <= endDate) {
            if (session.exercises) {
              // And also check if exercises is defined before calling forEach
              session.exercises.forEach((exercise) => {
                csvData.push({
                  "Patient Name": patient.patientName,
                  "Session Date": session.sessionDateTime,
                  "Exercise Name": exercise.exerciseName,
                  Repetitions: exercise.repetitions,
                });
              });
            }
          }
        });
      }
    });

    let csv = Papa.unparse(csvData);
    try {
      const path = getPath("exported_range_data");
      await FileSystem.writeAsStringAsync(path, csv);
      console.log("Range data exported successfully.");
      saveFile(path, "exported_range_data.csv");
    } catch (error) {
      console.error("Error exporting range data:", error);
    }
  };

  const exportPatientData = async (patientRecords, patientName) => {
    let csvData = [];

    const patient = patientRecords.patients.find(
      (p) => p.patientName === patientName
    );
    if (patient) {
      patient.sessions.forEach((session) => {
        session.exercises.forEach((exercise) => {
          csvData.push({
            "Patient Name": patient.patientName,
            "Session Date": session.sessionDateTime,
            "Exercise Name": exercise.exerciseName,
            Repetitions: exercise.repetitions,
          });
        });
      });
    }

    let csv = Papa.unparse(csvData);
    try {
      const filename = `exported_patient_data_${patientName}`;
      const path = getPath(filename);
      await FileSystem.writeAsStringAsync(path, csv);
      console.log(`Data for ${patientName} exported successfully.`);
      saveFile(path, `${filename}.csv`);
    } catch (error) {
      console.error(`Error exporting ${patientName}'s data:`, error);
    }
  };

  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientSelection = (selectedPatientName) => {
    setSelectedPatient(selectedPatientName);
  };

  const patientItems =
    patientRecords.patients?.map((patient) => ({
      label: patient.patientName,
      value: patient.patientName,
    })) || [];

  return (
    <View style={styles.container}>
      {/* Export All Data */}
      <View style={styles.exportSection}>
        <Text style={styles.titleText}>Export All Data</Text>
        <Text>This button will export all patient data to a CSV file.</Text>
        <TouchableOpacity onPress={exportAllData} style={styles.navButton}>
          <Text style={styles.buttonText}>Export All</Text>
        </TouchableOpacity>
      </View>

      {/* Export Specific Patient Data */}
      <View style={styles.exportSection}>
        <Text style={styles.titleText}>Export Specific Patient Data</Text>
        <Text>Select a patient to export their data.</Text>

        {/* Dropdown for patient selection */}
        <DropDownPicker
          placeholder="Select or Search for a Patient"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={(item) => handlePatientSelection(item.value)}
          searchable={true}
          style={{ zIndex: 5000, elevation: 5000 }}
          dropDownContainerStyle={{ zIndex: 5000, elevation: 5000 }}
        />

        {/* Spacer to make room for dropdown when open */}
        {open && <View style={{ height: 200 }} />}

        {/* Export Button */}
        <TouchableOpacity
          onPress={() => exportPatientData(patientRecords, selectedPatient)}
          style={styles.navButton}
          disabled={!selectedPatient} // Disable the button if no patient is selected
        >
          <Text style={styles.buttonText}>Export Patient Data</Text>
        </TouchableOpacity>
      </View>

      {/* Spacer to make room for dropdown when open */}
      {open && <View style={{ height: 200 }} />}

      {/* Export Range Data */}
      <View
        style={[
          styles.exportSection,
          { zIndex: 1, position: open ? "relative" : "static" },
        ]}
      >
        <Text style={styles.titleText}>Export Range Data</Text>
        <Text>Select a date range to export the patient data within those dates.</Text>

        {/* Date Selection */}
        <View style={styles.selectionContainer}>
          <TouchableOpacity
            style={styles.selectorButton}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={styles.buttonText}>
              {startDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          <Text style={styles.titleText}>To</Text>

          <TouchableOpacity
            style={styles.selectorButton}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={styles.buttonText}>
              {endDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date Pickers */}
        {showStartDatePicker && (
          <DateTimePicker
            testID="startDatePicker"
            value={startDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartDatePicker(false);
              if (selectedDate) {
                setStartDate(selectedDate);
              }
            }}
          />
        )}
        {showEndDatePicker && (
          <DateTimePicker
            testID="endDatePicker"
            value={endDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndDatePicker(false);
              if (selectedDate) {
                setEndDate(selectedDate);
              }
            }}
          />
        )}
        {/* Export Button */}
        <TouchableOpacity
          onPress={() => exportRangeData(patientRecords, startDate, endDate)}
          style={styles.navButton}
        >
          <Text style={styles.buttonText}>Export Range</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
