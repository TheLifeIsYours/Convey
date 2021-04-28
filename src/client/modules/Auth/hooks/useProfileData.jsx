import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { userInfoState } from '../../../hoc/recoil/userInfoState'

const useProfileData = ({shouldRedirect}) => {
  const history = useHistory();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(async () => {
    const loginProvider = localStorage.getItem("loginProvider");
    const accessToken = localStorage.getItem('access_token')

    if(accessToken && loginProvider) {
      let res = await fetch("/api/profile", {
        method: "POST",
        data: JSON.stringify({ request: "get-profile" }),
        headers: {
          "Content-type": "application/json",
          ...(loginProvider ? { "X-Login-Provider": loginProvider } : {}),
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        }
      })
      
      if(res.status == 200) {
        res = await res.json();
        setUserInfo(res);
      } else {
        if(shouldRedirect) history.push('/auth/signin');
      }
    } else {
      let res = await fetch("/api/profile");

      if(res.status == 200) {
        res = await res.json();
        setUserInfo(res);
      } else {
        if(shouldRedirect) history.push('/auth/signin');
      }
    }
  }, [])

  return (userInfo)
}

export default useProfileData