import React, { Fragment, PureComponent } from 'react'
import FormConstants from './constants'
import './style.css'

interface AdvancedFilterProps {
  handleClose: () => void
  handleSubmit: () => void
}

interface AdvancedFilterState {
  [prop: string]: any
}

const initialState: any = {
  assignee: '*',
  assigneeValue: '',
  creator: '',
  direction: 'asc',
  labels: '',
  mentioned: '',
  milestone: '*',
  milestoneNumber: -1,
  sort: 'created',
  state: 'open',
}

class AdvancedFilter extends PureComponent<AdvancedFilterProps, AdvancedFilterState> {
  state = initialState

  handleChange = (e: any) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  renderInput = (label: string, name: string, type: string, placeholder: string) => (
    <div className="item input">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    </div>
  )

  renderRadioInput = (name: string, inputLabel: string, inputType: string, inputName: string, placeholder: string) => (
    <Fragment>
      {FormConstants[name].map(({label, value}: any, index: number) => (
        <div key={`${index}${value}`} className="item radio_wrapper">
          <input
            name={name}
            type="radio"
            value={value}
            checked={this.state[name] === value}
            onChange={this.handleChange}
          />
          <span>{label}</span>
      </div>
      ))}
      {(this.state[name] === 'unique') && this.renderInput(inputLabel, inputName, inputType, placeholder)}
    </Fragment>
  )

  renderSelectInput = (name: string, label: string) => (
    <div className="item select_wrapper">
      <label>{label}</label>
      <select name={name} value={this.state[name]} onChange={this.handleChange}>
        {FormConstants[name].map((val: string, index: number) => (
          <option key={`${index}${val}`} value={val}>{val}</option>
        ))}
      </select>
    </div>
  )

  handleSubmit = (e: any) => {
    e.preventDefault()
    const { assignee, assigneeValue, creator, direction, labels, mentioned, milestone, milestoneNumber, sort, state } = this.state
    const params: any = {
      direction,
      sort,
      state,
    }
    if (assignee === 'unique' && assigneeValue) {
      params.assignee = assigneeValue
    } else if (assignee !== 'unique') {
      params.assignee = assignee
    }
    if (milestone === 'unique' && milestoneNumber > -1) {
      params.milestone = milestoneNumber
    } else if (milestone !== 'unique') {
      params.milestone = milestone
    }
    if (creator) {
      params.creator = creator
    }
    if (mentioned) {
      params.mentioned = mentioned
    }
    if (labels) {
      params.labels = labels.replace(new RegExp(' ', 'g'), '')
    }
    // tslint:disable-next-line
    console.log(params)
  }

  render() {
    const { handleClose } = this.props
    return (
      <div className="header_filter-advanced">
        <form>
          <div className="title">
            <h2 className="text">Advanced Filter</h2>
            <span className="close" onClick={handleClose}>×</span>
          </div>
          <div className="content">
            <label>Select Milestone</label>
            {this.renderRadioInput('milestone', 'Milestone', 'number', 'milestoneNumber', 'E.g: 123456')}
            <label>Select Assignee</label>
            {this.renderRadioInput('assignee', 'Assignee', 'text', 'assigneeValue', 'E.g: eric')}
            <br />
            {this.renderSelectInput('state', 'Select State')}
            {this.renderSelectInput('sort', 'Sort By')}
            {this.renderSelectInput('direction', 'Direction of sort')}
            <br />
            {this.renderInput('Issue Creator', 'creator', 'text', 'E.g: eric')}
            {this.renderInput('Mentioned User', 'mentioned', 'text', 'E.g: eric')}
            {this.renderInput('Labels separated by commas', 'labels', 'text', 'E.g: bug,ui,@high')}
          </div>
          <div className="footer">
            <button className="close" onClick={handleClose}>Cancel</button>
            <button onClick={this.handleSubmit}>Search</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AdvancedFilter
