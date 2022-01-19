import React, { useState } from "react";
import { AuthenticationContext } from "@axa-fr/react-oidc-context";
import axios from "axios";
import YouShouldNotPass from "./YouShouldNotPass";

const Namespace = () => {
  const [data, setData] = useState();
  return (
    <AuthenticationContext.Consumer>
      {(props) => {
        if (props.oidcUser && data === undefined)
          axios
            .get("http://localhost:3001/api/inNamespace", {
              headers: {
                Authorization: `Bearer ${props.oidcUser.access_token}`,
              },
            })
            .then((data) => data.data)
            .then((data) => setData(data));
        console.log(data);
        if (!data || !props.oidcUser) return <YouShouldNotPass />;
        return (
          <>
            {Object.entries(data).map((value) => {
              return (
                <ul key={value[0]}>
                  <li>{value[0]}</li>
                  {value[1].items.map(({ metadata }) => (
                    <li key={metadata.name}>{metadata.name}</li>
                  ))}
                </ul>
              );
            })}
          </>
        );
      }}
    </AuthenticationContext.Consumer>
  );
};

export default Namespace;
