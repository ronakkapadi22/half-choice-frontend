import { jwtDecode } from "jwt-decode";

export const handleScrollToElement = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const isFunction = (fn) => fn === "function";

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

export const decodeToken = (token) => {
  if (!token) return null;
  return jwtDecode(token);
};

export const isTokenActivated = (token) => {
  if (!token) return false;
  const decoded = jwtDecode(token);
  return decoded?.exp > Date.now() / 1000;
};

export const generateRandomDigitNumber = () => {
  // Generate a random number between 1000000000000 and 9999999999999
  return Math.floor(Math.random() * 9000000000000) + 1000000000000;
}
