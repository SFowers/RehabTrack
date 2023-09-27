import React from "react";
import "react-native-gesture-handler";
//import "react-native-reanimated";
import "react-native-safe-area-context";
import "react-native-screens";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Navigation Screens
import HomeScreen from "./screens/HomeScreen";
import NewSessionScreen from "./screens/NewSessionScreen";
import PatientRecordsScreen from "./screens/PatientRecordsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import RepetitionsScreen from "./screens/RepetitionsScreen";
import PatientScreen from "./screens/PatientScreen";
import SessionHistoryScreen from "./screens/SessionHistoryScreen";
import DataExportScreen from "./screens/DataExportScreen";
import GraphingScreen from "./screens/GraphingScreen";
import SessionScreen from "./screens/SessionScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "RehabTrack" }}
        />
        <Stack.Screen
          name="New Session"
          component={NewSessionScreen}
          options={{ title: "Create New Session" }}
        />
        <Stack.Screen
          name="Patient Records"
          component={PatientRecordsScreen}
          options={{ title: "Patient Records" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="Repetitions"
          component={RepetitionsScreen}
          options={{ title: "Edit Repetitions" }}
        />
        <Stack.Screen
          name="Patient"
          component={PatientScreen}
          options={{ title: "Patient" }}
        />
        <Stack.Screen
          name="Session History"
          component={SessionHistoryScreen}
          options={{ title: "Session History" }}
        /><Stack.Screen
          name="Session"
          component={SessionScreen}
          options={{ title: "Session" }}
        /> 
        <Stack.Screen
          name="Graphing"
          component={GraphingScreen}
          options={{ title: "Graphing Screen" }}
        />
        <Stack.Screen
          name="Data Export"
          component={DataExportScreen}
          options={{ title: "Data Export" }}
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
