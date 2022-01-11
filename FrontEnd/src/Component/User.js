import React from "react";
import { AuthenticationContext } from "@axa-fr/react-oidc-context";
import axios from "axios";
const User = () => {
  return (
    <AuthenticationContext.Consumer>
      {(props) => {
        console.log(props);
        if (props.oidcUser)
          axios.get("http://localhost:3001", {
            headers: { Authorization: `Bearer ${props.oidcUser.access_token}` },
          });
        return (
          <>
            {props.oidcUser ? (
              <p style={{ margin: 0 }}>
                {props.oidcUser.profile.preferred_username}
                <button onClick={props.logout}>logout</button>
              </p>
            ) : (
              <button onClick={props.login}>login</button>
            )}
          </>
        );
      }}
    </AuthenticationContext.Consumer>
  );
};

export default User;
