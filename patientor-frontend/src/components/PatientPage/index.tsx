import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import {  Patient } from "../../types";

import patientService from "../../services/patients";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>() as { id: string };
    const [patient, setPatient] = useState<Patient | null>(null);
    
    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getOne(id);
            setPatient(patient);
        };
        void fetchPatient();
    }, [id]);
    
    if (!patient) {
        return <div>Loading...</div>;
    }

    if (patient.gender === 'male'){
        return (
            <div>
            <h2>{patient.name} <MaleIcon></MaleIcon></h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            </div>
        );
    }
    else if(patient.gender === 'female'){
        return (
            <div>
            <h2>{patient.name} <FemaleIcon></FemaleIcon></h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            </div>
        );
    }
    else{
        return (
            <div>
            <h2>{patient.name}</h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            </div>
        );
    }
    
};

export default PatientPage;