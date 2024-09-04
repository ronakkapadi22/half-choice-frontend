import React from "react";
import logo from "../../assets/images/logo.png";
import "../../styles/general.css";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { BiPhoneCall } from "react-icons/bi";
import { FiFacebook, FiYoutube } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Button from "../../shared/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="p-3 text-white md:p-20 bg-[#8DC63F]"
      // style={{ clipPath: "circle(64.5% at 50% 100%)" }}
    >
      {/* Logo Positioned Between Sections */}
      <div className="flex justify-center mx-auto mb-10">
        <div className="p-4 bg-white rounded-full">
          <Link to="/">
            <img
              src={logo} // replace with the actual logo path
              alt="HalfChoice Logo"
              className="h-16 w-fit"
            />
          </Link>
        </div>
      </div>

      <div className="container px-0 mx-auto md:px-4 max-w-[1200px]">
        <div className="flex flex-col justify-between w-full border border-t-0 md:flex-row border-x-0 pb-[20px]">
          {/* Footer left Section */}
          <div className="flex flex-col">
            <div className="flex items-start gap-1 p-3">
              <IoLocationOutline className="text-2xl" />
              <address className="pl-1 text-base not-italic">
                Anand IIyf, Vaishnodevi to Zundal circle, Tragad,
                <br />
                Sardar Patel Ring Rd, Near Vaishnodevi Under Bridge,
                <br />
                Ahmedabad, Gujarat 382470
              </address>
            </div>
            <div className="flex items-start gap-1 p-3">
              <IoMailOutline className="text-2xl " />
              <p className="pl-1 text-base">Email: info@halfchoice.in</p>
            </div>
            <div className="flex items-start gap-1 p-3">
              <TbWorld className="text-2xl " />
              <p className="pl-1 text-base">Website: www.halfchoice.in</p>
            </div>
            <div className="flex items-start gap-1 p-3">
              <BiPhoneCall className="text-2xl " />
              <p className="pl-1 text-base">Phone: +91 81606 78824</p>
            </div>
          </div>

          {/* Footer right Section */}
          <div className="px-6 pt-2">
            <div className="relative">
              <form className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 text-black rounded-[30px] md:w-auto focus:outline-none border-none md:min-w-[340px] min-w-[240px]"
                />
                <Button className="ulinaBTN right-[39px] !rounded-[30px] ">
                  <span>Submit</span>
                </Button>
              </form>
            </div>
            <div className="flex md:justify-end mr-[39px] mt-[60px] gap-3">
              <div className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-[#84CC16]">
                <FiFacebook />
              </div>
              <div className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-[#84CC16]">
                <FaInstagram />
              </div>
              <div className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-[#84CC16]">
                <FaXTwitter />
              </div>
              <div className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-[#84CC16]">
                <FiYoutube />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col-reverse justify-between gap-2 mt-8 md:items-center md:flex-row">
          <div className="pl-2 md:pl-0 md:text-left">
            <p className="text-base">
              Copyright © 2023 HalfChoice. All Rights Reserved.
            </p>
          </div>
          <div className="flex flex-col justify-center text-base md:justify-start md:flex-row">
            <Link to="/" className="text-white hover:text-[#ff2189] px-3">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-[#ff2189] px-3">
              About us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-[#ff2189] px-3"
            >
              contact us
            </Link>
            <Link
              to="/features"
              className="text-white hover:text-[#ff2189] px-3"
            >
              Features
            </Link>
            <Link to="/blog" className="text-white hover:text-[#ff2189] px-3">
              Blogs
            </Link>
          </div>
        </div>

        {/* Footer Links */}
      </div>
    </footer>
  );
};

export default Footer;
