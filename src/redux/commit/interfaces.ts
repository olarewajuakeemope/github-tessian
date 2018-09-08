import types from './types'

export interface CommitState {
  user: string
  error: string
  activeRepo: null | string
  activeRepoDescription: string
  isLoadingRepos: boolean
  isLoadingCommits: boolean
  repos: Array<null | {}>
  commits: Array<null | {}>
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

export interface GetCommitsRequest {
  type: types.GET_COMMITS_REQUEST
  repo: string
  description: string
}

export interface GetCommitsSuccess {
  type: types.GET_COMMITS_SUCCESS
  commits: {
    data: Array<null | {}>
  }
}

export interface GetCommitsError {
  type: types.GET_COMMITS_ERROR
  error: string
}

export type UserInterfaces = SetCurrUser
 | SetCurrRepo
 | GetReposSuccess
 | GetReposError
 | GetCommitsRequest
 | GetCommitsSuccess
 | GetCommitsError
