import React, { useCallback } from "react";
import OrderProcess from "../order-process";
import Modal from "../modal";
import moment from "moment";
import Button from "../button";
import { PAGES } from "../../assets/utils/urls";
import { useNavigate } from "react-router-dom";
import { ICONS } from "../../assets/icons";
import { classNames } from "../../assets/utils/helper";

const PopUp = ({ handleClose, open, order, ...props }) => {
  const navigate = useNavigate()

  const handleRedirect = useCallback((path = '') => {
    navigate(path)
    handleClose(false)
  }, [navigate])

  console.log('order', order)

  return (
    <Modal {...props} rootClass=''
      className="p-0 transition-all duration-700"
      {...{ open, setOpen: handleClose }}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-[50rem] sm:p-8 p-2 mx-0 text-center bg-white shadow-lg rounded-[20px]">
          <div className="flex items-center justify-center">
            <div className={classNames("flex items-center justify-center w-12 h-12 mb-6 rounded-full sm:h-16 sm:w-16", order?.type !== 'failed' ? 'bg-green' : 'bg-red-500')}>
              <span className="text-xl text-white sm:text-3xl">
                {order?.type === 'failed' ? <ICONS.CLOSE className="w-12 h-12" /> : <ICONS.DONE className="w-12 h-12" />}
              </span>
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-semibold">
            {order?.type !== 'failed' ? 'Thank you for ordering!' : 'Order Failed!'}
          </h2>
          <h3 className="mb-2 text-lg font-medium text-pink" >Order: #{order?.order_no}</h3>
          <p className="mb-8 text-gray-500">
            {
              order?.type === 'failed' ? "We Can't process your order. Don't worry your money was safe. If money was debited from your account. it will be refunded in 24 Hours." : <>Thank you for shopping from us. Your order will be delivered by  <b>{moment(order?.estimationDate).format('DD MMM, YYYY')}</b></>
            }
          </p>
          <div className="w-full" >
            <OrderProcess {...order} />
          </div>
          <div className="flex justify-center space-x-4">
            {order?.type !== 'failed' ? <Button handleClick={() => handleRedirect(PAGES.ORDERS.path + '/' + order?.orderId)}
              className="px-6 py-2 font-medium !border-gray-100 !text-text !bg-gray-100 rounded-lg hover:bg-[#FCB018] hover:border-[#FCB018] hover:text-white transition-all border duration-300">
              View Order
            </Button> : null}
            <Button handleClick={() => handleRedirect(PAGES.HOME.path)}
              className="px-6 py-2 font-medium text-white rounded-lg bg-pink" >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PopUp;
