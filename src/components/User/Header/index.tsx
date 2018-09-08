import React from 'react'
import './style.css'

interface HeaderPropsInterface {
  items: Array<any>
}

const Header = ({ items }: HeaderPropsInterface) => (
  <div className="header__wrapper">
    {items.map(item => item)}
  </div>
)

export default Header
