import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../stylesheet/Style';

//export default FlatListBasics;

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        {/* NAV BUTTONS */}
        {/* New Session */}
        <TouchableOpacity style={styles.navButton} 
            onPress={() => navigation.navigate("New Session")}>
            <Icon name="plus" size={30} />
            <Text style={styles.navText}>New Session</Text>
            <Icon name="right" size={30} />
        </TouchableOpacity>

        {/* Patient Records */}
        <TouchableOpacity style={styles.navButton} 
            onPress={() => navigation.navigate("Patient Records")}>
            <Icon name="folderopen" size={30} />
            <Text style={styles.navText}>Patient Records</Text>
            <Icon name="right" size={30} />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity style={styles.navButton} 
            onPress={() => navigation.navigate("Settings")}>
            <Icon name="setting" size={30} />
            <Text style={styles.navText}>Settings</Text>
            <Icon name="right" size={30} />
        </TouchableOpacity>

        {/* Data Export */}
        <TouchableOpacity style={styles.navButton} 
            onPress={() => navigation.navigate("Data Export")}>
            <Icon name="export2" size={30} />
            <Text style={styles.navText}>Data Export</Text>
            <Icon name="right" size={30} />
        </TouchableOpacity>
        
        {/* Chart Tool */}
        <TouchableOpacity style={styles.navButton} 
            onPress={() => navigation.navigate("Chart Tool")}>
            <Icon name="linechart" size={30} />
            <Text style={styles.navText}>Rehab Charts</Text>
            <Icon name="right" size={30} />
        </TouchableOpacity>

      </View>
    );
}