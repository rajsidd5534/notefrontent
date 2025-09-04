import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotesAPI } from "../api";
import NoteForm from "../components/NoteForm";

export default function EditNote(){
  const { id } = useParams();
  const nav = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(()=>{
    (async ()=>{
      try {
        const n = await NotesAPI.get(id);
        setNote({ ...n, id: n.id || n._id });
      } catch(e){ console.error(e); alert("Could not load note") }
    })();
  },[id]);

  async function handleSave(payload){
    await NotesAPI.update(id, payload);
    nav("/");
  }

  if (!note) return <div className="empty">Loading…</div>;
  return <>
    <h1>Edit Note</h1>
    <NoteForm initial={note} onSave={handleSave} saveText="Update" />
  </>;
}
