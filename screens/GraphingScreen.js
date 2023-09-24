import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../stylesheet/Style';
import Icon from 'react-native-vector-icons/AntDesign';
// import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from 'react-native-chart-kit';

export default function GraphingScreen({ navigation }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [summaryType, setSummaryType] = useState('monthly'); // or 'weekly'
  const [data, setData] = useState([]);

  const toggleExercise = (exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(prev => prev.filter(e => e !== exercise));
    } else {
      setSelectedExercises(prev => [...prev, exercise]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await AsyncStorage.getItem('exerciseData');
        const exerciseData = JSON.parse(rawData);

        // 1. Filter by selected exercises
        let filteredExercises = exerciseData.filter(exercise => selectedExercises.includes(exercise.name));

        // 2. Filter each exercise's data by the date range
        let filteredData = [];
        filteredExercises.forEach(exercise => {
          exercise.data = exercise.data.filter(entry => entry.timeDate >= startDate && entry.timeDate <= endDate);
          filteredData.push(...exercise.data);
        });

        // 3. Aggregate based on the summaryType
        let aggregatedData = {};

        filteredData.forEach(entry => {
          const month = entry.timeDate.getMonth();
          const week = Math.floor(entry.timeDate.getDate() / 7);

          const key = summaryType === 'monthly' ? `Month-${month}` : `Week-${week}`;
          aggregatedData[key] = (aggregatedData[key] || 0) + entry.reps;
        });

        const labels = Object.keys(aggregatedData);
        const values = Object.values(aggregatedData);

        setData({
          labels: labels,
          datasets: [{
            data: values,
            strokeWidth: 2
          }]
        });

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [startDate, endDate, selectedExercises, summaryType]);


  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <LineChart
          data={data}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

      {/* DATE SELECTION FOR GRAPH */}
      <Text style={styles.titleText}>Date Range</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <TouchableOpacity style={styles.infoItemButton} onPress={() => setShowStartDatePicker(true)}>
            <Text>{startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              onChange={(event, date) => {
                setShowStartDatePicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}
          <Text>{"\n"}To</Text>
          <TouchableOpacity style={styles.infoItemButton} onPress={() => setShowEndDatePicker(true)}>
            <Text>{endDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              onChange={(event, date) => {
                setShowEndDatePicker(false);
                if (date) setEndDate(date);
              }}
            />
          )}
        </View>
      </View>

      {/* WEEKLY/MONTHLY SUMMARY FOR GRAPH */}
      <View style={styles.selectionContainer}>
        <TouchableOpacity style={styles.selectorButton} onPress={() => setSummaryType('weekly')}>
          <Text style={styles.buttonText}>Weekly Summary</Text>
          <Icon name="calendar" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectorButton} onPress={() => setSummaryType('monthly')}>
          <Text style={styles.buttonText}>Monthly Summary</Text>
          <Icon name="calendar" size={30} />
        </TouchableOpacity>
      </View>

      <Text style={styles.titleText}>Graph Legends</Text>
      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => toggleExercise('Hand Waves')}
        >
          <Text style={styles.buttonText}>Hand Waves</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => toggleExercise('Across Table')}
        >
          <Text style={styles.buttonText}>Across Table</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => toggleExercise('Raise Arm')}
        >
          <Text style={styles.buttonText}>Raise Arm</Text>
        </TouchableOpacity>
      </View>

      {/* Redirect to compare against the normative screen */}
      <View style={styles.selectionContainer}>
        <TouchableOpacity style={styles.selectorButton} onPress={() => navigation.navigate('NormativeComparisonScreen')}>
          <Text style={styles.buttonText}>Compare against the normative</Text>
          <Icon name="right" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}