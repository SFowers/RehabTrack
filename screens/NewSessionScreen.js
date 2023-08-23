import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../stylesheet/Style';
import { useNavigation } from '@react-navigation/native';

export default function NewSessionScreen() {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.selectionContainer}>
          <TouchableOpacity style={styles.selectorButton}>
            <Text style={styles.buttonText}>New Patient</Text>
            <Icon name="plus" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectorButton}>
            <Text style={styles.buttonText}>Assign Patient</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.navButton}
          onPress={() => navigation.navigate("Repetitions")}>
          <Text style={styles.buttonText}>Repetition Exercise 1</Text>
          <Text style={styles.buttonCount}>12</Text>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}
          onPress={() => navigation.navigate("Repetitions")}>
          <Text style={styles.buttonText}>Repetition Exercise 2</Text>
          <Text style={styles.buttonCount}>8</Text>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}
          onPress={() => navigation.navigate("Repetitions")}>
          <Text style={styles.buttonText}>Repetition Exercise 3</Text>
          <Text style={styles.buttonCount}>3</Text>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
      </View>
    );
}