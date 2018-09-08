import { take, actionChannel, put } from 'redux-saga/effects'
import { Action } from 'redux'
import { error as displayErrorAction } from 'redux/user/actions'

export interface ErrorInterface extends Action {
  error: Error | string
  hide?: boolean
}

export default function* errorSaga() {
  const requestChan = yield actionChannel((action: ErrorInterface) => action.type.match(/_ERROR$/g)
    && !action.hide)
  while (true) {
    const { error } = yield take(requestChan)
    yield put(displayErrorAction(error instanceof Error ? error.message : error))
  }
}
