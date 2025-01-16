import React from "react";
import logo_transparent from "../../assets/images/logo_transparent.svg";
import play_store from "../../assets/images/play_store.png";
import Button from "../../shared/button";
import { Link } from "react-router-dom";
import { PAGES } from "../../assets/utils/urls";
import { ICONS } from "../../assets/icons";
import moment from "moment";

const Footer = () => {
  return (
    <footer className="p-3 text-white md:p-10 bg-green lg:p-20">
      <div className="container flex items-center justify-between px-0 mx-auto mb-8 md:px-4 max-w-7xl">
        <div className="p-4 rounded-full">
          <Link to={PAGES.HOME.path}>
            <img
              src={logo_transparent}
              alt="HalfChoice Logo"
              className="h-12 md:h-16 w-fit"
            />
          </Link>
        </div>
        <div className="p-4 rounded-full">
          <a href="https://play.google.com/store/apps/details?id=com.half.choice" target="_blank">
            <img
              src={play_store}
              alt="Play Store Logo"
              className="h-auto w-auto"
            />
          </a>
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
                  className="w-full px-4 py-3 text-black rounded-[30px] md:w-auto focus:outline-none border-none lg:min-w-[440px] min-w-[230px] md:min-w-[340px]"
                />
                <Button className="!ml-2 !rounded-[30px] w-[140px] absolute right-0 hover:bg-[#FCB018] focus:outline-none border-none translate-x-0 duration-300">
                  <span>Submit</span>
                </Button>
              </div>
            </div>
            <div className="flex md:justify-end mr-[0px] mt-[60px] gap-3">
              <a href="https://www.facebook.com/profile.php?id=61551765577969&mibextid=ZbWKwL" target="_blank" className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-green">
                <ICONS.FACEBOOK />
              </a>
              <a href="https://www.instagram.com/half.choice/" target="_blank" className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-green">
                <ICONS.INSTAGRAM />
              </a>
              <a href="https://x.com/HalfChoice01" target="_blank" className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-green">
                <ICONS.TWITTER />
              </a>
              <a href="https://www.youtube.com/@halfchoice" target="_blank" className="border rounded-[30px] p-3 cursor-pointer text-3xl bg-white text-green">
                <ICONS.YOUTUBE />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col-reverse justify-between gap-2 mt-8 md:items-center md:flex-row">
          <div className="pl-2 md:pl-0 md:text-left">
            <p className="text-sm md:text-base">
              Copyright © {moment().year()} HalfChoice. All Rights Reserved.
            </p>
          </div>
          <div className="flex justify-start text-base md:justify-start md:flex-row">
            <Link
              to={PAGES.HOME.path}
              className="px-3 text-white hover:text-pink"
            >
              Home
            </Link>
            <Link
              to={PAGES.ABOUT.path}
              className="px-3 text-white hover:text-pink"
            >
              About us
            </Link>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=halfchoice2023@gmail.com" target="_blank"

              className="px-3 text-white hover:text-pink"
            >
              contact us
            </a>
            <Link
              to={PAGES.HOME.path}
              className="px-3 text-white hover:text-pink"
            >
              Blogs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
