import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import useProfileData from '../Auth/hooks/useProfileData'
import { userInfoState } from '../../hoc/recoil/userInfoState'
import {useSocket} from '../../hooks/UseSocket'

import './styles.css'

const Profile = (props) => {
  useProfileData({shouldRedirect: true})

  const socket = useSocket({selfClose: false})
  const [editMode, setEditMode] = useState(false)
  
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  function toggleEditMode(state) {
    if(state) return setEditMode(state)
    setEditMode(state => !state)
  }

  function updateDisplayName() {
    socket.emit('profile', {type: "edit", data: userInfo})
  }


  return (
    <>
      <h1>Profile</h1>
      <img className="profile-picture" src={userInfo.picture} />

      {editMode ? (<>
        <input type="text" className="profile-display-name" value={userInfo.display_name} onChange={(e) => setUserInfo(ui => ({...ui, display_name: e.target.value}))}/>
      </>) : (<>
        <div className="profile-display-name">{userInfo.display_name}</div>
        </>)
      }
      <div onClick={() => {toggleEditMode(); editMode ? updateDisplayName() : null;}}>{editMode ? "Save" : "Edit"} display name</div>
    </>
  )
}

export default Profile