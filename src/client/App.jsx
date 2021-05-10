import React from 'react';
import { Route, Switch } from 'react-router-dom'

import * as Modules from './modules'

const App = () => {
  return (<>
    <Modules.Header />
    <Switch>
      <Route exact path="/" component={Modules.Home} />
      <Route path="/profile" component={Modules.Profile} />
      <Route path={"/rooms"} component={() => <Modules.Convey key={location.href} roomType="list" />} />
      <Route path="/room/create" component={() => <Modules.Convey key={location.href} roomType="create" />} />
      <Route path="/room/:id" component={() => <Modules.Convey key={location.href}  roomType="convey" />} />
      <Route path="/auth/signin" component={() => <Modules.Auth authType={"signin"} />} />
      <Route path="/auth/convey" component={() => <Modules.Auth authType={"convey"} />} />
      <Route path="/auth/signup" component={() => <Modules.Auth authType={"signup"} />} />
      <Route path="/auth/signout" component={() => <Modules.Auth authType={"signout"} />} />
      <Route path="/auth/oauth2callback" component={() => <Modules.Auth authType={"callback"} />} />

      <Route>
        <h1>404 Page not found</h1>
      </Route>
    </Switch>
  </>)
}

export default App;