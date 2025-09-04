import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotesAPI } from "../api";

export default function ShareView(){
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [err, setErr] = useState("");

  useEffect(()=>{
    (async ()=>{
      try {
        const n = await NotesAPI.getPublic(id);
        setNote({ ...n, id: n.id || n._id });
      } catch (e) {
        console.error(e);
        setErr("This note is not shared or does not exist.");
      }
    })();
  },[id]);

  if (err) return <div className="empty">{err}</div>;
  if (!note) return <div className="empty">Loading…</div>;

  return (
    <div className="card">
      <div className="small" style={{marginBottom:8}}>Public note</div>
      <h2>{note.title}</h2>
      <div className="meta">{note.updatedAt ? `Updated ${new Date(note.updatedAt).toLocaleString()}` : ""}</div>
      <p style={{marginTop:12}}>{note.content}</p>
    </div>
  );
}
