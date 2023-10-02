import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../stylesheet/Style';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { Circle } from 'react-native-svg';

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
                    exerciseData[exerciseName] = {
                      data: [], // Initialize an array if it doesn't exist
                      dates: [], // Initialize an array for dates
                    };
                  }
                  exerciseData[exerciseName].data.push(repetitions);
                  exerciseData[exerciseName].dates.push(new Date(session.sessionDateTime)); // Store the date as a Date object
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
              setExerciseDates(data[Object.keys(data)[0]].dates || []);
            }
            //console.log(exerciseDates);
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

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const Dots = ({ x, y, data }) => {
    return (
      <>
        {data?.map((value, index) => (
          <Circle
            key={index}
            cx={x(index)}
            cy={y(value)}
            r={4}
            stroke={'rgb(0, 0, 0)'}
            fill={'white'}
          />
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Check if chartDataArray is defined before accessing it
  const chartDataArray = chartData[selectedExercise]?.data || [];
  // Check if exerciseDates is defined before accessing it
  const exerciseDatesArray = (chartData[selectedExercise]?.dates || []).filter(
    (value) => value instanceof Date
  );
  //console.log('Exercise Dates:', exerciseDatesArray);
  const axesSvg = { fontSize: 10, fill: 'grey' };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{patientName} Charts</Text>
      <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
        <YAxis
          data={chartDataArray}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={chartDataArray}
            contentInset={verticalContentInset}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
          >
            <Grid />
            <Dots data={chartDataArray} />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={exerciseDatesArray}
            formatLabel={(value, index) => {
              const date = exerciseDatesArray[index];
              const month = date.getMonth() + 1;
              const day = date.getDate();
              return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`; // Format as MM/DD
            }}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          />
        </View>
      </View>

      {/* Custom exercise selection buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {Object.keys(chartData).map((exerciseName) => (
          <TouchableOpacity
            key={exerciseName}
            onPress={() => {
              setSelectedExercise(exerciseName);
              setExerciseDates(chartData[exerciseName]?.dates || []);
            }}
            style={{
              backgroundColor:
                exerciseName === selectedExercise ? 'blue' : 'gray',
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


