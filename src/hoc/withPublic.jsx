import React, { Fragment, useCallback, useState } from "react";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import { classNames } from "../assets/utils/helper";
// import ScrollTrigger from "react-scroll-trigger";

const withPublic =
  (RenderComponent) =>
  ({ ...props }) => {
    const [sensor, setSensor] = useState(false);

    // const onSenseIn = useCallback(() => {
    //   setSensor(true);
    // }, []);
    // const onSenseOut = useCallback(() => {
    //   setSensor(false);
    // }, []);

    return (
      <Fragment>
        {/* <ScrollTrigger onEnter={onSenseOut} onExit={onSenseIn}> */}
        <NavBar
          className={classNames(
            sensor ? "fixedHeader animate__animated animate__slideInDown" : ""
          )}
        />
        {/* </ScrollTrigger> */}
        <RenderComponent {...props} />
        <Footer />
      </Fragment>
    );
  };

export default withPublic;
