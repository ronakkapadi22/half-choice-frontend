import React, { Fragment } from "react";
import { getDataFromLocal } from "../assets/utils/local";
import { isTokenActivated } from "../assets/utils/helper";

const withAuth =
  (RenderComponent, NavigateComponent) =>
  ({ to, replace, title, ...props }) => {
    const token = getDataFromLocal("token");
    return !isTokenActivated(token) ? (
      <Fragment>
        <RenderComponent {...props} />
      </Fragment>
    ) : (
      <NavigateComponent {...{ to, replace }} />
    );
  };


export default withAuth