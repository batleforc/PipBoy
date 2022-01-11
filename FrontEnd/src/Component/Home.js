import React from "react";
import { AuthenticationContext } from "@axa-fr/react-oidc-context";
const Home = () => {
  return (
    <div>
      <AuthenticationContext.Consumer>
        {(props) => {
          console.log(props);
          return (
            <div>
              {props.oidcUser ? (
                <h1>Welcome home {props.oidcUser.profile.name}</h1>
              ) : (
                <h1>Please login</h1>
              )}
            </div>
          );
        }}
      </AuthenticationContext.Consumer>
    </div>
  );
};

export default Home;
