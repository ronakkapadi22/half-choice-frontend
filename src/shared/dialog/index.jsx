import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
// import { Cross1Icon } from "@radix-ui/react-icons";
import Button from "../button";
import { classNames } from "../../assets/utils/helper";
import { ICONS } from "../../assets/icons";

const CustomDialog = ({ open, handleClose, className, children }) => {
  return (
    <Dialog.Root {...{ open: Boolean(open), onOpenChange: handleClose }}>
      <Dialog.Portal>
        <Dialog.Overlay className="z-[99] data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className={classNames(
            "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] sm:min-w-[660px] min-w-[375px] translate-x-[-50%] translate-y-[-50%] rounded-[20px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] z-[999] focus:outline-none",
            className
          )}
        >
          {children || ""}
          <Dialog.Close asChild>
            <Button
              handleClick={handleClose}
              className="!p-2 absolute hover:bg-[#FCB018] hover:border-[#FCB018] transition-all border flex !h-12 !w-12 appearance-none items-center justify-center !rounded-full focus:ring-0 focus:outline-none z-[999] duration-300"
              aria-label="Close"
            >
              <ICONS.CLOSE className="w-8 h-8 text-white" />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CustomDialog;
