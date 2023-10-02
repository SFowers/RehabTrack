import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../stylesheet/Style';
import Icon from 'react-native-vector-icons/AntDesign';

export default function RepetitionsScreen({ visible, onClose, onSave, exercise }) {
  const [exerciseName, setExerciseName] = useState('');
  const [repetitions, setRepetitions] = useState(0);
  const [exerciseID, setExerciseID] = useState('');

  // Use useEffect to set the initial state based on the provided exercise
  useEffect(() => {
    if (exercise) {
        console.log(exercise);
        setExerciseName(exercise.exerciseName); // Use the correct property name
        setRepetitions(exercise.repetitions); // Use the correct property name
        setExerciseID(exercise.id); // Use the correct property name
    }
  }, [exercise]);

  const addCount = () => {
        setRepetitions((prevCount) => prevCount + 1);
  };

  const minusCount = () => {
    if (repetitions > 0) {
      setRepetitions((prevCount) => prevCount - 1);
    }
  };

  const handleExerciseChange = (selectedExercise) => {
    setExerciseName(selectedExercise);
  };

  const closeAndSave = () => {
    onSave(exerciseID, exerciseName, repetitions); // Use the correct property names
    onClose(); // Close the modal
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items] = useState([
    { label: 'exercise1', value: 'exercise 1' },
    { label: 'exercise2', value: 'exercise 2' },
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
        <DropDownPicker
          placeholder={exerciseName}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          onSelectItem={(item) => {
            handleExerciseChange(item.value);
          }}
        />
        <View style={styles.repCounter}>
          <Text style={styles.repCounterText}>Reps</Text>
          <TextInput style={styles.repCounterNum}>{repetitions}</TextInput>
        </View>
        <TouchableOpacity style={styles.repAdd} onPress={addCount}>
          <Icon name="plus" size={200} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.repMinus} onPress={minusCount}>
          <Icon name="minus" size={200} />
        </TouchableOpacity>
        <View style={styles.selectionContainer}>
          <TouchableOpacity style={styles.selectorButton} onPress={closeAndSave}>
            <Text style={styles.buttonText}>Save</Text>
            <Icon name="save" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectorButton} onPress={onClose}>
            <Text style={styles.buttonText}>Discard</Text>
            <Icon name="delete" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

