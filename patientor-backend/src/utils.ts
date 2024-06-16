// import { parse } from 'uuid';
import { NewPatient, Gender, Entry, EntryWithoutId, Diagnosis, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
  };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return ssn;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return occupation;
  };

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
  
};

const isEntry = (entry: unknown): entry is Entry => {
    return (entry as Entry).type !== undefined;
}

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !Array.isArray(entries) || !entries.every(entry => isEntry(entry))) {
        throw new Error('Incorrect or missing entries');
    }
    return entries as Entry[];
}

export const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }
  
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object)  {
      const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
      };
    
      return newPatient;
    }
  
    throw new Error('Incorrect data: a field missing');
  };

  const parseDescription = (description: unknown): string => {
    if (!isString(description)) {
      throw new Error('Incorrect or missing description');
    }
  
    return description;
  };
  
  const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)) {
      throw new Error('Incorrect or missing specialist');
    }
  
    return specialist;
  };

  const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };

  const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };

  const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
  };

  const isDischarge = (object: any): object is { date: string, criteria: string } => {
    return (object.date && object.criteria);
  };

  const parseDischarge = (object: unknown): { date: string, criteria: string } => {
    if (!object || typeof object !== 'object' || !isDischarge(object)) {
      throw new Error('Incorrect or missing discharge');
    }
    return object;
  };

  const isSickLeave = (object: any): object is { startDate: string, endDate: string } => {
    return (object.startDate && object.endDate);
  };

  const parseSickLeave = (object: unknown): { startDate: string, endDate: string } => {
    if (!object || typeof object !== 'object' || !isSickLeave(object)) {
      throw new Error('Incorrect or missing sick leave');
    }
    return object;
  };

  const parseEmployerName = (employerName: unknown): string => {
    if (!isString(employerName)) {
      throw new Error('Incorrect or missing employer name');
    }
    return employerName;
  };

  export const toNewEntry = (object: unknown): EntryWithoutId => {
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }
  
    if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'type' in object) {
      switch (object.type) {
        case 'HealthCheck':
          if (!('healthCheckRating' in object)) {
            throw new Error('Incorrect or missing health check rating');
          }
          const newHealthCheckEntry: EntryWithoutId = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
          return newHealthCheckEntry;
        case 'Hospital':
          if (!('discharge' in object)) {
            throw new Error('Incorrect or missing discharge');
          }
          const newHospitalEntry: EntryWithoutId = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: object.type,
            discharge: parseDischarge(object.discharge)
          };
          return newHospitalEntry;
        case 'OccupationalHealthcare':
          if (!('employerName' in object)) {
            throw new Error('Incorrect or missing employer name');
          }
          if (!('sickLeave' in object)) {
            throw new Error('Incorrect or missing sick leave');
          }
          const newOccupationalHealthcareEntry: EntryWithoutId = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: object.type,
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
          };
          return newOccupationalHealthcareEntry;
        default:
          throw new Error('Incorrect or missing entry type');
      }
    }
    throw new Error('Incorrect data: a field missing');
  };

  
  // export default {
  //   toNewPatient,
  //   toNewEntry
  // };