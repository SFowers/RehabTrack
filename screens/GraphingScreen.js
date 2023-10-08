import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../stylesheet/Style';
import { BarChart } from 'react-native-gifted-charts';
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from 'react-native-vector-icons/AntDesign';

export default function GraphingScreen({ navigation, route }) {
  // Initialize state variables
  let patientName = route?.params?.patientName || "";
  const [patientData, setPatientData] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  const [selectedExercise, setSelectedExercise] = useState(Object.keys(chartData)[0]);
  const [exerciseDates, setExerciseDates] = useState([]); // Store exercise dates
  const [startDate, setStartDate] = useState(null); // Track selected start date
  const [endDate, setEndDate] = useState(null);     // Track selected end date
  const [showStartDatePicker, setShowStartDatePicker] = useState(false); // Show/hide start date picker
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);     // Show/hide end date picker

  // Handle the change in start date
  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  // Handle the change in end date
  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  // Filter chart data based on selected date range
  const filterChartData = () => {
    let filteredChartData = chartDataArray;

    if (startDate && endDate) {
      // Filter data points within the selected date range
      filteredChartData = chartDataArray.filter((dataPoint) => {
        const dataPointDate = new Date(dataPoint.label);
        return dataPointDate >= startDate && dataPointDate <= endDate;
      });
    }

    // Format all data points (whether within range or not) with the specified date format
    const formattedChartData = filteredChartData.map((dataPoint) => {
      const dataPointDate = new Date(dataPoint.label);
      const options1 = { day: 'numeric', month: 'numeric' };
      const formattedDataPointDate = dataPointDate.toLocaleDateString('en-GB', options1);

      // Return the data point with the formatted date
      return { ...dataPoint, label: formattedDataPointDate };
    });

    return formattedChartData;
  };

  useEffect(() => {
    // Fetch patient data from storage
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

                  const options1 = { day: 'numeric', month: 'numeric' };
                  const formattedDate = sessionDateTime.toLocaleDateString('en-GB', options1);
                  exerciseData[exerciseName].push({ value: repetitions, label: session.sessionDateTime });
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

      {/* Bar Chart */}
      <View style={{ maxHeight: 300, maxWidth: 300, padding: 20 }}>
        <BarChart
          data={filterChartData()} // Pass filtered data to the chart
          frontColor={'#01afb0'}
        />
      </View>

      {/* Date selection controls */}
      <Text style={styles.titleText}>Date Range</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          style={[styles.button, { maxWidth: 150, marginRight: 20 }]}
        >
          <Text style={styles.buttonText}>Start Date: {startDate ? startDate.toDateString() : 'Select'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          style={[styles.button, { maxWidth: 150 }]}
        >
          <Text style={styles.buttonText}>End Date: {endDate ? endDate.toDateString() : 'Select'}</Text>
        </TouchableOpacity>
      </View>

      {/* Date pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />
      )}

      {/* Custom exercise selection buttons */}
      <Text style={styles.titleText}>Exercise Selection</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxHeight: 50 }}>
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
      </ScrollView>

      {/* Return to Home button */}
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

