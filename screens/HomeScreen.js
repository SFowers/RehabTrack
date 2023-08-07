import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native';
import { StyleSheet, Button, Text, View } from 'react-native';

//export default FlatListBasics;

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Button 
            style={styles.navButton}
            title="New Session"
            onPress={() => navigation.navigate("New Session")}
        />
        <Button 
            title="Patient Records"
            onPress={() => navigation.navigate("Patient Records")}
        />
        <Button 
            title="Rehab Charts"
            onPress={() => navigation.navigate("Chart Tool")}
        />
      </View>
    );
}

/*
const FlatListBasics = () => {
    return (
        <View style={StyleSheet.container}>
            <FlatList
                data={[
                    {key: 'New Session'},
                    {key: 'Patient Records'},
                    {key: 'Data Export'},
                    {key: 'Settings'},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
        </View>
    )
}
*/

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