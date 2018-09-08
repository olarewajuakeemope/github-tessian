import React, { Fragment } from 'react'
import Header from 'components/User/Header'
import Search from 'components/Common/Search'
import './style.css'

interface HeaderWrapperPropsInterface {
  goBack: any
  user: string
  issues: Array<null | {}>
}

const HeaderWrapper = ({ goBack, issues, user }: HeaderWrapperPropsInterface) => {
  const backButton = (
    <span key="backButton" onClick={goBack} className="header__backbutton" />
  )

  const userName = (
    <span key="userName" className="header__username">{user}</span>
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
      <Header items={[backButton, userName, filterInput]} />
    </Fragment>
  )
}

export default HeaderWrapper
