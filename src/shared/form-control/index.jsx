import React from "react";
import CustomInput from "../input";

const FormControl = ({ label, className, error, ...props }) => {
  return (
    <div className="w-full flex flex-col justify-start">
      {label ? (
        <label className="mb-1 font-medium text-text ">
          {label || ""}
        </label>
      ) : null}
      <CustomInput {...props} {...{ error }} />
      {error ? (
        <span className="my-1 font-medium text-red-500">
          {error || ""}
        </span>
      ) : null}
    </div>
  );
};

export default FormControl;
