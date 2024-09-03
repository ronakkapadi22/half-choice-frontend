import React, { useCallback } from "react";
import Discount from "../discount";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../assets/utils/urls";
import logo from '../../assets/images/logo.png'
import { ICONS } from "../../assets/icons";

const NavBar = () => {

  const navigate = useNavigate()

  const handleRedirect = useCallback((path) => {
    navigate(path)
  }, [navigate])

  return (
    <div className="w-full">
      <Discount discount="25% off with COD Available | Free Delivery" />
      <nav className="w-full h-[92px] bg-white flex justify-between items-center py-4 px-2 sm:px-[80px] shadow-[0_2px_12px_0px_rgba(0,0,0,0.1)]">
        <div onClick={() => handleRedirect(PAGES.HOME.path)} className="flex justify-start">
          <img src={logo}
            className="w-[160px] cursor-pointer md:w-[200px]"
            alt="header_logo"
          />
        </div>
        <div className="flex items-center" >
          <ICONS.SEARCH className="w-6 h-6 text-text cursor-pointer" />
          <div className="w-[1px] h-5 bg-text mx-2" ></div>
          <ICONS.USER_PLUS className="w-6 h-6 text-text cursor-pointer" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
