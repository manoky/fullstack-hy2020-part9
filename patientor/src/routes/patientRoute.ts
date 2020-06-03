import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { parseEntry }  from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getEntries()
    .find(p => p.id === req.params.id);
  if (!patient) {
    res.status(400).json({ error: 'requested patient record doesn\'t exist'});
  } else {
    res.status(200).json(patient);
  }
});

router.post('/', (req, res) => {
  try {
    const parseData = toNewPatientEntry(req.body);
    const newPatientEntry = patientService.addPatient(parseData);

    res.status(200).json(newPatientEntry);

  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const parseData = parseEntry(req.body);
    const patient = patientService.addEntry(parseData, req.params.id);
    res.status(200).json(patient);
  } catch (e) {
    res.status(400).send(e.message);
  }

});

router.delete('/:id/entries/:entryId', (req, res) => {
  try {
    patientService.removeEntry(req.params.id, req.params.entryId);
    res.status(204).end();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;