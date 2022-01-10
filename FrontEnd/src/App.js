import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { AuthenticationProvider, oidcLog } from "@axa-fr/react-oidc-context";
import OidcConfiguration from "./OidcConfiguration";
import Home from "./Component/Home";
import User from "./Component/User";
function App() {
  const Composant = ({ value }) => <h1>{value}</h1>;
  return (
    <div className="App">
      <AuthenticationProvider
        configuration={OidcConfiguration}
        loggerLevel={oidcLog.DEBUG}
      >
        <nav style={{ display: "flex" }}>
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
          <User />
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/1" element={<Composant value="1" />} />
          <Route path="/2" element={<Composant value="2" />} />
          <Route path="/3" element={<Composant value="3" />} />
        </Routes>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
