import React, { useCallback } from 'react'
import { classNames, isFunction } from '../../assets/utils/helper'

const Button = ({className, handleClick, label, children, ...props}) => {
  
    const onClick = useCallback((e) => {
        if(isFunction(handleClick)) return handleClick(e)
    }, [])

    return (
    <button className={classNames('w-auto rounded-lg outline-none px-4 py-3 border text-base bg-text text-white border-text', className)} {...{onClick}} {...props} >{children ? children : label || ''}</button>
  )
}

export default Button