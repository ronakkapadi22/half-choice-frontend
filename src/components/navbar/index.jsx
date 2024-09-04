<<<<<<< HEAD
import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import fashion from "../../assets/images/fashion.webp";
import "../../styles/header.css";
import "../../styles/responsive.css";
import { Link } from "react-router-dom";
import { classNames } from "../../assets/utils/helper";
import { RxCaretDown, RxCaretRight } from "react-icons/rx";
import { IoCart } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Button from "../../shared/button";
import { FaArrowRightLong } from "react-icons/fa6";

const Navbar = ({ className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={classNames("header01", className)}>
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-12">
          <div className="col-span-12">
            <div className="headerInner01">
              <div className="logo">
                <Link href="">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="">
                <div
                  className={classNames(
                    "mainMenu",
                    isOpen ? "!block" : "inline-flex"
                  )}
                >
                  <ul>
                    <li className="menu-item-has-children">
                      <Link href="">Home</Link>
                    </li>
                    <li>
                      <Link href="">About us</Link>
                    </li>
                    <li>
                      <Link href="">What we do</Link>
                    </li>
                    <li>
                      <Link href="">Features</Link>
                    </li>
                    <li>
                      <Link href="">Blogs</Link>
                    </li>

                    {/* <li className="menu-item-has-children">
                    <div className="flex items-center">
                      <Link href="">Shop</Link>
                      <RxCaretDown className="w-5 h-5 ml-1" />
                    </div>
                    <div className="megaMenu !p-0 z-20">
                      <div className="grid w-full grid-cols-12">
                        <div className="col-span-12 pb-4 pl-2 lg:col-span-4 pt-7">
                          <h3>List Pages</h3>
                          <ul>
                            <li>
                              <Link href="">Shop Left Sidebar</Link>
                            </li>
                            <li>
                              <Link href="">Shop Full Width</Link>
                            </li>
                            <li>
                              <Link href="">Shop Right Sidebar</Link>
                            </li>
                            <li>
                              <Link href="">Collections</Link>
                            </li>
                            <li>
                              <Link href="">Collection List</Link>
                            </li>
                          </ul>
                        </div>
                        <div className="col-span-12 pb-4 lg:col-span-4 pt-7">
                          <h3>Details &amp; Utility</h3>
                          <ul>
                            <li>
                              <a href="shop_details1.html">Shop Details 01</a>
                            </li>
                            <li>
                              <a href="shop_details2.html">Shop Details 02</a>
                            </li>
                            <li>
                              <a href="cart.html">Shopping Cart</a>
                            </li>
                            <li>
                              <a href="checkout.html">Checkout</a>
                            </li>
                            <li>
                              <a href="wishlist.html">Wishlist</a>
                            </li>
                          </ul>
                        </div>
                        <div className="col-span-12 lg:col-span-4 hideOnMobile">
                          <div className="bg-[#ecf5f4] overflow-hidden w-full relative !h-full rounded-r-[10px]">
                            <div className="w-full lbContent !pl-5">
                              <h3>Be Stylish</h3>
                              <h2>Girl’s Latest Fashion</h2>
                              <Link href="" className="ulinaLink">
                                <i className="fa-solid fa-angle-right"></i>Shop
                                Now
                              </Link>
                            </div>
                            <div className="w-full h-full">
                              <img
                                width={110}
                                height={180}
                                className="absolute z-[4] right-0 bottom-0"
                                src={fashion}
                                alt="Mans Latest Collection"
                              />
                              <div className="absolute w-[200px] -right-[70px] z-[3] -bottom-[70px] h-[200px] rounded-full bg-[#ddecea]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                    {/* <li className="menu-item-has-children">
                    <div className="flex items-center">
                      <Link href="">Pages</Link>
                      <RxCaretDown className="w-5 h-5 ml-1" />
                    </div>
                    <ul>
                      <li>
                        <a href="team.html">Team</a>
                      </li>
                      <li>
                        <a href="faq.html">FAQ's</a>
                      </li>
                      <li>
                        <a href="testimonial.html">Testimonial</a>
                      </li>
                      <li>
                        <a href="404.html">Error 404</a>
                      </li>
                    </ul>
                  </li> */}
                    {/* <li className="menu-item-has-children">
                    <div className="flex items-center">
                      <Link href="">Blog</Link>
                      <RxCaretDown className="w-5 h-5 ml-1" />
                    </div>
                    <ul>
                      <li className="menu-item-has-children">
                        <div className="flex items-center justify-between">
                          <Link href="">Blog Standard</Link>
                          <RxCaretRight className="w-5 h-5" />
                        </div>
                        <ul>
                          <li>
                            <Link href="">Left Sidebar</Link>
                          </li>
                          <li>
                            <Link href="">No Sidebar</Link>
                          </li>
                          <li>
                            <Link href="">Right Sidebar</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <div className="flex items-center justify-between">
                          <Link href="">Blog Grid</Link>
                          <RxCaretRight className="w-5 h-5" />
                        </div>
                        <ul>
                          <li>
                            <Link href="">Left Sidebar</Link>
                          </li>
                          <li>
                            <Link href="">No Sidebar</Link>
                          </li>
                          <li>
                            <Link href="">Right Sidebar</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <div className="flex items-center justify-between">
                          <Link href="">Blog Details</Link>
                          <RxCaretRight className="w-5 h-5" />
                        </div>
                        <ul>
                          <li>
                            <Link href="">Left Sidebar</Link>
                          </li>
                          <li>
                            <Link href="">No Sidebar</Link>
                          </li>
                          <li>
                            <Link href="">Right Sidebar</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li> */}
                  </ul>
                </div>
                <div className={classNames("accessNav")}>
                  <span
                    className={classNames(
                      "menuToggler cursor-pointer",
                      isOpen ? "active" : ""
                    )}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <FaBars className="mr-1" />
                    <span>Menu</span>
                  </span>
                  <div className="hideOnMobile">
                    <Button className="ulinaBTN right-[39px] !rounded-[30px]  after:!bg-[#ff2189] !py-0 !h-[40px]">
                      <span>
                        Get in Touch{" "}
                        <FaArrowRightLong className="inline-block ml-1" />
                      </span>
                    </Button>
                  </div>
                  {/* <div className="anItems">
                  <div className="anUser">
                    <span>
                      <FaUser />
                    </span>
                  </div>
                  <div className="anCart">
                    <p>
                      <IoCart />
                      <span>3</span>
                    </p>
                    <div className="cartWidgetArea">
                      <div className="cartWidgetProduct">
                        <img src="images/cart/1.jpg" alt="Marine Design" />
                        <a href="shop_details1.html">
                          Ulina luxurious bag for men women
                        </a>
                        <div className="clearfix cartProductPrice">
                          <span className="price">
                            <span>
                              <span>$</span>19.00
                            </span>
                          </span>
                        </div>
                        <a
                          href="javascript:void(0);"
                          className="cartRemoveProducts !flex items-center justify-center"
                        >
                          <HiMiniXMark className="text-[15px]" />
                        </a>
                      </div>
                      <div className="cartWidgetProduct">
                        <img src="images/cart/2.jpg" alt="Draped Neck" />
                        <a href="shop_details2.html">
                          Nasio stainless steel watch
                        </a>
                        <div className="clearfix cartProductPrice">
                          <span className="price">
                            <span>
                              <span>$</span>41.00
                            </span>
                          </span>
                        </div>
                        <a
                          href="javascript:void(0);"
                          className="cartRemoveProducts !flex items-center justify-center"
                        >
                          <HiMiniXMark className="text-[15px]" />
                        </a>
                      </div>
                      <div className="cartWidgetProduct">
                        <img src="images/cart/3.jpg" alt="Long Pleated" />
                        <a href="shop_details1.html">
                          Winner men’s comfortable t-shirt
                        </a>
                        <div className="clearfix cartProductPrice">
                          <span className="price">
                            <span>
                              <span>$</span>52.00
                            </span>
                          </span>
                        </div>
                        <a
                          href="javascript:void(0);"
                          className="cartRemoveProducts !flex items-center justify-center"
                        >
                          <HiMiniXMark className="text-[15px]" />
                        </a>
                      </div>
                      <div className="totalPrice">
                        Subtotal:{" "}
                        <span className="price">
                          <span>
                            <span>$</span>112.00
                          </span>
                        </span>
                      </div>
                      <div className="clearfix cartWidgetBTN">
                        <a className="cart" href="cart.html">
                          View Cart
                        </a>
                        <a className="checkout" href="checkout.html">
                          Checkout
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
=======
import React, { useCallback, useMemo, useState } from "react";
import Discount from "../discount";
import { Link, useNavigate } from "react-router-dom";
import { PAGES } from "../../assets/utils/urls";
import logo from "../../assets/images/logo.png";
import { ICONS } from "../../assets/icons";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../shared/button";
import Confirmation from "../../shared/confirmation";
import { handleAuthInitial } from "../../redux/slices/auth.slice";
import { clearDataFromLocal } from "../../assets/utils/local";
import * as Menubar from '@radix-ui/react-menubar';

const NavBar = () => {

  const dispatch = useDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { user } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();

  const isUserLogged = useMemo(() => {
    return Boolean(user?.id);
  }, [user]);

  const handleAction = () => {
    dispatch(handleAuthInitial())
    clearDataFromLocal()
    setConfirm(false)
    setMobileMenuOpen(false)
  }

  
  const username = useMemo(() => {
    if(user.fname || user.lname) return `${user.fname} ${user.lname}`
  }, [user])

  console.log('user', username)

  const handleRedirect = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const products = [
    {
      name: "Apparel",
      description: "Explore a wide range of general clothing options",
      href: "#",
      icon: ICONS.DISCOUNT,
    },
    {
      name: "Casual Wear",
      description: "Comfortable and stylish everyday clothing.",
      href: "#",
      icon: ICONS.DISCOUNT,
    },
    {
      name: "Party Wear",
      description: "Elegant outfits designed for special occasions",
      href: "#",
      icon: ICONS.DISCOUNT,
    },
    {
      name: "Western Wear",
      description: "Trendy and modern clothing inspired by Western styles",
      href: "#",
      icon: ICONS.DISCOUNT,
    },
  ];

  return (
    <div className="w-full">
      <Discount discount="25% off with COD Available | Free Delivery" />
      <header className="bg-white">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-4"
        >
          <div className="flex lg:flex-1">
            <div
              onClick={() => handleRedirect(PAGES.HOME.path)}
              className="p-1.5"
            >
              <span className="sr-only">Your Company</span>
              <img alt="logo" src={logo} className="h-8 md:h-14 w-auto" />
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-lg p-1.5 bg-slate-200 text-text"
            >
              <span className="sr-only">Open main menu</span>
              <ICONS.MENU aria-hidden="true" className="h-6 w-6 text-text" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-8">
            <Link
              to="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Home
            </Link>
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                All
                <ICONS.CHEVRON_DOWN
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div key={item.name}>
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            to={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Boys
                <ICONS.CHEVRON_DOWN
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div key={item.name}>
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            to={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Girls
                <ICONS.CHEVRON_DOWN
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div key={item.name}>
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            to={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <Link
              to="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              About Us
            </Link>
            <Link
              to="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Orders
            </Link>
            <Link
              to="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Blogs
            </Link>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 items-center lg:justify-end">
            <ICONS.SEARCH
              onClick={() => handleRedirect(PAGES.SEARCH.path)}
              className="w-6 h-6 text-gray-600 cursor-pointer"
            />
            <div className="w-[1px] h-5 bg-gray-400 mx-2"></div>
            {!isUserLogged ? <ICONS.USER_PLUS
              onClick={() => handleRedirect(PAGES.LOGIN.path)}
              className="w-6 h-6 text-gray-600 cursor-pointer"
            /> : <div className="relative" >
              <Menubar.Root>
                <Menubar.Menu>
                    <Menubar.Trigger>
                        <ICONS.USER className="w-6 h-6 text-gray-600 cursor-pointer" />
                    </Menubar.Trigger>
                    <Menubar.Portal>
                      <Menubar.Content align="end"
            sideOffset={10} className="flex w-40 flex-col items-center justify-center overflow-hidden rounded-md bg-white align-middle !drop-shadow-lg" >
                          <Menubar.Item className="w-full cursor-pointer px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 hover:outline-none" >{username || ''}</Menubar.Item>
                          <div className="w-full divide-y h-[1px] bg-gray-100" ></div>
                          <Menubar.Item onClick={() => setConfirm(true)} className="w-full cursor-pointer px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 hover:outline-none" >Sign out</Menubar.Item>
                      </Menubar.Content>
                    </Menubar.Portal>
                </Menubar.Menu>
              </Menubar.Root>
              </div>}
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <div
                onClick={() => handleRedirect(PAGES.HOME.path)}
                className="p-1.5"
              >
                <span className="sr-only">Your Company</span>
                <img alt="logo" src={logo} className="h-8 md:h-10 w-auto" />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-lg p-1.5 bg-slate-200 text-text"
              >
                <span className="sr-only">Open main menu</span>
                <ICONS.CLOSE aria-hidden="true" className="h-6 w-6 text-text" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to={PAGES.HOME.path}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      All
                      <ICONS.CHEVRON_DOWN
                        aria-hidden="true"
                        className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {[...products].map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Boys
                      <ICONS.CHEVRON_DOWN
                        aria-hidden="true"
                        className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {[...products].map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Girls
                      <ICONS.CHEVRON_DOWN
                        aria-hidden="true"
                        className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {[...products].map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <Link
                    to={PAGES.HOME.path}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    About Us
                  </Link>
                  <Link
                    to={PAGES.HOME.path}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Orders
                  </Link>
                  <Link
                    to={PAGES.HOME.path}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Blogs
                  </Link>
                </div>
                <div className="py-6">
                  {!isUserLogged ? (
                    <Link
                      to={PAGES.LOGIN.path}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  ) : (
                    <Button
                      handleClick={() => setConfirm(true)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 !border-none !bg-transparent !text-gray-900 hover:bg-gray-50"
                      label="Log out"
                    />
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
        <Confirmation handleAction={handleAction}
          actionLabel='Sign out'
          title="Sign Out"
          description="Are you sure you want to sign out of your account?"
          open={confirm}
          setOpen={setConfirm}
        />
      </header>
    </div>
  );
};

export default NavBar;
>>>>>>> 26b7274abe08c8808ba0e85b3aec95c0801d2909
