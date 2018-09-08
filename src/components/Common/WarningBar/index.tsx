import React, { SFC } from 'react'
import { ClearError } from 'redux/user/interfaces'
import './style.css'

interface WarningBarProps {
  text: string
  clearError: () => ClearError
}

const WarningBar: SFC<WarningBarProps> = ({ text, clearError }) => text ? (
  <div
    onClick={clearError}
    className="warningBar_component">
    {text}
  </div>
) : null

export default WarningBar
