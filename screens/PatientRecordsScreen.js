import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../stylesheet/Style';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';

export default function PatientRecordsScreen() {
    //let patients = route.params.patients;
    const navigation = useNavigation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'patient1', value: 'patient 1'},
        {label: 'patient2', value: 'patient 2'}
    ]);


    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.selectionContainer}>
          <TouchableOpacity style={styles.selectorButton}>
            <Text style={styles.buttonText}>New Patient</Text>
            <Icon name="plus" size={30} />
          </TouchableOpacity>
          <DropDownPicker 
            style={styles.selectionDropdown}
            searchable={true}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        
        <TouchableOpacity style={styles.navButton} 
            onPress={() => navigation.navigate("Patient")}>
          <Text style={styles.navText}>Patient Name 1</Text>
          <Icon name="right" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} 
            onPress={() => navigation.navigate("Patient")}>
          <Text style={styles.navText}>Patient Name 1</Text>
          <Icon name="right" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} 
            onPress={() => navigation.navigate("Patient")}>
          <Text style={styles.navText}>Patient Name 1</Text>
          <Icon name="right" size={30} />
        </TouchableOpacity>
      </View>
    );
}