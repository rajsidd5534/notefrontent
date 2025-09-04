import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotesAPI } from "../api";
import NoteForm from "../components/NoteForm";

export default function EditNote() {
  const { id } = useParams();
  const nav = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const n = await NotesAPI.get(id);
        // Ensure both id and _id are handled
        setNote({ ...n, id: n.id || n._id });
      } catch (e) {
        console.error(e);
        alert("Could not load note");
      }
    })();
  }, [id]);

  async function handleSave(payload) {
    // payload now includes id if needed
    await NotesAPI.update(id, payload);
    nav("/"); // redirect to home after update
  }

  if (!note) return <div className="empty">Loading…</div>;

  return (
    <>
      <h1>Edit Note</h1>
      {/* Updated prop names to match the NoteForm */}
      <NoteForm initialNote={note} onSave={handleSave} />
    </>
  );
}
