import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as router } from 'react-router-redux'
import user from 'redux/user/reducer'
import issue from 'redux/issue/reducer'
import { UserState } from 'redux/user/interfaces'
import { IssueState } from 'redux/issue/interfaces'

export interface RootReducerInterface {
  router: {},
  form: {},
  user: UserState,
  issue: IssueState,
}

export default combineReducers<RootReducerInterface>({
  router,
  user,
  issue,
  form,
})
