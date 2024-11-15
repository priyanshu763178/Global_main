import React from "react";
import './Note.css'
function Note({ note, onDelete }) {
  return (
    <div className="note">
      <div className="note-content">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <button className=" btndelete" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Note;
