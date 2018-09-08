import { fetchRequest } from './rest'

export function searchUsers (body: {}) {
  return fetchRequest('/search/users',
    'get',
    body)
}

export function getRepos (user: string) {
  return fetchRequest(`/users/${user}/repos`, 'get')
}

export function getCommits (user: string, repo: string) {
  return fetchRequest(`/repos/${user}/${repo}/commits`, 'get')
}
