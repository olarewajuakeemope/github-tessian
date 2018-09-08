import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomeLayout from 'layouts/HomeLayout'
import 'styles/globals.css'

export default () => (
  <Switch>
    <Route component={HomeLayout} />
  </Switch>
)
