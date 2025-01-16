import React from "react";
import { classNames } from "../../assets/utils/helper";

const Form = ({ className, handleSubmit, children, ...props }) => {
  return (
    <form
      {...{ onSubmit: handleSubmit }}
      className={classNames("w-full", className)}
      {...props}
    >
      {children || ""}
    </form>
  );
};

export default Form;
