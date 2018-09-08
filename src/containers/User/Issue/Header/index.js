import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Header from 'components/User/Issue/Header'
import { goBack } from 'redux/user/actions'
import { issueSearchForm } from 'redux/forms'
import { getCurrUser, getIssues } from 'redux/issue/selectors'

const mapDispatchToProps = {
  goBack,
}

const mapStateToProps = (state) => {
  return {
    user: getCurrUser(state),
    issues: getIssues(state),
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  }
}

const IssueSearchForm = reduxForm({
  form: issueSearchForm.name,
})(Header)

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(IssueSearchForm)
