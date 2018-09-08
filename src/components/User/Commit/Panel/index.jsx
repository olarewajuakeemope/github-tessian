import React, { PureComponent, Fragment } from 'react'
import { List } from 'react-virtualized'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import { v1 } from 'uuid'
import { getDimension } from 'utils'
import './style.css'

const renderLoaderEl = () => (
  <div key={v1()} className="userCommitsPanel__item">
    <h5 className="loading__background commit__message" />
    <h5 className="loading__background commit__url" />
    <h5 className="loading__background commit__author" />
    <h5 className="loading__background commit__date" />
  </div>
)

class Commit extends PureComponent {
  state = {
    width: getDimension('width', 200, 200),
    rowHeight: getDimension('height', 200, 200),
    commits: [],
  }

  resizeDimensions = () => {
    this.setState({
      width: getDimension('width', 200, 200),
      rowHeight: getDimension('height', 200, 200),
    })
  }

  static getDerivedStateFromProps(nextProps) {
    const pattern = new RegExp(lodash.escapeRegExp(nextProps.filter), 'i')
    const isMatch = (result => pattern.test(result.message))
    return {
      commits: lodash.filter(nextProps.commits, isMatch),
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeDimensions)
  }

  renderLoaders = () => {
    let i = 5
    const loaders = []
    while (i > 0) {
      loaders.push(renderLoaderEl())
      i -= 1
    }
    return loaders
  }

  renderRepoDescription = () => {
    const { description } = this.props
    if (description) {
      return (
        <Fragment>
          Repo Description: <span>{description}</span>
        </Fragment>
      )
    }
    return <Fragment>This repo has no description</Fragment>
  }

  renderEmpty = () => (
    <div className="empty">
      <h2>No Repository selected</h2>
    </div>
  )

  rowRenderer = ({ index, key, style }) => {
    const { commits } = this.state
    const { message, date, commit_url, author_name } = commits[index]
    return (
      <div key={key} style={style} className="userCommitsPanel__item">
        <h5 className="commit__message">{message}</h5>
        <h5 className="commit__url">
          <a href={commit_url} target="_blank">Url</a>
        </h5>
        <h5 className="commit__author">{author_name}</h5>
        <h5 className="commit__date">{date}</h5>
    </div>
    )
  }

  renderCommits = () => {
    const { isLoading } = this.props
    const { width, rowHeight, commits } = this.state
    return (
      <Fragment>
        <h4 className="repo_description">
          {this.renderRepoDescription()}
        </h4>
        <div className="userCommitsPanelItems__wrapper">
          <h2>{commits.length} Commits</h2>
          {isLoading ? this.renderLoaders() :
            <List
              width={width}
              rowHeight={rowHeight}
              style={{ outline: 0 }}
              rowCount={commits.length}
              rowRenderer={this.rowRenderer}
              height={rowHeight * Math.min(20, commits.length)}
            />}
        </div>
      </Fragment>
    )
  }

  render() {
    const { hasSelected } = this.props
    return (
      <div className="userCommits__panel">
        {hasSelected ? this.renderCommits() : this.renderEmpty()}
      </div>
    )
  }
}

Commit.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasSelected: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  commits: PropTypes.array.isRequired,
  description: PropTypes.string,
}

export default Commit
