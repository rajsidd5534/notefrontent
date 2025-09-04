import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotesAPI } from "../api"; // Make sure api.js uses Railway URL
import NoteCard from "../components/NoteCard";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await NotesAPI.list();
      // accept either id or _id from backend
      setNotes(data.map(n => ({ ...n, id: n.id || n._id })));
      setError("");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || err.message || "Could not load notes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load() }, []);

  async function handleDelete(id) {
    await NotesAPI.remove(id);
    load();
  }

  async function handleShareToggle(id, makePublic) {
    if (makePublic) await NotesAPI.share(id); 
    else await NotesAPI.unshare(id);
    load();
  }

  if (loading) return <div className="empty">Loading notes…</div>;
  if (error) return <div className="empty">Error: {error}</div>;

  return (
    <>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
        <h1>All Notes</h1>
        <Link to="/new" className="btn">+ New Note</Link>
      </div>

      {notes.length === 0 ? (
        <div className="empty">
          No notes yet. Click <b>New Note</b> to create one.
        </div>
      ) : (
        <div className="grid">
          {notes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={handleDelete} 
              onShareToggle={handleShareToggle} 
            />
          ))}
        </div>
      )}
    </>
  );
}
