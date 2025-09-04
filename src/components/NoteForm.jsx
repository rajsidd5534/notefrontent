import { useEffect, useState } from "react";

export default function NoteForm({ initialNote, onSave }) {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");

  // If editing an existing note, update the state when initialNote changes
  useEffect(() => {
    setTitle(initialNote?.title || "");
    setContent(initialNote?.content || "");
  }, [initialNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Both title and content are required!");
      return;
    }
    // Send id if editing
    const noteToSave = initialNote?._id
      ? { id: initialNote._id, title, content }
      : { title, content };

    onSave(noteToSave);

    // Clear fields only if creating new note
    if (!initialNote) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Content</label>
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button type="submit">{initialNote ? "Update" : "Create"}</button>
    </form>
  );
}
