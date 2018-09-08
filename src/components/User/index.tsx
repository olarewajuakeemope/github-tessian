import React from 'react'
import { Route, Switch } from 'react-router-dom'
import UserSearch from 'containers/User/Search'
import Loading from 'components/Common/Loading'
import UserListContainer from 'containers/User/List'
import IssuesLayout from 'layouts/User/Issue'
import './style.css'

interface MatchProps {
  path: string
}

interface UserPropsInterface {
  loading: boolean
  match: MatchProps
}

const User = ({ loading, match: { path } }: UserPropsInterface) => {
    return (
      <Loading loading={loading}>
        <div className="userDashboard__wrapper">
          <div className="userSearch__wrapper">
            <UserSearch/>
          </div>
          <Switch>
            <Route component={IssuesLayout} path={`${path}/issues/:user`} />
            <Route component={UserListContainer} />
          </Switch>
        </div>
      </Loading>
    )
}

export default User
