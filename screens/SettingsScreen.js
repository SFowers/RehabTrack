import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../stylesheet/Style';

export default function SettingsScreen( navigation, route) {
    //let patients = route.params.patients;
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
        <StatusBar style="auto" />
      </View>
    );
}