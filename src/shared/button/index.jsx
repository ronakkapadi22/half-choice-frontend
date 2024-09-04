import React from "react";
import { classNames } from "../../assets/utils/helper";

const Button = ({ className, handleClick, label, children, ...props }) => {
  return (
    <button
      className={classNames(
        "w-auto rounded-lg outline-none px-4 py-3 border text-base bg-text text-white border-text",
        className
      )}
      {...{ onClick: handleClick }}
      {...props}
    >
      {children ? children : label || ""}
    </button>
  );
};

export default Button;
