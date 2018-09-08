import t from './types'

export function getIssues(name: string, description: string) {
  return {
    type: t.GET_ISSUES_REQUEST,
    repo: name,
    description,
  }
}
