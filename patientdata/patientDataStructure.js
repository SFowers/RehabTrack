import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'react-native-svg-charts';
import { View } from 'react-native';

const RehabilitationChart = ({ exerciseData, normativeData }) => {
  return (
    <View style={styles.chartContainer}>
      <LineChart
        style={styles.chart}
        data={exerciseData[0].data}
        svg={{ stroke: getLineColor(exerciseData[0].name) }}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid />
      </LineChart>
    </View>
  );
};

const styles = {
  chartContainer: {
    height: 300,
    margin: 20,
  },
  chart: {
    flex: 1,
  },
};

function getLineColor(exerciseName) {
  // Colors can be customized based on exerciseName if needed
  // For simplicity, this function returns a fixed color for each exercise
  switch (exerciseName) {
    case "handWaves":
      return "#8884d8";
    case "acrossTable":
      return "#82ca9d";
    case "raiseArm":
      return "#ffc658";
    default:
      return "#000000";
  }
}

export default RehabilitationChart;