import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import withUser from '../hoc/withUser'


const PrivateLayout = ({ ...props }) => {
    return <section className="w-full h-auto" {...props}>
        <WithAuthenticatedOutlet {...props} replace {...{ to: '/' }} />
    </section>
}

export default PrivateLayout

const WithAuthenticatedOutlet = withUser(Outlet, Navigate)