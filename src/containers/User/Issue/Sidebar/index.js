import { connect } from 'react-redux'
import { isLoadingRepos, getRepos } from 'redux/issue/selectors'
import { getIssues } from 'redux/issue/actions'
import Sidebar from 'components/User/Issue/Sidebar'

const mapDispatchToProps = {
  getIssues,
}

const mapStateToProps = (state) => {
  return {
    repos: getRepos(state),
    isLoading: isLoadingRepos(state),
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...dispatchProps,
    ...ownProps,
    ...stateProps,
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Sidebar)
