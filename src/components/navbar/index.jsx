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
          className="flex items-center justify-between p-4 mx-auto max-w-7xl lg:px-4"
        >
          <div className="flex lg:flex-1">
            <div
              onClick={() => handleRedirect(PAGES.HOME.path)}
              className="p-1.5"
            >
              <span className="sr-only">Your Company</span>
              <img alt="logo" src={logo} className="w-auto h-8 md:h-14" />
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-lg p-1.5 bg-slate-200 text-text"
            >
              <span className="sr-only">Open main menu</span>
              <ICONS.MENU aria-hidden="true" className="w-6 h-6 text-text" />
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
              <PopoverButton className="flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1">
                All
                <ICONS.CHEVRON_DOWN
                  aria-hidden="true"
                  className="flex-none w-5 h-5 text-gray-400"
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
                        className="relative flex items-center p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-center flex-none rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                          <item.icon
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
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
              <PopoverButton className="flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1">
                Boys
                <ICONS.CHEVRON_DOWN
                  aria-hidden="true"
                  className="flex-none w-5 h-5 text-gray-400"
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
                        className="relative flex items-center p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-center flex-none rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                          <item.icon
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
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
              <PopoverButton className="flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1">
                Girls
                <ICONS.CHEVRON_DOWN
                  aria-hidden="true"
                  className="flex-none w-5 h-5 text-gray-400"
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
                        className="relative flex items-center p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-center flex-none rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                          <item.icon
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
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
          <div className="items-center hidden lg:flex lg:flex-1 lg:justify-end">
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
                          <Menubar.Item className="w-full px-4 py-2 text-sm font-medium text-center text-gray-700 cursor-pointer hover:bg-gray-100 hover:outline-none" >{username || ''}</Menubar.Item>
                          <div className="w-full divide-y h-[1px] bg-gray-100" ></div>
                          <Menubar.Item onClick={() => setConfirm(true)} className="w-full px-4 py-2 text-sm font-medium text-center text-gray-700 cursor-pointer hover:bg-gray-100 hover:outline-none" >Sign out</Menubar.Item>
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
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <div
                onClick={() => handleRedirect(PAGES.HOME.path)}
                className="p-1.5"
              >
                <span className="sr-only">Your Company</span>
                <img alt="logo" src={logo} className="w-auto h-8 md:h-10" />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-lg p-1.5 bg-slate-200 text-text"
              >
                <span className="sr-only">Open main menu</span>
                <ICONS.CLOSE aria-hidden="true" className="w-6 h-6 text-text" />
              </button>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-2">
                  <Link
                    to={PAGES.HOME.path}
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
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
                          className="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
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
                          className="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
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
                          className="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <Link
                    to={PAGES.HOME.path}
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    About Us
                  </Link>
                  <Link
                    to={PAGES.HOME.path}
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    Orders
                  </Link>
                  <Link
                    to={PAGES.HOME.path}
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
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
          actionLabel='Yes, Sign out'
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
