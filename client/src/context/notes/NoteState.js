import React, { useReducer } from 'react';
import axios from "axios";
import NoteContext from "./noteContext";
import noteReducer from "./noteReducer";

const NoteState = props => {
  const initialState = {
    notes: null,
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
        type: "NOTES_ERROR",
        payload: err.response.data.msg
      });
    }
  }

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        error: state.error,
        getNotes
      }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;