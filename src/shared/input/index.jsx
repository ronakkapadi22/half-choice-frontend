import React, { useCallback } from "react";
import { classNames, isFunction } from "../../assets/utils/helper";

const CustomInput = ({
  name,
  value,
  error,
  icon: ICON,
  className,
  isPhone,
  handleChange,
  inputClass,
  ...props
}) => {
  return (
    <div
      className={classNames(
        "w-full flex items-center justify-start relative",
        className
      )}
    >
      {isPhone ? (
        <div className="absolute -translate-y-1/2 left-4 top-1/2">+91</div>
      ) : null}
      <input
        className={classNames(
          "outline-none border rounded-lg w-full py-3 px-4 border-text-secondary placeholder:text-text-secondary focus:border-text",
          isPhone ? "!pl-12" : ""
        )}
        {...{ name, value, onChange: handleChange }}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
