import React from "react";
import { AuthenticationContext } from "@axa-fr/react-oidc-context";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <AuthenticationContext.Consumer>
        {(props) => {
          console.log(props);
          return (
            <div>
              {props.oidcUser ? (
                <ul>
                  <li>{props.oidcUser.profile.preferred_username}</li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/admin">Admin</Link>
                  </li>
                  <button onClick={props.logout}>logout</button>
                </ul>
              ) : (
                <button onClick={props.login}>login</button>
              )}
            </div>
          );
        }}
      </AuthenticationContext.Consumer>
    </div>
  );
};

export default Home;
