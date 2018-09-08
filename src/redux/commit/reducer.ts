import t from './types'
import * as I from './interfaces'

interface ActionHandler {
  readonly [r: string]: (state: I.CommitState, action: I.UserInterfaces) => I.CommitState
}

const ACTION_HANDLERS: ActionHandler = {
  [t.SET_CURRENT_USER]: (state: I.CommitState, { user }: I.SetCurrUser) => ({
    ...state,
    user,
  }),
  [t.SET_CURRENT_REPO]: (state: I.CommitState, { repo }: I.SetCurrRepo) => ({
    ...state,
    activeRepo: repo,
  }),
  [t.GET_REPOS_REQUEST]: state => ({
    ...state,
    isLoadingRepos: true,
  }),
  [t.GET_REPOS_SUCCESS]: (state: I.CommitState, { repos: { data } }: I.GetReposSuccess) => ({
    ...state,
    isLoadingRepos: false,
    repos: data,
  }),
  [t.GET_REPOS_ERROR]: (state: I.CommitState, { error }: I.GetReposError) => ({
    ...state,
    isLoadingRepos: false,
    error,
  }),
  [t.GET_COMMITS_REQUEST]: (state: I.CommitState, { repo, description }: I.GetCommitsRequest) => ({
    ...state,
    activeRepo: repo,
    activeRepoDescription: description,
    isLoadingCommits: true,
  }),
  [t.GET_COMMITS_SUCCESS]: (state: I.CommitState, { commits: { data } }: I.GetCommitsSuccess) => {
    const commits = data.map(({ commit: { message, committer: { name, date } }, html_url }: any) => {
      const formattedDate = new Date(date)
      return {
        message,
        author_name: name,
        commit_url: html_url,
        date: formattedDate.toString(),
      }
    })
    return {
      ...state,
      isLoadingCommits: false,
      commits,
    }
  },
  [t.GET_COMMITS_ERROR]: (state: I.CommitState, { error }: I.GetCommitsError) => ({
    ...state,
    isLoadingCommits: false,
    error,
  }),
}

const initialState = {
  repos: [],
  commits: [],
  user: '',
  error: '',
  activeRepo: null,
  isLoadingRepos: true,
  isLoadingCommits: false,
  activeRepoDescription: '',
}

export default function reducer(state = initialState, action: I.UserInterfaces) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
