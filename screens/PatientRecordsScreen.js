import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function NewSessionScreen( navigation, route) {
    //let patients = route.params.patients;
    return (
      <View style={styles.container}>
        <Text>Patient Records</Text>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButton: {
        marginTop: 24,
        padding: 30,
        backgroundColor: 'gray',
        fontSize: 24
    }
})