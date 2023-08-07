import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import Navigator from './routes/homeStack';
import HomeScreen from "./screens/HomeScreen";
import NewSessionScreen from "./screens/NewSessionScreen";
import PatientRecordsScreen from "./screens/PatientRecordsScreen";
import RehabilitationScreen from './screens/RehabilitationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'RehabTrack'}}
        />
        <Stack.Screen
          name="New Session"
          component={NewSessionScreen}
          options={{title: 'Create New Session'}}
        />
        <Stack.Screen
          name="Patient Records"
          component={PatientRecordsScreen}
          options={{title: 'Patient Records'}}
        />
        <Stack.Screen
          name="Chart Tool"
          component={RehabilitationScreen}
          options={{ title: 'Rehabilitation Chart Tool' }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    /*
    <View style={styles.container}>
      <Text>RehabTrack</Text>
      <StatusBar style="auto" />
      
    </View>
    */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
