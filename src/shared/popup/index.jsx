import React from "react";
import CustomDialog from "../dialog";

const PopUp = ({ handleClose, change, ...props }) => {
  return (
    <CustomDialog
      className="p-0 lg:h-[50vh] h-[35vh] transition-all duration-700"
      {...{ open: Boolean(change), handleClose: handleClose }}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center lg:h-[50vh] h-[35vh]">
        <div className="relative w-full max-w-[50rem] sm:p-8 p-2 mx-0 text-center bg-white shadow-lg lg:h-[50vh] rounded-[20px] h-[35vh]">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-full sm:h-16 sm:w-16 bg-pink">
              <span className="text-xl text-white sm:text-3xl">✔</span>
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-semibold">
            Thank you for ordering!
          </h2>
          <p className="mb-8 text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-2 font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-[#FCB018] hover:border-[#FCB018] hover:text-white transition-all border duration-300"
              // onClick={onClose}
            >
              View Order
            </button>
            <button
              className="px-6 py-2 font-medium text-white rounded-lg bg-pink"
              // onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default PopUp;
