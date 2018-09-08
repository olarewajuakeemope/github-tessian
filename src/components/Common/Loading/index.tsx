import React, { ReactNode } from 'react'
import './style.css'

interface LoadingProps {
  bullets?: number
  delay?: number
  delayUnit?: string
  loading?: boolean
  children: ReactNode | HTMLDivElement
}

const Loading = ({ bullets = 4, delay = 75, delayUnit = 'ms', loading = false, children }: LoadingProps) => {
  const $bullets = [...Array(bullets).keys()].map(index => {
    const style = {
      animationDelay: (delay * index) + delayUnit,
    }
    return <div key={index} style={style} />
  })

  const $loader = !loading ? null : (
    <div className="Loader">
      {$bullets}
    </div>
  )

  return (
    <div className="Loading">
      {$loader}
      {children}
    </div>
  )
}

export default Loading
