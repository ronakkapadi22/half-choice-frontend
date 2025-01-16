import React, { useCallback } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox';
import { ICONS } from '../../assets/icons';
import { isFunction, classNames } from '../../assets/utils/helper';


const CustomCheckBox = ({checked, className, label, name, handleChange, ...props}) => {

  return (
    <div className={classNames("flex items-center", className)}>
      <Checkbox.Root {...{checked}} onCheckedChange={(value) => handleChange({target: {value, name}})} {...props}
        className={classNames("flex h-5 w-5 border border-text-secondary appearance-none items-center justify-center rounded-[4px] outline-none", checked ? 'bg-green !border-green' : 'bg-white')}
        id="c1"
      >
        <Checkbox.Indicator className="text-base">
          <ICONS.CHECK className='w-4 h-4 text-white' />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label ? <label className="pl-2 text-base leading-none" htmlFor="c1">
        {label || ''}
      </label> : null}
    </div>
  )
}

export default CustomCheckBox