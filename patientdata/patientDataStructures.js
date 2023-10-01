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
}

export {PatientData, Patient, Session, Exercise};

