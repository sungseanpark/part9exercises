import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import { getAllDiaryEntries } from './diaryService';

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
  // const [newNote, setNewNote] = useState('');

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  // const noteCreation = (event: React.SyntheticEvent) => {
  //   event.preventDefault()
  //   createNote({ content: newNote }).then(data => {
  //     setNotes(notes.concat(data))
  //   })

  //   setNewNote('')
  // };

  return (
    <div>
      {/* <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)} 
        />
        <button type='submit'>add</button>
      </form> */}
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  )
}

export default App;
