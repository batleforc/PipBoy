import React from "react";
import { AuthenticationContext } from "@axa-fr/react-oidc-context";
const User = () => {
  return (
    <AuthenticationContext.Consumer>
      {(props) => {
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
