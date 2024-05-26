import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';
const app = express();
app.use(express.json())


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
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if(daily_exercises === undefined || target === undefined) {
        res.json({ error: "parameters missing" });
    }
    if(isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some((d: unknown) => isNaN(Number(d)))) {
        res.json({ error: "malformatted parameters" });
    }

    const daily_exercises2 = daily_exercises as string[];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    const hours: number[] = daily_exercises2.map((d: string) => Number(d));
    const result: Result = calculateExercises(hours, Number(target));
    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});