import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { AuthenticationProvider, oidcLog } from "@axa-fr/react-oidc-context";
import OidcConfiguration from "./OidcConfiguration";
import Home from "./Component/Home";
import Nav from "./Component/Nav";
import Profile from "./Component/Profile";
function App() {
  const Composant = ({ value }) => <h1>{value}</h1>;
  return (
    <div className="App">
      <AuthenticationProvider
        configuration={OidcConfiguration}
        loggerLevel={oidcLog.DEBUG}
      >
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/2" element={<Composant value="2" />} />
          <Route path="/3" element={<Composant value="3" />} />
        </Routes>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
