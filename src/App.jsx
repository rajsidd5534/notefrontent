import { Link, Route, Routes } from "react-router-dom";
import EditNote from "./pages/EditNote";
import Home from "./pages/Home";
import NewNote from "./pages/NewNote";
import ShareView from "./pages/ShareView";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="container">
          <Link to="/" className="brand">📝 Noteaap</Link>
          <nav>
            <Link to="/new" className="btn">+ New</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
          <Route path="/share/:id" element={<ShareView />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container"></div>
      </footer>
    </div>
  );
}
