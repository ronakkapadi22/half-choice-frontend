import React, { Fragment } from "react";
import Footer from "../components/footer";
import NavBar from "../components/navbar";

const withPublic =
  (RenderComponent) =>
  ({ ...props }) => {
    return (
      <Fragment>
        <NavBar />
        <RenderComponent {...props} /> 
        <Footer />
      </Fragment>
    );
  };

export default withPublic;
