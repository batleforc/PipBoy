import React from "react";
import User from "./User";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "@axa-fr/react-oidc-context";

const HyperLink = ({ to, label }) => (
  <Link style={{ margin: 1 }} to={`${to}`}>
    {label}
  </Link>
);
const Nav = () => {
  const lien = [
    {
      to: "/",
      label: "HOME",
      needAuth: false,
    },
    {
      to: "/profile",
      label: "Profile",
      needAuth: true,
    },
    {
      to: "/namespace",
      label: "Namespace",
      needAuth: true,
    },
    {
      to: "/3",
      label: "TROIS",
      needAuth: false,
    },
  ];
  return (
    <nav style={{ display: "flex" }}>
      <AuthenticationContext.Consumer>
        {(props) => {
          return (
            <>
              {lien.map(({ label, to, needAuth }) => (
                <div key={label}>
                  {(needAuth && props.oidcUser) || !needAuth ? (
                    <HyperLink label={label} to={to} />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </>
          );
        }}
      </AuthenticationContext.Consumer>
      <User />
    </nav>
  );
};

export default Nav;
