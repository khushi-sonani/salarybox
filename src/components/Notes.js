import React, { useState, useEffect } from 'react';
import './Notes.css'; // Import the CSS file
import axios from 'axios';

function Notes() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };

  const addNote = async () => {
    if (noteText.trim() !== '') {
      try {
        // Send a POST request to create a new note
        const response = await axios.post("https://attendance-backend-five.vercel.app/notes/notes", {
          addnote: noteText,
        });

        if (response.status === 201) {
          const data = response.data;
          setMessage(data.message);

          // Assuming your server sends back the newly created note, add it to the 'notes' state
          setNotes((prevNotes) => [...prevNotes, data.note]);
          setNoteText(""); // Clear the input field
        } else {
          setMessage("Failed to create a note.");
        }
      } catch (error) {
        setMessage("Internal server error.");
        console.error("Error:", error);
      }
    } else {
      window.alert('Please enter a note before adding.');
    }
  };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notes/notes"); // Replace with your API endpoint
        setNotes(response.data); // Assuming the API response contains an array of notes
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      <div className="add-note">
        <input
          name="addnote"
          type="text"
          placeholder="Add a new note"
          value={noteText}
          onChange={handleNoteChange}
        />
        <button onClick={addNote} className='button'>Add</button>
      </div>
      <ul className="notes-list">
        {notes.map((note, index) => (
          <li key={index}>
            {note.addnote} <button onClick={() => deleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;