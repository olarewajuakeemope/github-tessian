import { all, fork, } from 'redux-saga/effects'
import userSagas from 'redux/user/sagas'
import issueSagas from 'redux/issue/sagas'
import errorSaga from 'redux/errorSaga'

export default function* root() {
  yield all([
    fork(errorSaga),
    fork(userSagas),
    fork(issueSagas),
  ])
}
