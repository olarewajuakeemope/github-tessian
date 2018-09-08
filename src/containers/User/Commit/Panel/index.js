import { connect } from 'react-redux'
import Panel from 'components/User/Commit/Panel'
import { formValueSelector } from 'redux-form'
import { commitSearchForm } from 'redux/forms'
import {
  isLoadingCommits,
  getCommits,
  getActiveRepo,
  getActiveRepoDescription,
} from 'redux/commit/selectors'

const filterSelector = formValueSelector(commitSearchForm.name)

const mapStateToProps = (state) => {
  const filter = filterSelector(state, 'commit')
  return {
    filter,
    commits: getCommits(state),
    isLoading: isLoadingCommits(state),
    hasSelected: !!getActiveRepo(state),
    description: getActiveRepoDescription(state),
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...ownProps,
  }
}

export default connect(mapStateToProps, null, mergeProps)(Panel)
