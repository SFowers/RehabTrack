import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../stylesheet/Style';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PatientScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const patientName = route.params?.patientName || ''; // Get the patient name from route params

  // Function to delete the patient
  const deletePatient = async () => {
    try {
      // Load patient data from AsyncStorage
      const storedPatientData = await AsyncStorage.getItem('Patient Data');
      const patientData = JSON.parse(storedPatientData);
  
      // Find the index of the patient with the matching name
      const indexToDelete = patientData.patients.findIndex(
        (patient) => patient.patientName === patientName
      );
  
      if (indexToDelete !== -1) {
        // Remove the patient from the array
        patientData.patients.splice(indexToDelete, 1);
  
        // Save the updated patient data to AsyncStorage
        await AsyncStorage.setItem('Patient Data', JSON.stringify(patientData));
  
        // Navigate back to the home screen
        navigation.navigate('Home');
      } else {
        console.warn('Patient not found:', patientName);
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };
  
  // Function to navigate to the SessionHistoryScreen with the selected patient name
  const navigateToSessionHistory = () => {
    navigation.navigate('Session History', { patientName });
  };

  // Function to navigate to the GraphingScreen with the selected patient name
  const navigateToGraphing = () => {
    navigation.navigate('Graphing', { patientName });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Display the patient's name */}
      <Text style={styles.headerText}>{patientName}</Text>

      {/* Button to navigate to the SessionHistoryScreen */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={navigateToSessionHistory}
      >
        <Text style={styles.navText}>Session History</Text>
        <Icon name="right" size={30} />
      </TouchableOpacity>

      {/* Button to navigate to the GraphingScreen */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={navigateToGraphing}
      >
        <Text style={styles.navText}>Progress Graph</Text>
        <Icon name="right" size={30} />
      </TouchableOpacity>

      {/* Button to delete the patient */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            'Confirm Patient Deletion',
            'Are you sure you want to delete this patient ' + patientName + '?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Patient deletion Cancelled'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => deletePatient(),
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Text style={styles.deleteButtonText}>Delete Patient</Text>
      </TouchableOpacity>

      {/* Button to return to the Home screen */}
      <TouchableOpacity
        style={[styles.navButton]}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" size={30} />
        <Text style={styles.navText}>Return to Home</Text>
        <Icon name="right" size={30} />
      </TouchableOpacity>

    </View>
  );
}