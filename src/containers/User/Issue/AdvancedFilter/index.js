import { connect } from 'react-redux'
import { getIssues } from 'redux/issue/actions'
import AdvancedFilterForm from 'components/User/Issue/AdvancedFilter'

const mapDispatchToProps = {
  getIssues,
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...dispatchProps,
    ...ownProps,
    ...stateProps,
  }
}

export default connect(null, mapDispatchToProps, mergeProps)(AdvancedFilterForm)
