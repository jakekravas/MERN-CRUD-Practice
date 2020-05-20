import React, { useEffect, useState, useContext } from 'react';
import NoteContext from "../../context/notes/noteContext";

const AddNote = props => {
  const noteContext = useContext(NoteContext);
  const { addNote, getNotes, notes } = noteContext;

  // useEffect(() => {
  //   props.history.push("/");
  // }, [notes]);

  const [newNote, setNewNote] = useState({
    title: "",
    content: ""
  });

  const { title, content } = newNote;

  const onChange = e => setNewNote({
    ...newNote, [e.target.name]: e.target.value
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (title === ""){
      alert("Title is required");
    } else {
      await addNote(newNote);
      await getNotes();
      props.history.push("/");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input 
          type="text"
          name="title"
          value={title}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <input 
          type="text"
          name="content"
          value={content}
          onChange={onChange}
        />
      </div>
      <button type="submit">Add Note</button>
    </form>
  )
}

export default AddNote;