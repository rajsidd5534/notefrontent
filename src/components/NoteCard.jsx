import { Link } from "react-router-dom";

export default function NoteCard({ note, onDelete, onShareToggle }) {
  const shareUrl = `${window.location.origin}/share/${note.id}`;

  return (
    <div className="card">
      <h3>{note.title}</h3>
      <div className="meta">{note.updatedAt ? `Updated ${new Date(note.updatedAt).toLocaleString()}` : ""}</div>
      <p style={{marginTop:10}}>{note.content.length > 240 ? note.content.slice(0,240) + "…" : note.content}</p>

      <div className="actions">
        <Link className="btn secondary" to={`/edit/${note.id}`}>Edit</Link>
        <button className="btn secondary" onClick={() => {
          if (confirm("Delete this note?")) onDelete(note.id);
        }}>Delete</button>

        {note.shared ? (
          <>
            <button className="btn" onClick={() => onShareToggle(note.id, false)}>Unshare</button>
            <a className="copy" href={shareUrl} target="_blank" rel="noreferrer">Open Link</a>
            <button className="copy" onClick={() => navigator.clipboard.writeText(shareUrl).then(()=>alert("Link copied"))}>Copy</button>
          </>
        ) : (
          <button className="btn" onClick={() => onShareToggle(note.id, true)}>Share</button>
        )}
      </div>
    </div>
  );
}
