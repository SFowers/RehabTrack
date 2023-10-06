import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../stylesheet/Style';
import { BarChart } from 'react-native-gifted-charts'; // Import BarChart from 'react-native-gifted-charts'

export default function GraphingScreen({ navigation, route }) {
  let patientName = route?.params?.patientName || "";
  const [patientData, setPatientData] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  const [selectedExercise, setSelectedExercise] = useState(Object.keys(chartData)[0]);
  const [exerciseDates, setExerciseDates] = useState([]); // Store exercise dates

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

            // Process and map patient session data to chart data and extract dates
            const data = foundPatient.sessions.reduce((exerciseData, session) => {
              if (Array.isArray(session.exercises)) {
                session.exercises.forEach((exercise) => {
                  const { exerciseName, repetitions } = exercise;
                  if (!exerciseData[exerciseName]) {
                    exerciseData[exerciseName] = [];
                  }
                  const sessionDateTime = new Date(session.sessionDateTime);
                  //const formattedDate = `${sessionDateTime.toLocaleDateString()} ${sessionDateTime.toLocaleTimeString()}`;
                  const options1 = { day: 'numeric', month: 'numeric' };
                  const formattedDate = sessionDateTime.toLocaleDateString('en-GB', options1);
                  const options2 = { hour: '2-digit', minute: '2-digit'};
                  const formattedTime = sessionDateTime.toLocaleTimeString(undefined, options2);
                  exerciseData[exerciseName].push({ value: repetitions, label: formattedDate});
                });
              } else {
                console.warn('Session exercises is not an array:', session.exercises);
              }
              return exerciseData;
            }, {});

            setChartData(data);
            setLoading(false);

            // Set the initial selected exercise and exercise dates
            if (Object.keys(data).length > 0) {
              setSelectedExercise(Object.keys(data)[0]);
              setExerciseDates(data[Object.keys(data)[0]] || []);
            }
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Check if chartDataArray is defined before accessing it
  const chartDataArray = chartData[selectedExercise] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{patientName} Charts</Text>
      <View style={{ maxheight: 300, maxwidth: 300,padding: 20 }}>
        <BarChart
          data={chartDataArray}
          frontColor={'#01afb0'}
        />
      </View>

      {/* Custom exercise selection buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}>
        {Object.keys(chartData).map((exerciseName) => (
          <TouchableOpacity
            key={exerciseName}
            onPress={() => {
              setSelectedExercise(exerciseName);
              setExerciseDates(chartData[exerciseName] || []);
            }}
            style={{
              backgroundColor:
                exerciseName === selectedExercise ? '#01afb0' : 'gray',
              padding: 10,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white' }}>{exerciseName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
