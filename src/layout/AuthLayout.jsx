import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import withAuth from '../hoc/withAuth'

const AuthLayout = ({ ...props }) => {

	// Extracts pathname property(key) from an object
	const { pathname } = useLocation();

	// Automatically scrolls to top whenever pathname changes
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<section className="w-screen h-screen" {...props}>
			<WithAuthLayout {...props} replace {...{ to: '/' }} />
		</section>
	)
}
export default AuthLayout

const WithAuthLayout = withAuth(Outlet, Navigate)