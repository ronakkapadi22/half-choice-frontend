import React from "react";
import CustomInput from "../input";
import { classNames } from "../../assets/utils/helper";

const FormControl = ({ label, className, error, isError, ...props }) => {
  return (
    <div className={classNames("w-full flex flex-col justify-start", className)}>
      {label ? (
        <label className="mb-1 font-medium text-text ">
          {label || ""}
        </label>
      ) : null}
      <CustomInput {...props} {...{ error }} />
      {error || isError ? (
        <span className="my-1 font-medium text-sm text-red-500">
          {error || ""}
        </span>
      ) : null}
    </div>
  );
};

export default FormControl;
