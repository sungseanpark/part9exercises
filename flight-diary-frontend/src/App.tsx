import { useState, useEffect } from "react";
import axios from "axios";
import { NonSensitiveDiaryEntry, Visibility, Weather } from "./types";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        setNewDate('');
        setNewVisibility('');
        setNewWeather('');
        setNewComment('');
      }).catch(error => {
        if (axios.isAxiosError(error)){
          if (error.response){
            setErrorMessage(error.response.data);
            setTimeout(() => {
              setErrorMessage('');
            }, 5000);
          }
        }
      });
};

  return (
    <div>
      <h1>Add new entry</h1>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <form onSubmit={diaryEntryCreation}>
        date<input
          type={"date"}
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)} 
        /> <br />
        <div>visibility {" "}
          great<input type="radio" name="visibility"
            onChange={() => setNewVisibility('great')} />
          good<input type="radio" name="visibility"
            onChange={() => setNewVisibility('good')} />
          ok <input type="radio" name="visibility"
            onChange={() => setNewVisibility('ok')} />
          poor <input type="radio" name="visibility"
            onChange={() => setNewVisibility('poor')} />
        </div>
        <div>weather {" "}
          sunny<input type="radio" name="weather"
            onChange={() => setNewWeather('sunny')} />
          rainy<input type="radio" name="weather"
            onChange={() => setNewWeather('rainy')} />
          cloudy <input type="radio" name="weather"
            onChange={() => setNewWeather('cloudy')} />
          stormy <input type="radio" name="weather"
            onChange={() => setNewWeather('stormy')} />
          windy <input type="radio" name="weather"
            onChange={() => setNewWeather('windy')} />
        </div>
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
