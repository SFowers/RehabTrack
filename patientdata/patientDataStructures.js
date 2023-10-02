import { v4 as uuidv4 } from 'uuid';

class PatientData {
  constructor() {
    this.patients = [];
  }

  addPatient(patient) {
    this.patients.push(patient);
  }
}

class Patient {
  constructor(patientName) {
    this.id = uuidv4();
    this.patientName = patientName;
    this.sessions = [];
  }

  addSession(sessionDateTime) {
    const session = new Session(sessionDateTime);
    this.sessions.push(session);
    return session;
  }
}

class Session {
  constructor(sessionDateTime) {
    this.id = uuidv4();
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
    this.id = uuidv4();
  }
}

export {PatientData, Patient, Session, Exercise};

