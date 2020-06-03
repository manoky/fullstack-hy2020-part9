import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { HealthCheckRating, NewHealthCheckEntry, Diagnosis } from '../types';
import {
  TextField,
  NumberField,
  TextAreaField,
  DiagnosisSelection
} from '../AddPatientModal/FormField';
import { isDate } from '../utils';


interface Props {
  onSubmit: (values: NewHealthCheckEntry) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

const HealthCheckForm: React.FC<Props> = ({ onSubmit, onCancel, diagnoses }) => {

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        type: "HealthCheck"
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isDate(values.date)) {
          errors.date = 'Incorrect value entered ' + values.date;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        return errors;
      }}
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
            <Field
              label="healthCheckRating"
              component={NumberField}
              name="healthCheckRating"
              min={0}
              max={3}
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

export default HealthCheckForm;