import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note';
import './App.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  const handleAddNote = () => {
    axios.post('http://localhost:5000/api/notes', newNote)
      .then(response => {
        setNotes([...notes, response.data]);
        setNewNote({ title: '', content: '' });
      })
      .catch(error => console.error('Error adding note:', error));
  };

  const handleDeleteNote = (id) => {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(error => console.error('Error deleting note:', error));
  };

  return (
    <div className="App">
      <h1 className='NavApp'>Notes App</h1>
      <div className="  new-note" >
        <input
        className='title'
          type="text"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          placeholder="Content"
        />
        <button className='btn' onClick={handleAddNote}>Add Note</button>
      </div>
      <div className="notes-list">
        {notes.map(note => (
          <Note
            key={note.id}
            note={note}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
