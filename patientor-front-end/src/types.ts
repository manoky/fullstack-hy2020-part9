export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface SickLeave {
  startDate: string | undefined;
  endDate: string | undefined;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface AddNewEntry {
  id: string;
  data: Entry;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntryTypes extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntryTypes extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntryTypes extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}


export type NewHospitalEntry = Omit<HospitalEntryTypes, 'id'>;
export type NewOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntryTypes, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntryTypes, 'id'>;

export type Entry =
  | HospitalEntryTypes
  | OccupationalHealthCareEntryTypes
  | HealthCheckEntryTypes;

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthCareEntry
  | NewHealthCheckEntry;

