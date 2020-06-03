import React from 'react';
import { Container, List, Icon, Loader, Button } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails, addNewEntry, deleteEntry } from "../state";
import { Patient, NewEntry } from "../types";
import EntryDetails from './entryDetails';
import AddPatientModal from '../AddEntry';


const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const {data: newEntryFromApi } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`, values
      );

      dispatch(addNewEntry(newEntryFromApi));
      closeModal();
    } catch(e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

  const onDeleteEntry = async (entryId: string) => {
    try {
      await axios.delete(`${apiBaseUrl}/patients/${id}/entries/${entryId}`);
      dispatch(deleteEntry(entryId));
    } catch (e) {
      setError(e.response.data);
    }
  };


  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch (e) {
        console.error(e.response.data);
      }
    };
    fetchPatientDetails();

    return () => {
      dispatch({ type: "SET_PATIENT_DETAILS", payload: null });
    };

  }, [dispatch, id]);

  if(!patient) {
    return <Loader active inline='centered' />;
  }

  const male = patient.gender === "male";

  return (
    <Container>
      <h2>{patient.name} <Icon name={male ? "mars stroke" : "venus"} /></h2>
      <List size="large">
        <List.Item>
          {`SSN: ${patient.ssn}`}
        </List.Item>
        <List.Item>
          {`Occupation: ${patient.occupation}`}
        </List.Item>
      </List>
    
      <h3>entries</h3>
      <AddPatientModal
        onSubmit={submitNewEntry}
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => setModalOpen(true)}>Add New Entry</Button>
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} onDelete={onDeleteEntry} />
      ))}
    </Container>
  );
};

export default PatientDetailsPage;