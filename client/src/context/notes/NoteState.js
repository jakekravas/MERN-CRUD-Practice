import React, { useReducer } from 'react';
import axios from "axios";
import NoteContext from "./noteContext";
import noteReducer from "./noteReducer";

const NoteState = props => {
  const initialState = {
    notes: null,
    current: null,
    error: null
  }

  const [state, dispatch] = useReducer(noteReducer, initialState);

  const getNotes = async () => {
    try {
      const res = await axios.get("/api/notes");
      console.log("RES DATA: " + res.data);
      dispatch({
        type: "GET_NOTES",
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: "NOTE_ERROR",
        payload: err.response.msg
      });
    }
  };

  const addNote = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/notes", formData, config);

      dispatch({
        type: "ADD_NOTE",
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: "NOTE_ERROR",
        payload: err.response.msg
      });
    }
  };

  const deleteNote = async id => {
    try {
      await axios.delete(`api/notes/${id}`);
      dispatch({
        type: "DELETE_NOTE",
        payload: id
      });
    } catch (err) {
      dispatch({
        type: "NOTE_ERROR",
        payload: err.response.msg
      });
    }
  };

  const updateNote = async note => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const res = await axios.put(`/api/notes/${note._id}`, note, config);
      dispatch({
        type: "UPDATE_NOTE",
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: "NOTE_ERRR",
        payload: err.response.msg
      })
    }
  }

  const setCurrent = note => {
    dispatch({
      type: "SET_CURRENT",
      payload: note
    })
  };

  const clearCurrent = () => {
    dispatch({
      type: "CLEAR_CURRENT"
    })
  };

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        current: state.current,
        error: state.error,
        getNotes,
        addNote,
        deleteNote,
        updateNote,
        setCurrent,
        clearCurrent
      }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;