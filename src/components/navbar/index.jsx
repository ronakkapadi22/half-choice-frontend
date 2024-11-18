import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import * as Menubar from "@radix-ui/react-menubar";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import { getCategories } from "../../redux/slices/category.slice";
import {
  getTitle,
  letterCutting,
  restructureCategories,
} from "../../assets/utils/helper";
import { CAT_IMAGE_PATH } from "../../assets/utils/constant";
import ProfileImage from "../../shared/avatar";

const NavBar = () => {
  const dispatch = useDispatch();
  const [fetchCategory] = useDispatchWithAbort(getCategories);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { user } = useSelector(({ auth }) => auth);
  const { data, isLoading } = useSelector(({ category }) => category);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory({});
  }, [fetchCategory]);

  const isUserLogged = useMemo(() => {
    return Boolean(user?.id);
  }, [user]);

  const categories = useMemo(() => {
    if (isLoading) return [];
    const clone = [...data];
    return restructureCategories(clone);
  }, [isLoading, data]);

  const handleAction = () => {
    dispatch(handleAuthInitial());
    clearDataFromLocal();
    setConfirm(false);
    setMobileMenuOpen(false);
  };


  const username = useMemo(() => {
    if (user.fname || user.lname) return `${user.fname} ${user.lname}`;
  }, [user]);

  const handleRedirect = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const products = [
    {
      description: "Explore a wide range of general clothing options",
    },
    {
      description: "Comfortable and stylish everyday clothing.",
    },
    {
      description: "Elegant outfits designed for special occasions",
    },
    {
      description: "Trendy and modern clothing inspired by Western styles",
    },
  ];

  return (
    <div className="w-full">
      <Discount discount="25% off with COD Available | Free Delivery" />
      <header className="bg-white">
        <nav
          aria-label="Global"
          className="flex items-center justify-between py-2 mx-auto max-w-7xl lg:px-4"
        >
          <div className="flex lg:flex-1">
            <div
              onClick={() => handleRedirect(PAGES.HOME.path)}
              className="p-1.5 cursor-pointer"
            >
              <span className="sr-only">Your Company</span>
              <img alt="logo" src={logo} className="w-auto h-8 md:h-14" />
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center rounded-lg p-1.5 bg-slate-200 text-text"
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
            {categories?.map((cat) => (
              <Popover key={cat?.id} className="relative">
                <PopoverButton className="flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1">
                  {cat?.name || ""}
                  <ICONS.CHEVRON_DOWN
                    aria-hidden="true"
                    className="flex-none w-5 h-5 text-gray-400"
                  />
                </PopoverButton>
                <PopoverPanel
                  transition
                  className="absolute -left-8 top-full z-[99] mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="p-4">
                    {cat?.sub?.map((item, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          handleRedirect(
                            `${PAGES.PRODUCTS.path}?cat_id=${item?.is_parent ? "" : cat?.id
                            }&sub_sub_cat_id=${item?.ids ? item?.ids?.join(",") : item?.id
                            }&name=${getTitle(item?.name)}`
                          )
                        }
                      >
                        <div className="relative cursor-pointer flex items-center p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-50">
                          <div className="flex items-center justify-center flex-none rounded-lg h-11 w-16 bg-gray-50 group-hover:bg-white">
                            <img
                              alt={item?.image}
                              src={CAT_IMAGE_PATH + item?.image}
                              aria-hidden="true"
                              className="w-full h-auto"
                            />
                          </div>
                          <div className="flex-auto">
                            <p
                              to={item.href}
                              className="block font-semibold text-gray-900"
                            >
                              {item.name}
                              <span className="absolute inset-0" />
                            </p>
                            <p className="mt-1 text-gray-600">
                              {products[i]?.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>
            ))}
            <Link
              to="/about"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              About Us
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
            {!isUserLogged ? (
              <ICONS.USER_PLUS
                onClick={() => handleRedirect(PAGES.LOGIN.path)}
                className="w-6 h-6 text-gray-600 cursor-pointer"
              />
            ) : (
              <div className="relative">
                <Menubar.Root>
                  <Menubar.Menu>
                    <Menubar.Trigger>
                      <ProfileImage name={letterCutting(username)} url={user?.profile || ''} />
                    </Menubar.Trigger>
                    <Menubar.Portal >
                      <Menubar.Content
                        align="end"
                        sideOffset={10}
                        className="flex w-40 flex-col items-center justify-center overflow-hidden rounded-md bg-white align-middle !z-[999999] !drop-shadow-lg"
                      >
                        <Menubar.Item className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 cursor-pointer hover:bg-gray-100 hover:outline-none">
                          Hello, <br /> {username || ""}
                        </Menubar.Item>
                        <div className="w-full divide-y h-[1px] bg-gray-100"></div>
                        <Menubar.Item
                          onClick={() => handleRedirect(PAGES.PROFILE.path)}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-left text-gray-700 cursor-pointer hover:bg-gray-100 hover:outline-none"
                        >
                          My Profile
                          <ICONS.USER className="w-5 h-5" />
                        </Menubar.Item>
                        <Menubar.Item
                          onClick={() => handleRedirect(PAGES.CART.path)}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-left text-gray-700 cursor-pointer hover:bg-gray-100 hover:outline-none"
                        >
                          My Cart
                          <ICONS.CART className="w-5 h-5" />
                        </Menubar.Item>
                        <div className="w-full divide-y h-[1px] bg-gray-100"></div>
                        <Menubar.Item
                          onClick={() => setConfirm(true)}
                          className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-left text-gray-700 cursor-pointer hover:bg-gray-100 hover:outline-none"
                        >
                          Sign out
                          <ICONS.LOGOUT className="w-5 h-5" />
                        </Menubar.Item>
                      </Menubar.Content>
                    </Menubar.Portal>
                  </Menubar.Menu>
                </Menubar.Root>
              </div>
            )}
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
                className="flex items-center justify-center rounded-lg p-1.5 bg-slate-200 text-text"
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
                  {categories?.map((item) => (
                    <Disclosure key={item?.id} as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        {item?.name || ""}
                        <ICONS.CHEVRON_DOWN
                          aria-hidden="true"
                          className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {item?.sub?.map((val) => (
                          <DisclosureButton
                            key={val?.name}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              handleRedirect(
                                `${PAGES.PRODUCTS.path}?cat_id=${item?.is_parent ? "" : item?.id
                                }&sub_sub_cat_id=${val?.ids ? val?.ids?.join(",") : val?.id
                                }&name=${getTitle(val?.name)}`
                              );
                            }}
                            as="p"
                            className="block cursor-pointer py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                          >
                            {val.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                  <Link
                    to={PAGES.ABOUT.path}
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
        <Confirmation
          handleAction={handleAction}
          actionLabel="Yes, Sign out"
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
