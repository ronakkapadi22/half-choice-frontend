<<<<<<< HEAD
import React, { useCallback } from "react";
import { classNames, isFunction } from "../../assets/utils/helper";

const Button = ({ className, handleClick, label, children, ...props }) => {
  const onClick = useCallback((e) => {
    if (isFunction(handleClick)) return handleClick(e);
  }, []);

  return (
    <button
      className={classNames(
        "w-auto rounded-lg outline-none px-4 py-3 border text-base bg-[#ff2189] text-white border-[#ff2189]",
        className
      )}
      {...{ onClick }}
      {...props}
    >
      {children ? children : label || ""}
    </button>
  );
};
=======
import React from 'react'
import { classNames } from '../../assets/utils/helper'

const Button = ({className, handleClick, label, children, ...props}) => {
    return (
    <button className={classNames('w-auto rounded-lg outline-none px-4 py-3 border text-base bg-text text-white border-text', className)} {...{onClick: handleClick}} {...props} >{children ? children : label || ''}</button>
  )
}
>>>>>>> 26b7274abe08c8808ba0e85b3aec95c0801d2909

export default Button;
