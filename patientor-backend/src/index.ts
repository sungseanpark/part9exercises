import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diagnoses';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/diagnoses', diaryRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});