import React from 'react'
import { Outlet } from 'react-router-dom'

const PLanLayout = ({...props}) => {
  return (
    <section className="relative w-full" {...props}>
        <Outlet {...props} />
    </section>
  )
}

export default PLanLayout