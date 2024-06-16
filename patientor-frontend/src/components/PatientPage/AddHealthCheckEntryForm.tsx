import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import Alert from '@mui/material/Alert';

import { EntryWithoutId, HealthCheckRating } from "../../types";


interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId, id: string) => void;
  patientId: string;
}

interface HealthCheckOption{
  value: HealthCheckRating;
  label: string;
}

const healthCheckOptions: HealthCheckOption[] = Object.values(HealthCheckRating)
  .filter((v): v is HealthCheckRating => typeof v === 'number')
  .map(v => ({
    value: v, 
    label: v.toString()
  }));

const AddHealthCheckEntryForm = ({ onCancel, onSubmit, patientId }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCode, setDiagnosisCode] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = Number(event.target.value);
    const rating = healthCheckOptions.find(option => option.value === value);
    if (rating) {
      setHealthCheckRating(rating.value);
    }
  };

  

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    setDiagnosisCodes(diagnosisCode.length > 0 ? diagnosisCode.split(',') : []);
    try {
      await onSubmit({
        description,
        date,
        specialist,
        healthCheckRating,
        type: "HealthCheck",
        diagnosisCodes
      }, patientId); 
    } catch (e) {
      console.error(e.response?.data);
      setError(e.response?.data);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <h2>New Health Check Entry</h2>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth 
          value={diagnosisCode}
          onChange={({ target }) => setDiagnosisCode(target.value)}
        />
        <InputLabel id="healthCheckRating">Health Check Rating</InputLabel>
        <Select
          labelId="healthCheckRating"
          value={healthCheckRating}
          onChange={onHealthCheckRatingChange}
        >
          {healthCheckOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <Grid container>
          <Grid item>
            <Button onClick={onCancel}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button type="submit">Add</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddHealthCheckEntryForm;