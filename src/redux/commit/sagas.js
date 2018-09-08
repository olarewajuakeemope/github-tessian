import { takeEvery, all, select, fork, put, call } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { matchAiParams } from 'redux/history'
import { getCurrUser } from 'redux/commit/selectors'
import { getRepos, getCommits } from 'api'
import t from './types'

function* commitRouteSaga() {
  const { user } = matchAiParams()
  if (user) {
    yield put({ type: t.SET_CURRENT_REPO, repo: null })
    yield put({ type: t.SET_CURRENT_USER, user })
    yield put({ type: t.GET_REPOS_REQUEST })
    try {
      const repos = yield call(getRepos, user)
      yield put({ type: t.GET_REPOS_SUCCESS, repos })
    } catch (error) {
      yield put({ type: t.GET_REPOS_ERROR, error })
    }
  }
}

function* commitSaga({ repo }) {
  const user = yield select(getCurrUser)
  try {
    const commits = yield call(getCommits, user, repo)
    yield put({ type: t.GET_COMMITS_SUCCESS, commits })
  } catch (error) {
    yield put({ type: t.GET_COMMITS_ERROR, error })
  }
}

function* watchCommitRouteSaga() {
  yield takeEvery(LOCATION_CHANGE, commitRouteSaga)
}

function* watchCommitRequestSaga() {
  yield takeEvery(t.GET_COMMITS_REQUEST, commitSaga)
}

export default function* () {
  yield all([
    fork(watchCommitRouteSaga),
    fork(watchCommitRequestSaga),
  ])
}
