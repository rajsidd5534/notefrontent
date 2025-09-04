import { Link } from "react-router-dom";

export default function NoteCard({ note, onDelete, onShareToggle }) {
  // Normalize MongoDB id
  const noteId = note.id || note._id;

  // Use environment variable for frontend URL
  const shareUrl = `${import.meta.env.VITE_FRONTEND_URL || window.location.origin}/share/${noteId}`;

  return (
    <div className="card">
      <h3>{note.title}</h3>
      <div className="meta">
        {note.updatedAt ? `Updated ${new Date(note.updatedAt).toLocaleString()}` : ""}
      </div>
      <p style={{ marginTop: 10 }}>
        {note.content ? (note.content.length > 240 ? note.content.slice(0, 240) + "…" : note.content) : ""}
      </p>

      <div className="actions">
        <Link className="btn secondary" to={`/edit/${noteId}`}>
          Edit
        </Link>

        <button
          className="btn secondary"
          onClick={() => {
            if (confirm("Delete this note?")) onDelete(noteId);
          }}
        >
          Delete
        </button>

        {note.shared ? (
          <>
            <button className="btn" onClick={() => onShareToggle(noteId, false)}>
              Unshare
            </button>
            <a className="copy" href={shareUrl} target="_blank" rel="noreferrer">
              Open Link
            </a>
            <button
              className="copy"
              onClick={() => navigator.clipboard.writeText(shareUrl).then(() => alert("Link copied"))}
            >
              Copy
            </button>
          </>
        ) : (
          <button className="btn" onClick={() => onShareToggle(noteId, true)}>
            Share
          </button>
        )}
      </div>
    </div>
  );
}
