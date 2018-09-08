import { connect } from 'react-redux'
import Panel from 'components/User/Issue/Panel'
import { formValueSelector } from 'redux-form'
import { issueSearchForm } from 'redux/forms'
import {
  isLoadingIssues,
  getIssues,
  getActiveRepo,
  getActiveRepoDescription,
} from 'redux/issue/selectors'

const filterSelector = formValueSelector(issueSearchForm.name)

const mapStateToProps = (state) => {
  const filter = filterSelector(state, 'issue')
  return {
    filter,
    issues: getIssues(state),
    isLoading: isLoadingIssues(state),
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
