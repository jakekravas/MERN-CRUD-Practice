import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NoteContext from "../../context/notes/noteContext";

const NoteItem = ({ note }) => {
  const { _id, title, content } = note;
  const noteContext = useContext(NoteContext);
  const { deleteNote, getNotes, setCurrent } = noteContext;

  const onDelete = async () => {
    await deleteNote(_id);
    getNotes();
  };

  const onEdit = async () => {
    await setCurrent(note);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{content}</p>
        <Link to="/addnote">
          <button className="btn btn-dark mr-1" onClick={onEdit}>Edit</button>
        </Link>
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}

export default NoteItem;