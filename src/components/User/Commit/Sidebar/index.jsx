import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List } from 'react-virtualized'
import { v1 } from 'uuid'
import './style.css'

const loaderTemplate = () => (
  <div key={v1()} className="userCommitsSidebar__item">
    <h5 className="loading__background repo__name" />
    <p className="loading__background repo__status" />
    <p className="loading__background repo__url" />
  </div>
)

class Commit extends PureComponent {
  renderLoaders = () => {
    let i = 5
    const loaders = []
    while (i > 0) {
      loaders.push(loaderTemplate())
      i -= 1
    }
    return loaders
  }

  handleClick = (e, name, description, index) => {
    const { getCommits } = this.props
    const currAcitve = document.querySelector('.active')
    if (currAcitve) {
      currAcitve.classList.remove('active')
    }
    e.target.classList.add('active')
    getCommits(name, description)
    this.activeIndex = index
  }

  rowRenderer = ({ index, key, style }) => {
    const { repos } = this.props
    const { name, html_url, description } = repos[index]
    const isPrivate = repos[index].private
    return (
      <div
        key={key}
        style={style}
        data-id={`${index}`}
        className="userCommitsSidebar__item"
        onClick={(e) => this.handleClick(e, name, description, index)}
      >
        <h5 className="repo__name">{name}</h5>
        <p className="repo__status">
          {isPrivate ? 'Private' : <span className="public">Public</span>}
        </p>
        <p className="repo__url">
          <a href={html_url} target="_blank">Url</a>
        </p>
      </div>
    )
  }

  onRowsRendered = () => {
    const activeEl = document.querySelector(`[data-id="${this.activeIndex}"]`)
    if (activeEl) {
      activeEl.classList.add('active')
    }
  }

  render() {
    const { isLoading, repos } = this.props
    return (
      <div className="userCommits__sidebar">
        <h2>{repos.length} Repos</h2>
        <div className="userCommitsSidebarItem__wrapper">
          {isLoading ?
            this.renderLoaders() :
            <List
              width={370}
              rowHeight={150}
              height={500}
              style={{ outline: 0 }}
              rowCount={repos.length}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
            />
          }
        </div>
      </div>
    )
  }
}

Commit.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  repos: PropTypes.array.isRequired,
  getCommits: PropTypes.func.isRequired,
}

export default Commit
