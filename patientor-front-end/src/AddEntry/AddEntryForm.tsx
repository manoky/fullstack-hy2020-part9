import React from 'react';
import { Divider } from 'semantic-ui-react';
import { NewEntry } from '../types';
import { useStateValue } from '../state';
import HealthCheckForm from './HealthCheckForm';
import Hospital from './HospitalForm';
import OccupationalHealthCareForm from './OccupationalHealthCareForm';
import { FormTypeSelectField, FormOption } from '../AddPatientModal/FormField';


interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const formOptions: FormOption[] = [
  {value: "Hospital", text: "Hospital"},
  {value: "HealthCheck", text: "HealthCheck"},
  {value: "OccupationalHealthcare", text: "OccupationalHealthcare"}
];

const AddEntry: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [formType, setFormType] = React.useState<any>('');
  const [{diagnoses}] = useStateValue();
  

  return (
    <div>
      <FormTypeSelectField
        label="Entry type"
        options={formOptions}
        onChange={(e, { value }) => setFormType(value)}
      />
      <Divider hidden />
      {formType === 'OccupationalHealthcare' && (
        <OccupationalHealthCareForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      )}
      {formType === 'HealthCheck' && (
        <HealthCheckForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      )}
      {formType === 'Hospital' && (
        <Hospital
          onCancel={onCancel}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      )}
      
    </div>
  );
};

export default AddEntry;