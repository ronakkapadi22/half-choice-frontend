import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import withAuth from '../hoc/withAuth'

const AuthLayout = ({ ...props }) => {

	return (
		<section className="w-screen h-screen" {...props}>
			<WithAuthLayout {...props} replace {...{ to: '/' }} />
		</section>
	)
}
export default AuthLayout

const WithAuthLayout = withAuth(Outlet, Navigate)