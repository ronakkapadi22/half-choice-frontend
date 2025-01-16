import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/navbar";

const PLanLayout = ({ ...props }) => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="relative w-full" {...props}>
      <NavBar />
      <Outlet {...props} />
    </section>
  );
};

export default PLanLayout;
