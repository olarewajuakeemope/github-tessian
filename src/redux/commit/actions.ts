import t from './types'

export function getCommits(name: string, description: string) {
  return {
    type: t.GET_COMMITS_REQUEST,
    repo: name,
    description,
  }
}
