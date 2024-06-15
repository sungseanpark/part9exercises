import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import {  Patient, Diagnose } from "../../types";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>() as { id: string };
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
    
    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getOne(id);
            setPatient(patient);
        };
        void fetchPatient();
    }, [id]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const diagnoses = await diagnosesService.getAll();
            setDiagnoses(diagnoses);
        };
        void fetchDiagnoses();
    }, []);
    
    if (!patient) {
        return <div>Loading...</div>;
    }

    if (patient.gender === 'male'){
        return (
            <div>
            <h2>{patient.name} <MaleIcon></MaleIcon></h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <h3>entries</h3>
            <ul>
                {patient.entries.map(entry => (
                    <li key={entry.id}>
                        {entry.date} <i>{entry.description}</i>
                        <ul>
                            {entry.diagnosisCodes?.map(code => (
                                <li key={code}>{code} {diagnoses.find((diagnose) => diagnose.code === code)?.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            </div>
        );
    }
    else if(patient.gender === 'female'){
        return (
            <div>
            <h2>{patient.name} <FemaleIcon></FemaleIcon></h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <h3>entries</h3>
            <ul>
                {patient.entries.map(entry => (
                    <li key={entry.id}>
                        {entry.date} <i>{entry.description}</i>
                        <ul>
                            {entry.diagnosisCodes?.map(code => (
                                <li key={code}>{code}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            </div>
        );
    }
    else{
        return (
            <div>
            <h2>{patient.name}</h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <h3>entries</h3>
            <ul>
                {patient.entries.map(entry => (
                    <li key={entry.id}>
                        {entry.date} <i>{entry.description}</i>
                        <ul>
                            {entry.diagnosisCodes?.map(code => (
                                <li key={code}>{code}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            </div>
        );
    }
    
};

export default PatientPage;