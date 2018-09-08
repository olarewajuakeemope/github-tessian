import { takeEvery, all, select, fork, put, call } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { matchAiParams } from 'redux/history'
import { getCurrUser } from 'redux/issue/selectors'
import { getRepos, getIssues } from 'api'
import t from './types'

function* issueRouteSaga() {
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

function* issueSaga({ repo }) {
  const user = yield select(getCurrUser)
  try {
    const issues = yield call(getIssues, user, repo)
    yield put({ type: t.GET_ISSUES_SUCCESS, issues })
  } catch (error) {
    yield put({ type: t.GET_ISSUES_ERROR, error })
  }
}

function* watchIssueRouteSaga() {
  yield takeEvery(LOCATION_CHANGE, issueRouteSaga)
}

function* watchIssueRequestSaga() {
  yield takeEvery(t.GET_ISSUES_REQUEST, issueSaga)
}

export default function* () {
  yield all([
    fork(watchIssueRouteSaga),
    fork(watchIssueRequestSaga),
  ])
}
