import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signin = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    let res = await fetch("/auth/signin", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
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

        <label for="password-input">Password</label>
        <input id="password-input" type="password" label="Password" onChange={(e) => setPassword(e.target.value)} value={password} />

        <button onClick={handleSubmit}>Submit</button>
      </form>
      {
        errorMessage !== "" && errorMessage
      }
    </>
  )
}

export default Signin