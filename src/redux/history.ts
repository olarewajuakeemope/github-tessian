import createHistory from 'history/createBrowserHistory'
import { matchPath } from 'react-router-dom'

const history = createHistory()

const allParams = '/users/commits/:user?'

interface AiParams {
  user?: string,
}

const matchAiParams = () => {
  const match = matchPath<AiParams>(history.location.pathname, {
    path: allParams,
  })
  if (!match) {
    return {} as AiParams
  }

  return { ...match.params}
}

export default history
export { matchAiParams }
