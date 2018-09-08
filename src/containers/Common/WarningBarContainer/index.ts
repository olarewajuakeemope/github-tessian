import { connect } from 'react-redux'
import { RootReducerInterface } from 'redux/rootReducer'
import WarningBar from 'components/Common/WarningBar'
import { getUserError } from 'redux/user/selectors'
import { clearError } from 'redux/user/actions'

const mapStateToProps = (state: RootReducerInterface) => ({
  text: getUserError(state),
})

const mapDispatchToProps = ({
  clearError,
})

export default connect(mapStateToProps, mapDispatchToProps)(WarningBar)
