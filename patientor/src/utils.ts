/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewEntryData,
  Gender,
  Diagnosis,
  HealthCheckRating,
  NewEntry,
  SickLeave,
  Discharge,
  Entry
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isArray = (diagnosis: any): diagnosis is Array<Diagnosis['code']> => {
  return diagnosis.map((d: {d: Diagnosis['code']}) => isString(d));
};

const isRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isSickLeave = (leave: SickLeave): boolean => {
  return Object.values(leave).every(sl => isDate(sl));
};

const isDischarage = (discharge: Discharge): boolean => {
  const disArr = Object.values(discharge);
  return disArr.some(d => isDate(d)) && disArr.some(d => isString(d));
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name ${name}`);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect date or missing date ${date}`);
  }

  return date;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn ${ssn}`);
  }

  return ssn;
};

const parseJob = (job: any): string => {
  if (!job || !isString(job)) {
    throw new Error(`Incorrect or missing occupation ${job}`);
  }

  return job;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender}`);
  }

  return gender;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`incorrect or missing description ${description}`);
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`incorrect or missing specialist ${specialist}`);
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosis: any): Array<Diagnosis['code']> => {
  if (!diagnosis || !isArray(diagnosis)) {
    throw new Error(`incorrect or missing diagnosis code ${diagnosis}`);
  }
  return diagnosis;
};

const parseRating = (rating: number): HealthCheckRating => {
  if (!(rating === 0 || rating <= 3) || !isRating(rating)) {
    throw new Error(`MIssing or Incorrect healthCheckRating ${rating}`);
  }

  return rating;
};

const parseSickLeave = (leave: any): SickLeave => {
  if (!leave || !isSickLeave(leave)) {
    throw new Error(`Incorrect sickleave ${leave}`);
  }

  return leave;
};

const parseDischarge = (discharge: Discharge): Discharge => {
  if (!discharge || !isDischarage(discharge)) {
    throw new Error(`Incorrect or missing discharge ${discharge}`);
  }

  return discharge;
};

export const parseEntry = (entry: any): NewEntry  => {

  const newEntry = {
    date: parseDate(entry.date),
    description: parseDescription(entry.description),
    specialist: parseSpecialist(entry.specialist),
    diagnosisCodes: entry.diagnosisCodes
      ? parseDiagnosisCodes(entry.diagnosisCodes)
      : undefined
  };
  
  if (entry.type === 'HealthCheck') {
    entry.diagnosisCodes &&
    entry.diagnosisCodes.length === 0 &&
    delete newEntry.diagnosisCodes;
    return {
      ...newEntry,
      healthCheckRating: parseRating(entry.healthCheckRating),
      type: 'HealthCheck'
    };
  }

  if (entry.type === 'OccupationalHealthcare') {
    return {
      ...newEntry,
      employerName: parseName(entry.employerName),
      sickLeave: entry.sickLeave
        ? parseSickLeave(entry.sickLeave)
        : undefined,
      type: 'OccupationalHealthcare'
    };
  }

  return {
    ...newEntry,
    type: 'Hospital',
    discharge: parseDischarge(entry.discharge)
  };
};

export const parseExistingEntry = (entry: any): Entry => {

  const newEntry = {
    id: entry.id,
    date: parseDate(entry.date),
    description: parseDescription(entry.description),
    specialist: parseSpecialist(entry.specialist),
    diagnosisCodes: entry.diagnosisCodes
      ? parseDiagnosisCodes(entry.diagnosisCodes)
      : undefined
  };

  if (entry.type === 'HealthCheck') {
    entry.diagnosisCodes &&
    entry.diagnosisCodes.length === 0 &&
    delete newEntry.diagnosisCodes;
    
    return {
      ...newEntry,
      healthCheckRating: parseRating(entry.healthCheckRating),
      type: 'HealthCheck'
    };
  }

  if (entry.type === 'OccupationalHealthcare') {
    return {
      ...newEntry,
      employerName: parseName(entry.employerName),
      sickLeave: entry.sickLeave
        ? parseSickLeave(entry.sickLeave)
        : undefined,
      type: 'OccupationalHealthcare'
    };
  }

  return {
    ...newEntry,
    type: 'Hospital',
    discharge: parseDischarge(entry.discharge)
  };
};

const toNewPatientEntry = (object: any): NewEntryData => {

  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseJob(object.occupation),
    entries: object.entries 
      ? object.entries.map((e: {e: any }) => parseExistingEntry(e))  
      : []
  };
};

export default toNewPatientEntry;