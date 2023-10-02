import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../stylesheet/Style';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';

export default function PatientScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const patientName = route.params?.patientName || ''; // Get the patient name from route params

  // Function to navigate to the SessionHistoryScreen with the selected patient name
  const navigateToSessionHistory = () => {
    navigation.navigate('Session History', { patientName });
  };

  const navigateToGraphing = () => {
    navigation.navigate('Graphing', { patientName });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.headerText}>{patientName}</Text>

      <TouchableOpacity
        style={styles.navButton}
        onPress={navigateToSessionHistory}
      >
        <Text style={styles.navText}>Session History</Text>
        <Icon name="right" size={30} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={navigateToGraphing}
      >
        <Text style={styles.navText}>Progress Graph</Text>
        <Icon name="right" size={30} />
      </TouchableOpacity>
    </View>
  );
}

