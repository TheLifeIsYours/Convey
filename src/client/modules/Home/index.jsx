import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  useEffect(() => {
  }, [])

  return (
    <>
      <h1>Home</h1>
      <h2>Start a conversation, join Convey today!</h2>
      <Link to="/auth/signin">Signin & Signup</Link>
    </>
  )
}

export default Home