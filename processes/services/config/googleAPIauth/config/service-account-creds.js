export const googleServiceAccountAuth = {
  type: process.env.G_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.G_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.G_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.G_SERVICE_ACCOUNT_PRIVATE_KEY,
  client_email: process.env.G_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.G_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.G_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.G_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.G_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.G_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  universe_domain: process.env.G_SERVICE_ACCOUNT_UNIVERSE_DOMAIN
}
