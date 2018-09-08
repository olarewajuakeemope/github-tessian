import types from './types'

export interface UserState {
  username: string
  error: null | string
  isLoading: boolean
  items: Array<null | {}>
}

interface SimpleError {
  error: string,
}

interface SimpleQuery {
  q: string,
}

export interface ClearError {
  type: types.ERROR,
  error: null,
}

export interface SearchRequest {
  type: types.SEARCH_REQUEST
  query: SimpleQuery
}

export interface Error extends SimpleError {
  type: types.ERROR,
}

export interface SearchSuccess {
  type: types.SEARCH_REQUEST_SUCCESS,
  items: any
}

export type UserInterfaces = SearchRequest
  | SearchSuccess
  | Error
  | ClearError
