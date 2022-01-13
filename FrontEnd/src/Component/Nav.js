import React from "react";
import User from "./User";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "@axa-fr/react-oidc-context";
const Nav = () => {
  return (
    <nav style={{ display: "flex" }}>
      <div>
        <AuthenticationContext.Consumer>
          {(props) => {
            return (
              <>
                <Link style={{ margin: 1 }} to="/">
                  HOME
                </Link>
                {props.oidcUser && (
                  <Link style={{ margin: 1 }} to="/profile">
                    Profile
                  </Link>
                )}
                <Link style={{ margin: 1 }} to="/2">
                  2
                </Link>
                <Link style={{ margin: 1 }} to="/3">
                  3
                </Link>
              </>
            );
          }}
        </AuthenticationContext.Consumer>
      </div>
      <User />
    </nav>
  );
};

export default Nav;
