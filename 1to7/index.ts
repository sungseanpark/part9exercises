import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    if(req.query.weight === undefined || req.query.height === undefined || isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height)) ) {
        res.json({ error: "malformatted parameters" });
    }
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const bmi = calculateBmi(height, weight);
    res.json({
        weight,
        height,
        bmi
    });
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});