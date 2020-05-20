import React, { useContext, useEffect } from 'react'
import Notes from "../notes/Notes";
import AuthContext from "../../context/auth/authContext";
import NoteContext from "../../context/notes/noteContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const noteContext = useContext(NoteContext);

  const { getNotes, notes } = noteContext;
  const { user, loadUser } = authContext;
  
  useEffect(() => {
    // getNotes();
    loadUser();
  }, []);

  return (
    <div>
      <h4>All Notes</h4>
      {/* {notes ? <Notes/> : <p>No notes to display</p>} */}
      <Notes/>
    </div>
  )
}

export default Home;