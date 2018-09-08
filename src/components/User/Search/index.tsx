import React, { Fragment } from 'react'
import Search from 'components/Common/Search'
import './style.css'

interface HeaderPropsInterface {
  pristine: boolean
  submitting: boolean
  handleSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined
}

const UserSearch = ({ handleSubmit, pristine, submitting }: HeaderPropsInterface) =>
  <Fragment>
    <h1 className="userSearch__text">Search Github Users</h1>
    <Search
      handleSubmit={handleSubmit}
      pristine={pristine}
      submitting={submitting}
      name="q"
      placeholder="Enter username"
    />
  </Fragment>

export default UserSearch
