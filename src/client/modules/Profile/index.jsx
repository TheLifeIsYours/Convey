import React from 'react';
import useProfileData from '../Auth/hooks/useProfileData'

const Profile = (props) => {

  const profileData = useProfileData({shouldRedirect: true})

  return (
    <>
      <h1>Profile</h1>
      {
        JSON.stringify(profileData)
      }
    </>
  )
}

export default Profile