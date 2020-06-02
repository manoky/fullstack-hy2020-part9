import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_DETAILS";
      payload: Patient | null;
    }
  | {
      type: "SET_DIAGNOSIS";
      payload: Diagnosis[];
    }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
    }
  |{
    type: "DELETE_ENTRY";
    payload: string;
  };

  export const setPatientList = (data: Patient[]): Action => ({
    type: "SET_PATIENT_LIST",
    payload: data
  });

export const setPatientDetails = (data: Patient): Action => ({
  type: "SET_PATIENT_DETAILS",
  payload: data
});

export const setDiagnosis = (data: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSIS",
  payload: data
});

export const addNewEntry = (data: Patient): Action => ({
  type: "ADD_ENTRY",
  payload: data
});

export const deleteEntry = (id: string): Action => ({
  type: "DELETE_ENTRY",
  payload: id
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "SET_PATIENT_DETAILS":
      return {
        ...state,
        patient: action.payload
      };

    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnoses: action.payload
      };

    case "ADD_ENTRY":
      return {
        ...state,
        patient: action.payload
      };

    case "DELETE_ENTRY":
    if (state.patient) {
      return {
        ...state,
        patient: {
          ...state.patient,
          entries: state.patient.entries.filter(e => e.id !== action.payload)
        }
      };
    }
      
    return {
      ...state
    };
  
    default:
      return state;
  }
};
