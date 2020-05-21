import React, { useEffect, useState, useContext } from 'react';
import NoteContext from "../../context/notes/noteContext";
import AuthContext from "../../context/auth/authContext";

const AddNote = props => {
  const noteContext = useContext(NoteContext);
  const authContext = useContext(AuthContext);
  const { addNote, getNotes, notes } = noteContext;

  useEffect(() => {
    authContext.loadUser();
  }, []);

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
    <div className="row">
      <div className="col-md-4 mx-auto mt-4">
        <div className="card text-center card-auth">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input 
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={onChange}
                />
            </div>
            <div className="form-group">
              <textarea
                name="content"
                cols="30"
                rows="10"
                placeholder="Content"
                value={content}
                onChange={onChange}
              >
              </textarea>
            </div>
            <button type="submit" className="auth-btn">Add Note</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNote;