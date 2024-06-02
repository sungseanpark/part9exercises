import axios from 'axios';
import { NonSensitiveDiaryEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaryEntries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

// export const createNote = (object: NewNote) => {
//   return axios
//     .post<Note>(baseUrl, object)
//     .then(response => response.data)
// }