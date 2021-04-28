import React from 'react';
import { Link } from 'react-router-dom';

import List from './components/List';
import Room from './components/Room';
import Create from './components/Create';

const Convey = ({roomType}) => {

  return (<>
    {roomType == "list" && (<>
      <h1>Available rooms</h1>
      <Link to="/room/create">Create Room</Link>
      <List />
    </>)}

    {roomType == "create" && (<>
      <Create />
    </>)}

    {roomType == "convey" && <Room />}
  </>)
}

export default Convey