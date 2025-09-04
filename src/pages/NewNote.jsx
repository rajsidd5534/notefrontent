import { useNavigate } from "react-router-dom";
import { NotesAPI } from "../api";
import NoteForm from "../components/NoteForm";

export default function NewNote(){
  const nav = useNavigate();

  async function handleSave(payload){
    await NotesAPI.create(payload);
    nav("/");
  }

  return (
    <>
      <h1>Create Note</h1>
      <NoteForm onSave={handleSave} saveText="Create" />
    </>
  );
}
