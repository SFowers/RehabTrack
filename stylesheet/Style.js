import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'flex-start',
        rowGap: 15,
        padding: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#495057',
        marginBottom: 10,
    },
    navButton: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#01afb0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderColor: 'black',
        textAlign: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        columnGap: 10,
        rowGap: 10,
    },
    selectionDropdown: {
        width: 220,
    },
    selectorButton: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexGrow: 1,
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 7,
        borderColor: 'black',
        textAlign: 'center',
        marginHorizontal: 5,
    },
    repContainer: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 15,
        padding: 10,
    },
    repCounter: {
        flexGrow: 1,
        minWidth: 200,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#DDDDDD'
    },
    repCounterText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    repCounterNum: {
        fontSize: 50,
        fontWeight: '900',
    },
    repAdd: {
        minWidth: 300,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#66ff66'
    },
    repMinus: {
        minWidth: 300,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ff6677'
    },
    infoContainer: {
        minWidth: 200,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#DDDDDD'
    },
    infoItem: {
        flexGrow: 1,
        minWidth: 200,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        padding: 10,
    },
    infoItemButton: {
        backgroundColor: '#969595',
        padding: 20,
        borderRadius: 10,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%', // Adjust the width as needed
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%', // Adjust the width as needed
    },
    button: {
        backgroundColor: 'gray', // Match your button color
        padding: 10,
        borderRadius: 7,
        alignItems: 'center',
        width: '100%', // Adjust the width as needed
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // Match your text color
    },
    buttonClose: {
        backgroundColor: '#DDDDDD', // Match your button color
    },

    headerText: {
        fontSize: 24, // Adjust the font size as needed
        fontWeight: 'bold', // Adjust the font weight as needed
        textAlign: 'center', // Center the text horizontally
        marginTop: 10, // Add some top margin to separate it from other content
    },

    containerStyle: {
        height: 40,
        width: 200,
        marginBottom: 20,
    },
    style: {
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    itemStyle: {
        justifyContent: 'flex-start',
    },

    disabledButton: {
        backgroundColor: '#ccc', // Background color for disabled button
        borderRadius: 8, // Border radius
        paddingVertical: 10, // Vertical padding
        paddingHorizontal: 20, // Horizontal padding
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
        opacity: 0.5, // Reduced opacity for disabled state
    },

    exerciseList: {
        marginTop: 20,
    },

    exerciseItem: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    exerciseText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    exerciseCount: {
        fontSize: 16,
        color: '#777',
    },

    noExerciseText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
    },
    exportSection: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

});

export { styles }