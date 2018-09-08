import types from './types'

export interface IssueState {
  user: string
  error: string
  activeRepo: null | string
  activeRepoDescription: string
  isLoadingRepos: boolean
  isLoadingIssues: boolean
  repos: Array<null | {}>
  issues: Array<null | {}>
}

export interface SetCurrUser {
  type: types.SET_CURRENT_USER
  user: string
}

export interface SetCurrRepo {
  type: types.SET_CURRENT_REPO
  repo: string | null
}

export interface GetReposSuccess {
  type: types.GET_REPOS_SUCCESS
  repos: {
    data: Array<null | {}>
  }
}

export interface GetReposError {
  type: types.GET_REPOS_ERROR
  error: string
}

export interface GetIssuesRequest {
  type: types.GET_ISSUES_REQUEST
  repo: string
  description: string
}

export interface GetIssuesSuccess {
  type: types.GET_ISSUES_SUCCESS
  issues: {
    data: Array<null | {}>
  }
}

export interface GetIssuesError {
  type: types.GET_ISSUES_ERROR
  error: string
}

export type UserInterfaces = SetCurrUser
 | SetCurrRepo
 | GetReposSuccess
 | GetReposError
 | GetIssuesRequest
 | GetIssuesSuccess
 | GetIssuesError
