import React, { Fragment } from "react";
import { getDataFromLocal } from "../assets/utils/local";
import { isTokenActivated } from "../assets/utils/helper";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const withUser =
  (RenderComponent, NavigateComponent) =>
  ({ to, ...props }) => {
    const token = getDataFromLocal("token");
    return isTokenActivated(token) ? (
      <Fragment>
        <NavBar />
        <RenderComponent {...props} />
        <Footer />
      </Fragment>
    ) : (
      <NavigateComponent {...{ to, replace: '/' }} />
    );
  };

export default withUser;
