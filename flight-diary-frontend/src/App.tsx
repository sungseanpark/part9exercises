import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";
import { getAllDiaryEntries, createDiaryEntry } from './diaryService';

interface DiaryEntryProps {
  diaryEntries: NonSensitiveDiaryEntry[];
}

const DiaryEntries = (props: DiaryEntryProps) => (
  <div>
    <div>
      <h1>Diary entries</h1>
    </div>
    <div>
    {props.diaryEntries.map(diaryEntry =>
        <DiaryEntry key={diaryEntry.id} diaryEntry={diaryEntry} />
      )}
    </div>
  </div>
)

const DiaryEntry = ( {diaryEntry}: { diaryEntry: NonSensitiveDiaryEntry } )=> (
  <div>
    <h2>{diaryEntry.date}</h2>
    <p>{diaryEntry.weather}</p>
    <p>{diaryEntry.visibility}</p>
  </div>
)


const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiaryEntry(
      { date: newDate,
        visibility: newVisibility as Visibility,
        weather: newWeather as Weather,
        comment: newComment,
       }).then(data => {
      setDiaryEntries(diaryEntries.concat(data))
    })

    setNewDate('');
    setNewVisibility('');
    setNewWeather('');
    setNewComment('');
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={diaryEntryCreation}>
        date<input
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)} 
        /> <br />
        visibility<input
          value={newVisibility}
          onChange={(event) => setNewVisibility(event.target.value)}
        /> <br />
        weather<input
          value={newWeather}
          onChange={(event) => setNewWeather(event.target.value)}
        /> <br />
        comment<input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        /> <br />
        <button type='submit'>add</button>
      </form>
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  )
}

export default App;
