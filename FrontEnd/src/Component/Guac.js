import React, { useState, useEffect } from "react";
import Guacamole from "guacamole-common-js";
import Crypto from "cryptojs";
const body = {
  connection: {
    type: "vnc",
    settings: {
      hostname: "localhost",
      port: "26901",
      username: "headless",
      password: "headless",
    },
  },
};
const clientOption = {
  cypher: "AES-256-CBC",
  key: "MySuperSecretKeyForParamsToken12",
};
const encrypt = (value) => {
  var iv = Crypto.enc.Hex.parse(16);
};

const Guac = () => {
  const [Tunnel, setTunnel] = useState();
  const [Client, setClient] = useState();
  useEffect(() => {
    var tunnel = new Guacamole.WebSocketTunnel("ws://localhost:8080");
    setTunnel(tunnel);
    var client = new Guacamole.Client(tunnel);
    setClient(client);
    document
      .getElementById("Guacamole")
      .appendChild(client.getDisplay().getElement());
    document
      .getElementById("Guacamole")
      .getElementsByTagName("canvas")
      .item(0).style.zIndex = "10";
    client.connect();
  }, []);
  return <div id="Guacamole" style={{ zIndex: "10" }}></div>;
};

export default Guac;
