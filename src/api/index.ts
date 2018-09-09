import { fetchRequest } from './rest'

export function searchUsers (body: {}) {
  return fetchRequest('/search/users',
    'get',
    body)
}

export function getRepos (user: string) {
  return fetchRequest(`/users/${user}/repos`, 'get')
}

export function getIssues (user: string, repo: string) {
  return fetchRequest(`/repos/${user}/${repo}/issues`, 'get')
}

export function getFilteredIssues (user: string, repo: string, filterObj: any) {
  return fetchRequest(`/repos/${user}/${repo}/issues`, 'get', filterObj)
}
