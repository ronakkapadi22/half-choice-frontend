import React from "react";
import { Routes, Route } from "react-router-dom";
import useRoutes from "../hooks/useRoutes";
import PublicLayout from "../layout/PublicLayout";
import AuthLayout from "../layout/AuthLayout";
import PrivateLayout from "../layout/UserLayout";
import PLanLayout from "../layout/PlanLayout";

const Routing = ({ ...props }) => {
  const { authRoutes, privateRoutes, publicRoutes, planRoutes } = useRoutes();
  return (
    <Routes>
      <Route path="/" element={<PLanLayout/>}>
        {planRoutes.map(({ id, element: Element, ...otherData }) => (
          <Route index key={`plan_${id}`} element={<Element/>} {...otherData} />
        ))}
      </Route>
      <Route path="/" element={<PublicLayout />}>
        {publicRoutes.map(({ id, element: Element, ...otherData }) => (
          <Route
            index
            key={`public_${id}`}
            element={<Element />}
            {...otherData}
          />
        ))}
      </Route>
      <Route path="/" element={<AuthLayout />}>
        {authRoutes.map(({ id, element: Element, ...otherData }) => (
          <Route
            index
            key={`auth_${id}`}
            element={<Element />}
            {...otherData}
          />
        ))}
      </Route>
      <Route path="/" element={<PrivateLayout />}>
        {privateRoutes.map(({ id, element: Element, ...otherData }) => (
          <Route
            index
            key={`private_${id}`}
            element={<Element />}
            {...otherData}
          />
        ))}
      </Route>
      <Route path="*" element={<p>Not Found</p>} />
    </Routes>
  );
};

export default Routing;
