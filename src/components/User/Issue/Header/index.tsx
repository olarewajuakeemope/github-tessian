import React, { Fragment, PureComponent } from 'react'
import Header from 'components/User/Header'
import Search from 'components/Common/Search'
import AdvancedFilterForm from 'containers/User/Issue/AdvancedFilter'
import './style.css'

interface HeaderWrapperPropsInterface {
  goBack: any
  user: string
  issues: Array<null | {}>
}

interface HeaderWrapperStateInterface {
  showAdvancedForm: boolean
}

const initialState = {
  showAdvancedForm: false,
}

class HeaderWrapper extends PureComponent<HeaderWrapperPropsInterface, HeaderWrapperStateInterface> {
  state = initialState

  toggleShowAdvancedForm = () => {
    this.setState(({ showAdvancedForm }) => ({
      showAdvancedForm: !showAdvancedForm,
    }))
  }

  render() {
    const { goBack, issues, user } = this.props
    const backButton = (
      <span key="backButton" onClick={goBack} className="header__backbutton" />
    )

    const userName = (
      <span key="userName" className="header__username">{user}</span>
    )

    const advancedFilter = (
      <small
        key="advancedFilter"
        className="header__advancedFilter"
        onClick={this.toggleShowAdvancedForm}
      >Advanced Filter</small>
    )

    const filterInput = (
      <span key="filterInput" className="filterInput">
        <Search
          name="issue"
          className="headerInput__filter"
          placeholder="Filter issues title"
          disabled={issues.length < 1}
        />
      </span>
    )

    return (
      <Fragment>
        {this.state.showAdvancedForm && <AdvancedFilterForm handleClose={this.toggleShowAdvancedForm} />}
        <Header items={[backButton, userName, filterInput, advancedFilter]} />
      </Fragment>
    )
  }
}

export default HeaderWrapper
