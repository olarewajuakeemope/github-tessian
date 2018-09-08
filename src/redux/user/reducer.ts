import t from './types'
import * as I from './interfaces'

interface ActionHandler {
  readonly [r: string]: (state: I.UserState, action: I.UserInterfaces) => I.UserState
}

const ACTION_HANDLERS: ActionHandler = {
  [t.SEARCH_REQUEST]: (state, { query: { q } }: I.SearchRequest) => ({
    ...state,
    username: q,
    isLoading: true,
  }),
  [t.SEARCH_REQUEST_SUCCESS]: (state, { items: { data: { items } } }: I.SearchSuccess) => ({
    ...state,
    items,
    isLoading: false,
  }),
  [t.SEARCH_REQUEST_ERROR]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [t.ERROR]: (state: I.UserState, { error }: I.Error) => ({
    ...state,
    error,
  }),
}

const initialState = {
  username: '',
  error: null,
  items: [],
  isLoading: false,
}

export default function reducer(state = initialState, action: I.UserInterfaces) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
