import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import withPublic from "../hoc/withPublic";

const PublicLayout = ({ ...props }) => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="relative w-full" {...props}>
      <WithPublicOutlet {...props} />
    </section>
  );
};

export default PublicLayout;

const WithPublicOutlet = withPublic(Outlet);
