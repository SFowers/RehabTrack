import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../stylesheet/Style';
import Icon from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';

export default function GraphingScreen( navigation ) {
    //let patients = route.params.patients;
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* THE GRAPH */}
        <View style={styles.infoContainer}>
          <Icon name="linechart" size={200} />
        </View>
        {/* DATE SELECTION FOR GRAPH */}
        <Text style={styles.titleText}>Date Range</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <TouchableOpacity style={styles.infoItemButton}>
              <Text>1/1/23</Text>
            </TouchableOpacity>
            <Text>{"\n"}To</Text>
            <TouchableOpacity style={styles.infoItemButton}>
              <Text>1/1/23</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* WEEKLY/MONTHLY SUMMARY FOR GRAPH */}
        <View style={styles.selectionContainer}>
          <TouchableOpacity style={styles.selectorButton}>
            <Text style={styles.buttonText}>Weekly Summary</Text>
            <Icon name="calendar" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectorButton}>
            <Text style={styles.buttonText}>Monthly Summary</Text>
            <Icon name="calendar" size={30} />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleText}>Graph Legends</Text>
        <View style={styles.selectionContainer}>
          <TouchableOpacity style={styles.selectorButton}>
            <Text style={styles.buttonText}>Hand Waves</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectorButton}>
            <Text style={styles.buttonText}>Across Table</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectorButton}>
            <Text style={styles.buttonText}>Raise Arm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectionContainer}>
          <TouchableOpacity style={styles.selectorButton}>
            <Text style={styles.buttonText}>Compare against the normative</Text>
            <Icon name="right" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
}

/*
import React from 'react';
import { View, Text } from 'react-native';
import RehabilitationChart from '../patientdata/patientDataStructure';

export default function RehabilitationScreen () {
  const exerciseData = [
      {
        name: "handWaves",
        data: [
          { timeDate: new Date(2023, 6, 30, 10, 0, 0, 0), reps: 5 },
          { timeDate: new Date(2023, 6, 31, 11, 0, 0, 0), reps: 7 },
          { timeDate: new Date(2023, 7, 1, 12, 0, 0, 0), reps: 10 },
        ],
      },
      {
        name: "acrossTable",
        data: [
          { timeDate: new Date(2023, 6, 30, 10, 0, 0, 0), reps: 3 },
          { timeDate: new Date(2023, 6, 31, 11, 0, 0, 0), reps: 6 },
          { timeDate: new Date(2023, 7, 1, 12, 0, 0, 0), reps: 8 },
        ],
      },
      {
        name: "raiseArm",
        data: [
          { timeDate: new Date(2023, 6, 30, 10, 0, 0, 0), reps: 8 },
          { timeDate: new Date(2023, 6, 31, 11, 0, 0, 0), reps: 9 },
          { timeDate: new Date(2023, 7, 1, 12, 0, 0, 0), reps: 12 },
        ]
      }
    ]
  const normativeData = [
    { dateTime: new Date(2023, 6, 30, 0, 0, 0, 0), normative: 6 },
    { dateTime: new Date(2023, 6, 31, 0, 0, 0, 0), normative: 7 },
    { dateTime: new Date(2023, 7, 1, 0, 0, 0, 0), normative: 9 },
  ];

  return (
    <View>
      <Text style={styles.headerText}>Rehabilitation Tool</Text>
      <RehabilitationChart exerciseData={exerciseData} normativeData={normativeData} />
    </View>
  );
};

const styles = {
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
};

//export default RehabilitationScreen;
*/