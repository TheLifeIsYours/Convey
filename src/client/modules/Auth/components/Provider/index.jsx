import React, { useEffect, useState } from 'react'
import {useHistory } from 'react-router-dom'

import { authorizationUrl, fetchAccessToken, randomString, sha256 } from '../../functions/authorization'

import googleSrc from 'url:../../../../public/providers/google.png'
import './styles.css'

const Provider = ({provider: {name, discovery_url, client_id, scope, use_pkce}}) => {
  const history = useHistory()
  const [logos, _] = useState({
    google: googleSrc
  })

  // alert(name, discovery_url, client_id, scope, use_pkce)

  const handleSignin = async () => {
    const state = randomString(30)
    if (use_pkce) {
      const code_verifier = randomString(50);

      sessionStorage.setItem("loginState", JSON.stringify({loginProvider: name, discovery_url, client_id, state, code_verifier}))
      window.location.href = await authorizationUrl({discovery_url, client_id, scope, state, response_type: "code", response_mode: "fragment", code_challenge_method: "S256", code_challenge: await sha256(code_verifier)})
    } else {
      sessionStorage.setItem("loginState", JSON.stringify({loginProvider: name, discovery_url, client_id, state}))
      window.location.href = await authorizationUrl({discovery_url, client_id, scope, state, response_type: "token", response_mode: "fragment" });
    }
  }

  const handleCallback = async () => {
    const loginState = JSON.parse(sessionStorage.getItem("loginState"))
    const {loginProvider, code_verifier, discovery_url, client_id} = loginState
    
    let hash = Object.fromEntries(new URLSearchParams(window.location.hash.substr(1)))
    const {access_token, error, error_description, code, state} = hash
    
    if(!state) {
      console.error("Invalid request")
      return
    } else if(state !== loginState.state) {
      console.error("Invalid request, Request was not regenerated by application")
      return
    }
    
    if(access_token) {
      localStorage.setItem("access_token", access_token)
      localStorage.setItem("loginProvider", loginProvider)
      history.push('/profile')
      return
    }

    if(error) {
      console.error("error while signing in", error_description)
      return
    }

    if(code) {
      localStorage.setItem("access_token", await fetchAccessToken(discovery_url, client_id, code, code_verifier))
      localStorage.setItem("loginProvider", loginProvider)
      history.push('/profile')
      return
    }

    console.warn("Unhandled hash", hash)
  }
  
  useEffect(async function () {
    if (window.location.hash !== "") {
      await handleCallback();
    }
  }, []);

  return (
    <button className="provider-button" onClick={handleSignin} target="_self"><img className="provider-logo" src={logos[name.toLowerCase()]}/><span>Sign in with {name}</span></button>
  )
}

export default Provider