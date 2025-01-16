import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import withUser from "../hoc/withUser";

const PrivateLayout = ({ ...props }) => {

  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="relative w-full h-auto" {...props}>
      <WithAuthenticatedOutlet {...props} replace {...{ to: localStorage.getItem('redirect') || "/" }} />
    </section>
  );
};

export default PrivateLayout;

const WithAuthenticatedOutlet = withUser(Outlet, Navigate);
