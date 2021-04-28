const authorizationUrl = async ({
  discovery_url,
  client_id,
  scope,
  state,
  response_type = "token",
  response_mode,
  code_challenge,
  code_challenge_method,
}) => {
  const { authorization_endpoint } = await (await fetch(discovery_url)).json();

  const params = {
    response_type,
    response_mode,
    redirect_uri: window.location.href.split("#")[0],
    client_id,
    state,
    scope,
    code_challenge,
    code_challenge_method,
  }

  Object.keys(params).forEach((key) => params[key] === undefined && delete params[key])

  return authorization_endpoint + "?" + new URLSearchParams(params);
}


const fetchAccessToken = async ({
  discovery_url,
  client_id,
  code,
  code_verifier,
  grant_type = "authorization_code",
}) => {
  const { token_endpoint } = await fetchJson(discovery_url);
  const tokenRequest = {
    redirect_uri: window.location.href.split("#")[0],
    client_id,
    code,
    code_verifier,
    grant_type,
  };
  Object.keys(tokenRequest).forEach((key) => tokenRequest[key] === undefined && delete tokenRequest[key])

  const tokenResponse = await fetchJson(token_endpoint, {
    method: "POST",
    body: new URLSearchParams(tokenRequest),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log(tokenResponse);

  const { access_token } = tokenResponse;

  return access_token;
}

const randomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}

const sha256 = async (string) => {
  const binaryHash = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(string))

  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export { authorizationUrl, fetchAccessToken, randomString, sha256 }