import express from 'express';
import cors from 'cors';
import diagnoseRoute from './routes/diagnoseRoute';
import patientRoute from './routes/patientRoute';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnoseRoute);
app.use('/api/patients', patientRoute);

app.get('/api/ping', (_req, res) => {
  console.log('someone is pinging');

  res.send('pong');
});


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
