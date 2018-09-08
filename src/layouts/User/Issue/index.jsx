import React from 'react'
import HeaderContainer from 'containers/User/Issue/Header'
import SidebarContainer from 'containers/User/Issue/Sidebar'
import PanelContainer from 'containers/User/Issue/Panel'
import './style.css'

const Issue = () => (
  <div className="userCommits__wrapper">
    <HeaderContainer />
    <div className="userCommits__panelWrapper">
      <SidebarContainer />
      <PanelContainer />
    </div>
  </div>
)

export default Issue
