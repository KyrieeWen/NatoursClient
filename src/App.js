import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Overview from './components/Overview'
import Tour from './components/Tour'
import Detail from './components/Detail/Detail'
import Login from './components/Login'
import Account from './components/Account'
import Booking from './components/Booking'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Overview} />
        <Route path="/tour" exact component={Tour} />
        <Route path="/tour/:slug" exact component={Detail} />
        <Route path="/login" exact component={Login} />
        <Route path="/me" exact component={Account} />
        <Route path="/:id" exact component={Booking} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
