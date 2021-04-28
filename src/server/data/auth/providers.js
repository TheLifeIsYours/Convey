const providers = [{
  name: "Google",
  discovery_url: "https://accounts.google.com/.well-known/openid-configuration",
  client_id: process.env.GOOGLE_CLIENT_ID,
  scope: "openid email profile",
  use_pkce: false,
}];

module.exports = providers;