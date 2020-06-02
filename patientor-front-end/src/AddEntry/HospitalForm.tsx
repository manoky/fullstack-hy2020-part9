import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { NewHospitalEntry, Diagnosis } from '../types';
import {
  TextField,
  TextAreaField,
  DiagnosisSelection
} from '../AddPatientModal/FormField';

interface Props {
  onSubmit: (values: NewHospitalEntry) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

const HospitalForm: React.FC<Props> = ({ onSubmit, onCancel, diagnoses }) => {

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        },
        type: "Hospital"
      }}
      onSubmit={onSubmit}

      validationSchema={
        Yup.object().shape({
          date: Yup.date().required('Field is required'),
          specialist: Yup.string().required('Field is required'),
          description: Yup.string().required('Field is required'),
          discharge: Yup.object().shape({
            date: Yup.date().required('Field is required'),
            criteria: Yup.string().required('Field is required')
          })
        })
      }
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue, touched, errors }) => {
  
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
            <Field
              label="Discharge date"
              component={TextField}
              name="discharge.date"
              placeholder="YYYY-MM-DD"
              errors={errors}
              touched={touched}
            />
            <Field
              label="criteria"
              component={TextField}
              name="discharge.criteria"
              placeholder="Discharge Criteria"
              errors={errors}
              touched={touched}
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

export default HospitalForm;