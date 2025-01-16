import React from 'react'
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { classNames } from "../../assets/utils/helper";

const Modal = ({
    children,
    rootClass,
    open,
    setOpen,
    ...props
}) => {
    return (
        <AlertDialog.Root {...{ open, onOpenChange: setOpen }} {...props} >
            <AlertDialog.Portal>
                <AlertDialog.Content className={classNames("data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] z-50 focus:outline-none", rootClass)}>
                    {children || ''}
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}

export default Modal