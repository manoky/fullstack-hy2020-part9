import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { NewOccupationalHealthCareEntry, Diagnosis } from '../types';
import {
  TextField,
  TextAreaField,
  DiagnosisSelection
} from '../AddPatientModal/FormField';

interface Props {
  onSubmit: (values: NewOccupationalHealthCareEntry) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

const OccupationalHealthCareForm: React.FC<Props> = ({ onSubmit, onCancel, diagnoses }) => {

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        employerName: "",
        type: "OccupationalHealthcare",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validationSchema={
        Yup.object().shape({
          date: Yup.date().required('Field is required'),
          specialist: Yup.string().required('Field is required'),
          description: Yup.string().required('Field is required'),
          employerName: Yup.string().required('Field is required'),
          sickLeave: Yup.object().shape({
            startDate: Yup.date().required('Field is required'),
            endDate: Yup.date().required('Field is required')
          })
        })
      }
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue }) => {

        return (
          <Form className="form ui">
            <Field
              label="Entry type"
              component={TextField}
              name="type"
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              component={TextField}
              name="date"
            />
            <Field
              label="Description"
              placeholder="add entry description"
              component={TextAreaField}
              name="description"
            />
            <Field
              label="Specialist"
              placeholder="Add specialist name"
              component={TextField}
              name="specialist"
            />
            <h3>Sick leave</h3>
            <Field
              label="Start date"
              component={TextField}
              name="sickLeave.startDate"
              placeholder="start date YYYY-MM-DD"
            />
            <Field
              label="End date"
              component={TextField}
              name="sickLeave.endDate"
              placeholder="end date YYYY-MM-DD"
            />
            <Field
              label="Employer Name"
              component={TextField}
              name="employerName"
              placeholder="enter employer name"
            />

            <Field
              label="Diagnosis Codes"
              component={DiagnosisSelection}
              name="diagnosisCodes"
              diagnoses={diagnoses}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
              </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthCareForm;