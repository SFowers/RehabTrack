/*
class PatientData {
  constructor() {
    this.patients = [];
  }

  addPatient(patientName) {
    const patient = new Patient(patientName);
    this.patients.push(patient);
    return patient;
  }

  static loadStorage(data) {
    const patientData = new PatientData();
    // Initialize the patientData object with the loaded data
    // For example, patientData.patients = data.patients;
    // Copy data properties to the instance as needed
    return patientData;
  }
}
*/

import AsyncStorage from '@react-native-async-storage/async-storage';

class PatientData {
  constructor() {
    this.patients = [];
    // Other properties and methods
  }

  // Add methods to add patients, sessions, exercises, etc.

  addPatient(patient) {
    this.patients.push(patient);
    // You may want to call saveToStorage here to persist the changes
  }

  async saveToStorage() {
    try {
      const data = JSON.stringify(this);
      await AsyncStorage.setItem('patientData', data);
    } catch (error) {
      // Handle error
      console.error('Error saving patient data to AsyncStorage:', error);
    }
  }

  static async loadFromStorage() {
    try {
      const data = await AsyncStorage.getItem('patientData');
      if (data) {
        const parsedData = JSON.parse(data);
        const patientData = new PatientData();

        // Initialize the patientData object with the loaded data...
        if (parsedData.patients) {
          patientData.patients = parsedData.patients.map((patient) => {
            const loadedPatient = new Patient(patient.patientName);
            if (patient.sessions) {
              loadedPatient.sessions = patient.sessions.map((session) => {
                const loadedSession = new Session(session.sessionDateTime);
                if (session.exercises) {
                  loadedSession.exercises = session.exercises.map((exercise) => {
                    return new Exercise(exercise.exerciseName, exercise.repetitions);
                  });
                }
                if (session.videos) {
                  loadedSession.videos = session.videos;
                }
                return loadedSession;
              });
            }
            return loadedPatient;
          });
        }
        return patientData;
      }
    } catch (error) {
      // Handle error
      console.error('Error loading patient data from AsyncStorage:', error);
    }

    // If there's no data or an error occurred, return a new instance
    return new PatientData();
  }
}



class Patient {
  constructor(patientName) {
    this.patientName = patientName;
    this.sessions = [];
  }

  addSession(sessionDateTime) {
    const session = new Session(sessionDateTime);
    this.sessions.push(session);
    return session;
  }

  // Add getters and setters here if needed
}

class Session {
  constructor(sessionDateTime) {
    this.sessionDateTime = sessionDateTime;
    this.exercises = [];
    this.videos = [];
  }

  addExercise(exerciseName, repetitions) {
    const exercise = new Exercise(exerciseName, repetitions);
    this.exercises.push(exercise);
  }
}

class Exercise {
  constructor(exerciseName, repetitions) {
    this.exerciseName = exerciseName;
    this.repetitions = repetitions;
  }

  // Add getters and setters here if needed
}

export default PatientData;

