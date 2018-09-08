import React, { PureComponent, Fragment } from 'react'
import { List } from 'react-virtualized'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import { v1 } from 'uuid'
import { getDimension } from 'utils'
import './style.css'

const renderLoaderEl = () => (
  <div key={v1()} className="userissuesPanel__item">
    <h5 className="loading__background issue__message" />
    <h5 className="loading__background issue__url" />
    <h5 className="loading__background issue__author" />
    <h5 className="loading__background issue__date" />
  </div>
)

class Panel extends PureComponent {
  state = {
    width: getDimension('width', 200, 200),
    rowHeight: getDimension('height', 200, 200),
    issues: [],
  }

  resizeDimensions = () => {
    this.setState({
      width: getDimension('width', 200, 200),
      rowHeight: getDimension('height', 200, 200),
    })
  }

  static getDerivedStateFromProps(nextProps) {
    const pattern = new RegExp(lodash.escapeRegExp(nextProps.filter), 'i')
    const isMatch = (result => pattern.test(result.title))
    return {
      issues: lodash.filter(nextProps.issues, isMatch),
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
    const { issues } = this.state
    const { title, date, url, author_name } = issues[index]
    return (
      <div key={key} style={style} className="userissuesPanel__item">
        <h5 className="issue__message">{title}</h5>
        <h5 className="issue__url">
          <a href={url} target="_blank">Url</a>
        </h5>
        <h5 className="issue__author">{author_name}</h5>
        <h5 className="issue__date">{date}</h5>
    </div>
    )
  }

  renderIssues = () => {
    const { isLoading } = this.props
    const { width, rowHeight, issues } = this.state
    return (
      <Fragment>
        <h4 className="repo_description">
          {this.renderRepoDescription()}
        </h4>
        <div className="userissuesPanelItems__wrapper">
          <h2>{issues.length} Issues</h2>
          {isLoading ? this.renderLoaders() :
            <List
              width={width}
              rowHeight={rowHeight}
              style={{ outline: 0 }}
              rowCount={issues.length}
              rowRenderer={this.rowRenderer}
              height={rowHeight * Math.min(20, issues.length)}
            />}
        </div>
      </Fragment>
    )
  }

  render() {
    const { hasSelected } = this.props
    return (
      <div className="userissues__panel">
        {hasSelected ? this.renderIssues() : this.renderEmpty()}
      </div>
    )
  }
}

Panel.defaultProps = {
  filter: '',
}

Panel.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasSelected: PropTypes.bool.isRequired,
  filter: PropTypes.string,
  issues: PropTypes.array.isRequired,
  description: PropTypes.string,
}

export default Panel
