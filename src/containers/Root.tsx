import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { hot } from 'react-hot-loader'
import Routes from 'routes'

const Root = ({ history, store }: any) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes/>
    </ConnectedRouter>
  </Provider>
)

export default hot(module)(Root)
