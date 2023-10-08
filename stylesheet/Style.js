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
        width: '80%',
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
        width: '100%',
    },
    button: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 7,
        alignItems: 'center',
        width: '100%',
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonClose: {
        backgroundColor: '#DDDDDD',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
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
        backgroundColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
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
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    exerciseListContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    exerciseListItem: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    addExerciseContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    addExerciseInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    addExerciseButton: {
        backgroundColor: '#01afb0',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },    
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    exerciseListContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    exerciseListItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
      removeExerciseButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
      removeExerciseText: {
        color: 'white',
        fontWeight: 'bold',
    },  
});

export { styles }