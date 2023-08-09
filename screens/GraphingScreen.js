import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../stylesheet/Style';

export default function GraphingScreen() {
    //let patients = route.params.patients;
    return (
      <View style={styles.container}>
        <Text>Data Export</Text>
        <StatusBar style="auto" />
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