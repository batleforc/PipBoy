const configuration = {
  client_id: "PipBoy",
  redirect_uri: "http://localhost:3000/authentication/callback",
  response_type: "id_token token",
  post_logout_redirect_uri: "http://localhost:3000/",
  scope: "openid profile email",
  authority: "https://auth.weebo.fr/auth/realms/MasterKluster/",
  silent_redirect_uri: "http://localhost:3000/authentication/silent_callback",
  automaticSilentRenew: true,
  loadUserInfo: true,
};

export default configuration;
