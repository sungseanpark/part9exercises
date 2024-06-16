import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation
    }));
};


const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( entry: EntryWithoutId, patientId: string ): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  const patient = patients.find( patient => patient.id === patientId );
  if (patient) {
    patient.entries.push(newEntry);
  } else {
    throw new Error('Patient not found');
  }

  return newEntry;
}

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addEntry
};