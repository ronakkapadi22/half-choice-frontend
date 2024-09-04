import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import withUser from "../hoc/withUser";

const PrivateLayout = ({ ...props }) => {
<<<<<<< HEAD
  return (
    <section className="w-full h-auto" {...props}>
      <WithAuthenticatedOutlet {...props} replace {...{ to: "/" }} />
=======
    return <section className="w-full h-auto relative" {...props}>
        <WithAuthenticatedOutlet {...props} replace {...{ to: '/' }} />
>>>>>>> 26b7274abe08c8808ba0e85b3aec95c0801d2909
    </section>
  );
};

export default PrivateLayout;

const WithAuthenticatedOutlet = withUser(Outlet, Navigate);
