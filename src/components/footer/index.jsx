import React from "react";
import logo_transparent from "../../assets/images/logo_transparent.svg";
import Button from "../../shared/button";
import { Link } from "react-router-dom";
import { PAGES } from "../../assets/utils/urls";
import { ICONS } from "../../assets/icons";
import moment from "moment";

const Footer = () => {
  return (
    <footer className="p-3 text-white md:p-20 bg-green">
      <div className="container px-0 mx-auto md:px-4 max-w-7xl flex justify-start items-center mb-8">
        <div className="p-4 rounded-full">
          <Link to={PAGES.HOME.path}>
            <img
              src={logo_transparent}
              alt="HalfChoice Logo"
              className="h-16 w-fit"
            />
          </Link>
        </div>
      </div>
      <div className="container px-0 mx-auto md:px-4 max-w-7xl">
        <div className="flex flex-col justify-between w-full border border-t-0 md:flex-row border-x-0 pb-[20px]">
          <div className="flex flex-col">
            <div className="flex items-start gap-1 p-3">
              <ICONS.LOCATION className="text-2xl" />
              <address className="pl-1 text-base not-italic">
                Anand IIyf, Vaishnodevi to Zundal circle, Tragad,
                <br />
                Sardar Patel Ring Rd, Near Vaishnodevi Under Bridge,
                <br />
                Ahmedabad, Gujarat 382470
              </address>
            </div>
            <div className="flex items-start gap-1 p-3">
              <ICONS.MAIL className="text-2xl " />
              <p className="pl-1 text-base">Email: info@halfchoice.in</p>
            </div>
            <div className="flex items-start gap-1 p-3">
              <ICONS.WORLD className="text-2xl " />
              <p className="pl-1 text-base">Website: www.halfchoice.in</p>
            </div>
            <div className="flex items-start gap-1 p-3">
              <ICONS.PHONE className="text-2xl " />
              <p className="pl-1 text-base">Phone: +91 81606 78824</p>
            </div>
          </div>

          {/* Footer right Section */}
          <div className="px-6 pt-2">
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 text-black rounded-[30px] md:w-auto focus:outline-none border-none md:min-w-[340px] min-w-[240px]"
                />
                <Button className="!ml-2 !rounded-[30px] ">
                  <span>Submit</span>
                </Button>
              </div>
            </div>
            <div className="flex md:justify-end mr-[39px] mt-[60px] gap-3">
              <div className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-green">
                <ICONS.FACEBOOK />
              </div>
              <div className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-green">
                <ICONS.INSTAGRAM />
              </div>
              <div className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-green">
                <ICONS.TWITTER />
              </div>
              <div className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-green">
                <ICONS.YOUTUBE />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col-reverse justify-between gap-2 mt-8 md:items-center md:flex-row">
          <div className="pl-2 md:pl-0 md:text-left">
            <p className="text-base">
              Copyright © {moment().year()} HalfChoice. All Rights Reserved.
            </p>
          </div>
          <div className="flex justify-start text-base md:justify-start md:flex-row">
            <Link to={PAGES.HOME.path} className="text-white hover:text-pink px-3">
              Home
            </Link>
            <Link to={PAGES.ABOUT.path} className="text-white hover:text-pink px-3">
              About us
            </Link>
            <Link
              to={PAGES.CONTACT_US.path}
              className="text-white hover:text-pink px-3"
            >
              contact us
            </Link>
            <Link to={PAGES.HOME.path} className="text-white hover:text-pink px-3">
              Blogs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
