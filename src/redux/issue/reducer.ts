import t from './types'
import * as I from './interfaces'

interface ActionHandler {
  readonly [r: string]: (state: I.IssueState, action: I.UserInterfaces) => I.IssueState
}

const ACTION_HANDLERS: ActionHandler = {
  [t.SET_CURRENT_USER]: (state: I.IssueState, { user }: I.SetCurrUser) => ({
    ...state,
    user,
  }),
  [t.SET_CURRENT_REPO]: (state: I.IssueState, { repo }: I.SetCurrRepo) => ({
    ...state,
    activeRepo: repo,
  }),
  [t.GET_REPOS_REQUEST]: state => ({
    ...state,
    isLoadingRepos: true,
  }),
  [t.GET_REPOS_SUCCESS]: (state: I.IssueState, { repos: { data } }: I.GetReposSuccess) => ({
    ...state,
    isLoadingRepos: false,
    repos: data,
  }),
  [t.GET_REPOS_ERROR]: (state: I.IssueState, { error }: I.GetReposError) => ({
    ...state,
    isLoadingRepos: false,
    error,
  }),
  [t.GET_ISSUES_REQUEST]: (state: I.IssueState, { repo, description }: I.GetIssuesRequest) => ({
    ...state,
    activeRepo: repo,
    activeRepoDescription: description,
    isLoadingIssues: true,
  }),
  [t.GET_ISSUES_SUCCESS]: (state: I.IssueState, { issues: { data } }: I.GetIssuesSuccess) => {
    const issues = data.map(({ created_at, title, user: { login }, html_url }: any) => {
      const formattedDate = new Date(created_at)
      return {
        title,
        author_name: login,
        url: html_url,
        date: formattedDate.toString(),
      }
    })
    return {
      ...state,
      isLoadingIssues: false,
      issues,
    }
  },
  [t.GET_ISSUES_ERROR]: (state: I.IssueState, { error }: I.GetIssuesError) => ({
    ...state,
    isLoadingIssues: false,
    error,
  }),
}

const initialState = {
  repos: [],
  issues: [],
  user: '',
  error: '',
  activeRepo: null,
  isLoadingRepos: true,
  isLoadingIssues: false,
  activeRepoDescription: '',
}

export default function reducer(state = initialState, action: I.UserInterfaces) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
