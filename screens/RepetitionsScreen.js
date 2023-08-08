import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../stylesheet/Style';
import Icon from 'react-native-vector-icons/AntDesign';

export default function RepetitionsScreen( navigation, route) {
    //let patients = route.params.patients;
    const [count, setCount] = useState(0);
    const addCount = () => setCount(prevCount => prevCount + 1);
    const minusCount = () => setCount(prevCount => prevCount - 1);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'exercise1', value: 'exercise 1'},
        {label: 'exercise2', value: 'exercise 2'}
    ]);

    return (
      <View style={styles.repContainer}>
        <StatusBar style="auto" />
        <DropDownPicker 
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
        <View style={styles.repCounter}>
            <Text style={styles.repCounterText}>Reps</Text>
            <Text style={styles.repCounterNum}>{count}</Text>
        </View>
        <TouchableOpacity style={styles.repAdd} onPress={addCount}>
            <Icon name="plus" size={200}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.repMinus} onPress={minusCount}>
            <Icon name="minus" size={200}/>
        </TouchableOpacity>
        <View style={styles.selectionContainer}>
            <TouchableOpacity style={styles.selectorButton}>
                <Text style={styles.buttonText}>Save</Text>
                <Icon name="save" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectorButton}>
                <Text style={styles.buttonText}>Discard</Text>
                <Icon name="delete" size={30} />
            </TouchableOpacity>
        </View>
      </View>
    );
}