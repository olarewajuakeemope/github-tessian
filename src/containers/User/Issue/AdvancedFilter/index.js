import { connect } from 'react-redux'
import { getFilteredIssues } from 'redux/issue/actions'
import AdvancedFilterForm from 'components/User/Issue/AdvancedFilter'

const mapDispatchToProps = {
 getFilteredIssues,
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...dispatchProps,
    ...ownProps,
    ...stateProps,
  }
}

export default connect(null, mapDispatchToProps, mergeProps)(AdvancedFilterForm)
