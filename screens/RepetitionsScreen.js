import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { styles } from '../stylesheet/Style';

export default function RepetitionsScreen({ visible, onClose, onSave, exercise }) {
  const [exerciseName, setExerciseName] = useState('');
  const [repetitions, setRepetitions] = useState(0);
  const [exerciseID, setExerciseID] = useState('');
  const [exerciseList, setExerciseList] = useState([]);

  // Use useEffect to set the initial state based on the provided exercise
  useEffect(() => {
    loadExerciseList();
    if (exercise) {
        console.log(exercise);
        setExerciseName(exercise.exerciseName); // Set exerciseName from the exercise prop
        setRepetitions(exercise.repetitions); // Set repetitions from the exercise prop
        setExerciseID(exercise.id); // Set exerciseID from the exercise prop
    }
  }, [exercise]);

  const loadExerciseList = async () => {
    try {
      // Load the exercise list from AsyncStorage
      const storedExerciseList = await AsyncStorage.getItem('Exercise List');
      if (storedExerciseList) {
        const parsedExerciseList = JSON.parse(storedExerciseList);
        setExerciseList(parsedExerciseList);
      }
    } catch (error) {
      console.error('Error loading exercise list:', error);
    }
  };

  // Function to increment the repetitions count
  const addCount = () => {
    setRepetitions((prevCount) => prevCount + 1);
  };

  // Function to decrement the repetitions count, but not below zero
  const minusCount = () => {
    if (repetitions > 0) {
      setRepetitions((prevCount) => prevCount - 1);
    }
  };

  // Function to handle exercise selection from the dropdown
  const handleExerciseChange = (selectedExercise) => {
    setExerciseName(selectedExercise);
  };

  // Function to close the modal and save the changes
  const closeAndSave = () => {
    onSave(exerciseID, exerciseName, repetitions); // Call onSave with the updated values
    onClose(); // Close the modal
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items] = useState([
    { label: 'Sit to Stand', value: 'Sit to Stand' },
    { label: 'Right Arm Reach', value: 'Right Arm Reach' },
    { label: 'Left Arm Reach', value: 'Left Arm Reach' },
    { label: 'Right Steps', value: 'Right Steps' },
    { label: 'Left Steps', value: 'Left Steps' }
  ]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.repContainer}>
        <StatusBar style="auto" />
        {/* Close button */}
        <TouchableOpacity
          style={{ justifyContent: 'flex-end' }}
          onPress={onClose}
        >
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>
        {/* Exercise Button */}
        <DropDownPicker
          placeholder={"Select an Exercise"}
          searchable={true}
          open={open}
          value={value}
          items={exerciseList.map((item) => ({
            label: item,
            value: item,
          }))}
          setOpen={setOpen}
          setValue={setValue}
          onSelectItem={(item) => {
            handleExerciseChange(item.value);
          }}
        />
        {/* Repetition Input */}
        <View style={styles.repCounter}>
          <Text style={styles.repCounterText}>Reps</Text>
          <TextInput
            style={styles.repCounterNum}
            value={repetitions.toString()} // Bind value to the state variable
            onChangeText={(text) => {
              // Validate the input (optional)
              if (!isNaN(text) && parseInt(text) >= 0) {
                // Update the repetitions state with the parsed integer value
                setRepetitions(parseInt(text));
              }
            }}
            keyboardType="numeric" // Set the keyboard type to numeric
          />
        </View>
        {/* Repetition + */}
        <TouchableOpacity style={styles.repAdd} onPress={addCount}>
          <Icon name="plus" size={200} />
        </TouchableOpacity>
        {/* Repetition - */}
        <TouchableOpacity style={styles.repMinus} onPress={minusCount}>
          <Icon name="minus" size={200} />
        </TouchableOpacity>
        <View style={styles.selectionContainer}>
          {/* Close and Save */}
          <TouchableOpacity style={styles.selectorButton} onPress={closeAndSave}>
            <Text style={styles.buttonText}>Save</Text>
            <Icon name="save" size={30} />
          </TouchableOpacity>
          {/* Close and don't save */}
          <TouchableOpacity style={styles.selectorButton} onPress={onClose}>
            <Text style={styles.buttonText}>Discard</Text>
            <Icon name="delete" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}