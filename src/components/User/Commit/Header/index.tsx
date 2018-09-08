import React, { Fragment } from 'react'
import Header from 'components/User/Header'
import Search from 'components/Common/Search'
import './style.css'

interface HeaderWrapperPropsInterface {
  goBack: any
  user: string
  commits: Array<null | {}>
}

const HeaderWrapper = ({ goBack, commits, user }: HeaderWrapperPropsInterface) => {
  const backButton = (
    <span key="backButton" onClick={goBack} className="header__backbutton" />
  )

  const userName = (
    <span key="userName" className="header__username">{user}</span>
  )

  const filterInput = (
    <span key="filterInput" className="filterInput">
      <Search
        name="commit"
        className="headerInput__filter"
        placeholder="Filter commit message"
        disabled={commits.length < 1}
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
