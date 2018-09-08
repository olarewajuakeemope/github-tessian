import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as router } from 'react-router-redux'
import user from 'redux/user/reducer'
import commit from 'redux/commit/reducer'
import { UserState } from 'redux/user/interfaces'
import { CommitState } from 'redux/commit/interfaces'

export interface RootReducerInterface {
  router: {},
  form: {},
  user: UserState,
  commit: CommitState,
}

export default combineReducers<RootReducerInterface>({
  router,
  user,
  commit,
  form,
})
