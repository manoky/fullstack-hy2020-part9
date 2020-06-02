import { Diagnosis } from '../types';
import diagnoseData from '../data/diagnoses.json';

const getAllDiagnoses = (): Diagnosis[] => {
  return diagnoseData;
};

export default {
  getAllDiagnoses
};
