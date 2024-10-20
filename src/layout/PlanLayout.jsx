import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/navbar'

const PLanLayout = ({ ...props }) => {
  return (
    <section className="relative w-full" {...props}>
      <NavBar />
      <Outlet {...props} />
    </section>
  )
}

export default PLanLayout