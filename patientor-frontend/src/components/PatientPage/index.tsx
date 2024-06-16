import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import WorkIcon from '@mui/icons-material/Work';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import List from '@mui/material/List';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import {  Patient, Diagnosis, BaseEntry, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from "../../types";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>() as { id: string };
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    
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

    const getDiagnoseName = (code: string) => {
        const diagnose = diagnoses.find((diagnose) => diagnose.code === code);
        return diagnose ? diagnose.name : code;
    };

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const HealthCheckRatingIcon: React.FC<{rating: HealthCheckRating}> = ({rating}) => {
        switch (rating){
            case 0:
                return <FavoriteIcon style={{ color: 'green' }}></FavoriteIcon>;
            case 1:
                return <FavoriteIcon style={{ color: 'yellow' }}></FavoriteIcon>;
            case 2:
                return <FavoriteIcon style={{ color: 'orange' }}></FavoriteIcon>;
            case 3:
                return <FavoriteIcon style={{ color: 'red' }}></FavoriteIcon>;
            default:
                return null;
        }
    };

    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case "Hospital":
                return (
                    <div>
                        <h4>{entry.date} <LocalHospitalIcon></LocalHospitalIcon></h4>
                        <h4><i>{entry.description}</i></h4>
                        <div>Discharge: {entry.discharge.date} {entry.discharge.criteria}</div>
                        <div>Diagnose by {entry.specialist}</div>
                    </div>
                );
            case "OccupationalHealthcare":
                return (
                    <div>
                        <h4>{entry.date} <WorkIcon></WorkIcon> {entry.employerName}</h4>
                        <h4><i>{entry.description}</i></h4>
                        {entry.sickLeave && <div>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</div>}
                        <div>Diagnose by {entry.specialist}</div>
                    </div>
                );
            case "HealthCheck":
                return (
                    <div>
                        <h4>{entry.date} <MonitorHeartIcon></MonitorHeartIcon></h4>
                        <h4><i>{entry.description}</i></h4>
                        {/* <div>{Health check rating: {entry.healthCheckRating}}</div> */}
                        <HealthCheckRatingIcon rating={entry.healthCheckRating} />
                        <div>Diagnose by {entry.specialist}</div>
                    </div>
                );
            default:
                return assertNever(entry);
        }
    };

    const genderIcon: React.FC<{patient: Patient}> = ({patient}) => {
        if(patient.gender === 'male'){
            return <MaleIcon></MaleIcon>;
        }
        else if(patient.gender === 'female'){
            return <FemaleIcon></FemaleIcon>;
        }
        else
            return null;
    };


    
    
    if (!patient) {
        return <div>Loading...</div>;
    }

    if(patient){
        return (
            <div>
            <h2>{patient.name} {genderIcon({patient})}</h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <AddHealthCheckEntryForm onCancel={console.log} onSubmit={patientService.createEntry} patientId={patient.id}></AddHealthCheckEntryForm>
            <h3>entries</h3>
            <ul>
                {patient.entries.map(entry => (
                    <List key={entry.id} sx={{ border: 1 , borderRadius: 1, margin: 1, padding: 1}}>
                        {/* {entry.date} <i>{entry.description}</i> */}
                        {EntryDetails({entry})}
                        <ul>
                            {entry.diagnosisCodes?.map(code => (
                                <li key={code}>{code} {getDiagnoseName(code)}</li>
                            ))}
                        </ul>
                    </List>
                ))}
            </ul>
            </div>
        );
    }
    // else if(patient.gender === 'female'){
    //     return (
    //         <div>
    //         <h2>{patient.name} <FemaleIcon></FemaleIcon></h2>
    //         <div>ssn: {patient.ssn}</div>
    //         <div>occupation: {patient.occupation}</div>
    //         <h3>entries</h3>
    //         <ul>
    //             {patient.entries.map(entry => (
    //                 <li key={entry.id}>
    //                     {/* {entry.date} <i>{entry.description}</i> */}
    //                     {EntryDetails({entry})}
    //                     <ul>
    //                         {entry.diagnosisCodes?.map(code => (
    //                             <li key={code}>{code}</li>
    //                         ))}
    //                     </ul>
    //                 </li>
    //             ))}
    //         </ul>
    //         </div>
    //     );
    // }
    // else{
    //     return (
    //         <div>
    //         <h2>{patient.name}</h2>
    //         <div>ssn: {patient.ssn}</div>
    //         <div>occupation: {patient.occupation}</div>
    //         <h3>entries</h3>
    //         <ul>
    //             {patient.entries.map(entry => (
    //                 <li key={entry.id}>
    //                     {entry.date} <i>{entry.description}</i>
    //                     <ul>
    //                         {entry.diagnosisCodes?.map(code => (
    //                             <li key={code}>{code}</li>
    //                         ))}
    //                     </ul>
    //                 </li>
    //             ))}
    //         </ul>
    //         </div>
    //     );
    // }
    
};

export default PatientPage;