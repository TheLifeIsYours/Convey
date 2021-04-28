import React, { useEffect, useState } from 'react';

import Provider from './components/Provider'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Signout from './components/Signout'
import Callback from './components/Callback'

import './styles.css'
import { Link } from 'react-router-dom';

const Auth = (props) => {
  const [loginProviders, setLoginProviders] = useState([])
  useEffect(async () => {
    let providers = await(await fetch('/auth/providers')).json()
    setLoginProviders(providers)
    console.log(providers)
  }, [])

  return (
    <>
      {props.authType == "signin" && (
        <div id="signin-container">
          {loginProviders.length > 0 && 
            <div id="signin-providers-container">
            <h1>Sign in</h1>{
              loginProviders.map((provider, index) => <Provider className="provider-button" key={index} provider={provider} />)
            }
            <Link className="provider-button" to="/auth/convey">Sing in with Convey</Link>
            <Link className="provider-button" to="/auth/signup">Sing up instead</Link>
            </div>
          }
        </div>
      )}
      
      {props.authType == "signup" && (<Signup />)}

      {props.authType == "convey" && (<Signin />)}

      {props.authType == "signout" && (<Signout />)}
        
      {props.authType == "callback" && <Callback />}

      {!props.authType && <h1>Authentication is currently unavailable</h1>}

    </>
  )
}

export default Auth