import { useEffect, useState } from "react";
import { NotesAPI } from "../api";
import NoteCard from "../components/NoteCard";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await NotesAPI.list();
        // Ensure data is always an array
        setNotes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setNotes([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await NotesAPI.remove(id);
      setNotes(notes.filter(note => (note.id || note._id) !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleShareToggle = async (id, share) => {
    try {
      const updatedNote = share
        ? await NotesAPI.share(id)
        : await NotesAPI.unshare(id);
      setNotes(notes.map(note => (note.id || note._id) === id ? updatedNote : note));
    } catch (err) {
      console.error("Error updating share status:", err);
    }
  };

  if (loading) return <p>Loading notes...</p>;

  return (
    <div className="notes-list">
      {Array.isArray(notes) && notes.length > 0 ? (
        notes.map(note => (
          <NoteCard
            key={note.id || note._id}
            note={note}
            onDelete={handleDelete}
            onShareToggle={handleShareToggle}
          />
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}
