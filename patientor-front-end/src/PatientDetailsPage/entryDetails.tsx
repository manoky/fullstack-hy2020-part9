import React from 'react';
import { Entry } from '../types';
import OccupationalHealthcareEntry from './occupationHealthcare';
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from './HealthCheckEntry';



export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface EntryDetailsProps {
  onDelete: (id: string) => void;
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, onDelete }) => {
  
  switch(entry.type) {
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} onDelete={onDelete} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} onDelete={onDelete} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} onDelete={onDelete} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;