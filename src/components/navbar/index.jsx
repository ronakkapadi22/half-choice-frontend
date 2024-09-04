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
