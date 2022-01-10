import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  const Composant = ({ value }) => <h1>{value}</h1>;
  return (
    <div className="App">
      <nav>
        <Link style={{ margin: 1 }} to="/">
          HOME
        </Link>
        <Link style={{ margin: 1 }} to="/1">
          1
        </Link>
        <Link style={{ margin: 1 }} to="/2">
          2
        </Link>
        <Link style={{ margin: 1 }} to="/3">
          3
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Composant value="HOME" />} />
        <Route path="/1" element={<Composant value="1" />} />
        <Route path="/2" element={<Composant value="2" />} />
        <Route path="/3" element={<Composant value="3" />} />
      </Routes>
    </div>
  );
}

export default App;
