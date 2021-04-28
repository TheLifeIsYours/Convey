import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [given_name, setGiven_name] = useState("");
  const [family_name, setFamily_name] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    let res = await fetch("/auth/signup", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "given_name": given_name, 
        "family_name": family_name, 
        "email": email, 
        "password": password
      }),
    }).catch((err) => {
      setErrorMessage(err.message);
    })
    
    if(res.status == 200) {
      history.push('/profile');
    } else {
      setErrorMessage(await res.text())
    }
  }

  return (
    <>
      <h1>Signup</h1>
      <form>
        <label for="email-input">Email</label>
        <input id="email-input" type="text" label="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <br/>

        <label for="given-name-input">Given Name</label>
        <input id="given-name-input" type="text" label="Given nam" onChange={(e) => setGiven_name(e.target.value)} value={given_name} />
        <br/>
        
        <label for="family-name-input">Family Name</label>
        <input id="family-name-input" type="text" label="Family name" onChange={(e) => setFamily_name(e.target.value)} value={family_name} />
        <br/>
        
        <label for="password-input">Password</label>
        <input id="password-input" type="password" label="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <br/>
        
        <label for="confirm-password-input">Confirm Password</label>
        <input id="confirm-password-input" type="password" label="Confirm Password" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} />
        <br/>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      {
        errorMessage !== "" && errorMessage

      }
    </>
  )
}

export default Signup