import React, { useContext } from 'react';
import NoteContext from "../../context/notes/noteContext";

const NoteItem = ({ note }) => {
  const { _id, title, content } = note;
  const noteContext = useContext(NoteContext);
  const { deleteNote, getNotes } = noteContext;

  const onDelete = async () => {
    await deleteNote(_id);
    getNotes();
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{content}</p>
        <button className="btn btn-dark mr-1">Edit</button>
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}

export default NoteItem;