import React from "react";
import { Link } from "react-router-dom";
const YouShouldNotPass = () => (
  <p>
    You shouldn't be here GO BACK <Link to="/">HOME</Link>
  </p>
);
export default YouShouldNotPass;
