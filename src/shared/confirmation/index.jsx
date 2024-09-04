import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Button from "../button";
import { classNames } from "../../assets/utils/helper";

const Confirmation = ({
  rootClass,
  open,
  title,
  description,
  setOpen,
  handleAction,
  cancelClass,
  actionClass,
  actionLabel,
  ...props
}) => {

  return (
    <AlertDialog.Root {...{ open, onOpenChange: setOpen }} {...props} >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black opacity-25 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] z-50 focus:outline-none">
          {title ? (
            <AlertDialog.Title className="text-text m-0 text- font-medium">
              {title || ""}
            </AlertDialog.Title>
          ) : null}
          {description ? (
            <AlertDialog.Description className="text-slate-400 mb-5 mt-1 text-base leading-normal">
              {description || ''}
            </AlertDialog.Description>
          ) : null}
          <div className="flex justify-end gap-4 mt-4">
            <AlertDialog.Cancel asChild>
                <button type='button' className={classNames('inline-flex h-[35px] items-center justify-center rounded-[4px] bg-gray-100 px-[15px] font-medium leading-none text-gray-700 outline-none hover:bg-gray-800 hover:text-gray-200 focus:ring-0', cancelClass)}>Cancel</button>
            </AlertDialog.Cancel>
            <button onClick={handleAction} label={actionLabel || ''} className={classNames('inline-flex h-[35px] items-center justify-center rounded-[4px] bg-[#ffdbdc] px-[15px] font-medium leading-none text-danger outline-none hover:bg-danger-hover focus:ring-0', actionClass)} >{actionLabel || ''}</button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Confirmation;
