import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthenticationProvider, oidcLog } from "@axa-fr/react-oidc-context";
import OidcConfiguration from "./OidcConfiguration";
import Home from "./Component/Home";
import Nav from "./Component/Nav";
import Profile from "./Component/Profile";
import Namespace from "./Component/Namespace";
import Guac from "./Component/Guac";
function App() {
  const Composant = ({ value }) => <h1>{value}</h1>;
  return (
    <div className="App">
      <AuthenticationProvider
        configuration={OidcConfiguration}
        loggerLevel={oidcLog.WARN}
      >
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/namespace" element={<Namespace />} />
          <Route path="/3" element={<Composant value="3" />} />
          <Route path="/guac" element={<Guac />} />
        </Routes>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
