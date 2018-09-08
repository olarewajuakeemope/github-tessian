import t from './types'

export function searchQuery(query: string) {
  return {
    type: t.SEARCH_REQUEST,
    query,
  }
}

export function error(e: string) {
  return {
    type: t.ERROR,
    error: e,
  }
}

export function clearError() {
  return {
    type: t.ERROR,
    error: null,
  }
}

export function goBack() {
  return {
    type: t.PREVIOUS_ROUTE_REQUEST,
  }
}
