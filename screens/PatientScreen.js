import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../stylesheet/Style';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';

export default function PatientScreen() {
    //let patients = route.params.patients;
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <TouchableOpacity style={styles.navButton} 
            onPress={() => navigation.navigate("Session History")}>
          <Text style={styles.navText}>Session History</Text>
          <Icon name="right" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} 
            onPress={() => navigation.navigate("Graphing")}>
          <Text style={styles.navText}>Progress Graph</Text>
          <Icon name="right" size={30} />
        </TouchableOpacity>

      </View>
    );
}