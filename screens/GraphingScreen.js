import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../stylesheet/Style';
import { LineChart } from 'react-native-svg-charts';

export default function GraphingScreen( {navigation, route} ) {
  let patientName = route?.params?.patientName || "";
  const [patientData, setPatientData] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('Patient Data');
        if (data) {
          const parsedData = JSON.parse(data);
          if (parsedData && parsedData.patients) {
            setPatientData(parsedData.patients);
            const foundPatient = parsedData.patients.find(
              (patient) => patient.patientName === patientName
            );
            setSelectedPatient(foundPatient);
            
            // Process and map patient session data to chart data here
            const data = foundPatient.sessions.map(session => 
              session.reduce((acc, exercise) => acc + exercise.repetitions, 0));
            setChartData(data);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error loading patient data:', error);
        Alert.alert('Error', 'Failed to load patient data.');
        setLoading(false);
      }
    };
  
    fetchData();
  }, [patientName]);
  
  //console.log('Patient Data:', patientData);
  //console.log('Selected Patient:', selectedPatient);
  console.log(chartData);

  
  
  // chartData now contains an array of data points representing total repetitions for each session
  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {chartData.length > 0 ? (
      <LineChart
        style={{ height: 200 }}
        data={chartData}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
        contentInset={{ top: 20, bottom: 20 }}
      />
    
      ) : (
        <Text>No exercise data available for this patient.</Text>
      )}
    </View>
  );
}


const exerciseData = [
  [{ exerciseName: 'Exercise 1', repetitions: 10 }],
  [{ exerciseName: 'Exercise 2', repetitions: 5 }],
  // Add more exercise data here...
];

// Transform exercise data into an array of data points
const chartDataTest = exerciseData.map((session) =>
  session.reduce((acc, exercise) => acc + exercise.repetitions, 0)
);