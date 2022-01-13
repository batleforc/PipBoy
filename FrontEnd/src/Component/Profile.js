import React, { useState } from "react";
import { AuthenticationContext } from "@axa-fr/react-oidc-context";
import axios from "axios";
import { Link } from "react-router-dom";
const Profile = () => {
  const [data, setData] = useState();
  return (
    <AuthenticationContext.Consumer>
      {(props) => {
        if (props.oidcUser && data === undefined)
          axios
            .get("http://localhost:3001", {
              headers: {
                Authorization: `Bearer ${props.oidcUser.access_token}`,
              },
            })
            .then((data) => data.data)
            .then((data) => setData(data));
        return (
          <>
            {props.oidcUser && data !== undefined ? (
              <div>
                <p>Namespace Exist : {data.NamespaceExist.toString()}</p>
                <p>Namespace : {data.NamespaceName}</p>
                <p>User : {props.oidcUser.profile.name}</p>
                <p>Username : {props.oidcUser.profile.preferred_username}</p>
              </div>
            ) : (
              <p>
                You shouldn't be here GO BACK <Link to="/">HOME</Link>
              </p>
            )}
          </>
        );
      }}
    </AuthenticationContext.Consumer>
  );
};

export default Profile;
