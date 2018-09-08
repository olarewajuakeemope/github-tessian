import { applyMiddleware, createStore } from 'redux'
import { History } from 'history'
import { routerMiddleware } from 'react-router-redux'
import reduxFreeze from 'redux-freeze'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

interface Module extends NodeModule {
  hot: {
    accept: (reducer: string, fn: () => void) => void,
  }
}

declare const module: Module

// todo: disable logging on production
const logger = createLogger({
  duration: true,
  collapsed: true,
  colors: {
    title: action => {
      if (action.type.match(/_REQUEST/g)) {
        return 'black'
      } else if (action.type.match(/_ERROR$/g)) {
        return 'red'
      } else if (action.type.match(/_SUCCESS/g)) {
        return 'green'
      } else {
        return 'gray'
      }
    },
  },

})

const errorMiddleware = () => (next: any) => (action: any) => {
  try {
    return next(action)
  } catch (error) {
    return console.error(error)
  }
}

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}, history: History) {
  // Compose final middleware and use devtools in debug environment

  const allowDebug = process.env.NODE_ENV !== 'production'

  const middlewares = [
    errorMiddleware,
    sagaMiddleware,
    routerMiddleware(history),
  ]

  if (allowDebug) {
    middlewares.push(logger, reduxFreeze)
  }

  const middleware = applyMiddleware(...middlewares)

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState)
  let sagaTask = sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('redux/rootReducer', () => {
      const nextRootReducer = require('redux/rootReducer').default
      store.replaceReducer(nextRootReducer)
    })

    module.hot.accept('redux/rootSaga', () => {
      const newSagas = require('redux/rootSaga').default;
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(newSagas);
      })
    })
  }
  return store
}
