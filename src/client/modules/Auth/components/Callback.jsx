import React, { useEffect } from "react";
import { useHistory } from "react-router";

const Callback = () => {

  let history = useHistory();

  // useEffect(() => {
  //   const { access_token } = Object.fromEntries(new URLSearchParams(window.location.hash.substr(1)))

  //   localStorage.setItem("access_token", access_token)
  //   history.push("/profile")
  // }, []);

  return (
    <div>Callback....</div>
  )
}

export default Callback