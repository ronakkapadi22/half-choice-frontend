import React, { useCallback } from "react";
import { classNames, isFunction } from "../../assets/utils/helper";

const Form = ({ className, handleSubmit, children, ...props }) => {
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    handleSubmit(e);
  }, [handleSubmit]);

  return (
    <form
      {...{ onSubmit }}
      className={classNames("w-full", className)}
      {...props}
    >
      {children || ""}
    </form>
  );
};

export default Form;
