import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './calculateExercises';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    try {
      const results = {
        weight,
        height,
        bmi: calculateBmi(height, weight)
      };
      res.json(results);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "malformatted parameters"});
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercise', (req, res): any => {
  const days = req.body.daily_exercises;
  const target = req.body.target;

  if (!target || !days) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  try {
    const result = calculateExercises(days, target);
    res.status(200).json(result);
  } catch(error) {
    res.status(404).json({ error: error.message });
  }

});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening on Port ${PORT}`);
});
