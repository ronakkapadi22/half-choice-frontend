import React from "react";
import { Outlet } from "react-router-dom";
import withPublic from "../hoc/withPublic";

const PublicLayout = ({ ...props }) => {
  return (
    <section className="relative w-full" {...props}>
      <WithPublicOutlet {...props} />
    </section>
  );
};

export default PublicLayout;

const WithPublicOutlet = withPublic(Outlet);
