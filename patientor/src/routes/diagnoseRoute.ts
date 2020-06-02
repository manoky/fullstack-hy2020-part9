import express from 'express';
import diagnoseService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(diagnoseService.getAllDiagnoses());
});

export default router;