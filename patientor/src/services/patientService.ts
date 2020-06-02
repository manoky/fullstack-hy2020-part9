import { v4 as uuid } from 'uuid';
import fs from 'fs';
import patientData from '../data/patients';
import { NonSensitiveData, Patient, NewEntryData, NewEntry } from '../types';


const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitiveData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const savePatients = (data: Patient[]) => {
  fs.writeFile('./src/data/data.json',
    JSON.stringify(data), err => {if (err) throw new Error(`${err}`); }
  );
};

const addPatient = (newData: NewEntryData): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...newData
  };

  patientData.push(newPatient);
  const newPatientsData = [...patientData, newPatient];

  savePatients(newPatientsData);

  return newPatient;
};

const addEntry = (newData: NewEntry, id: string): Patient => {
  const entryData = { ...newData, id: uuid()};
  const patient = patientData.find(p => p.id === id);
  if (!patient) throw new Error(`patient with id ${id} not found`);
  patient.entries.push(entryData);

    savePatients(patientData);

  return patient;
};

const removeEntry = (id: string, entryId: string) => {

  const newData = patientData.map(p => {
    return ( 
      p.id === id 
      ? { ...p, entries: p.entries.filter(e => e.id !== entryId)}
      : p
    );
  });
  
  savePatients(newData);
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addEntry,
  removeEntry
};
