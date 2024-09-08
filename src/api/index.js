import { METHODS } from "../assets/utils/constant";
import client from "./client";

export const api = {
  auth: {
    otpVerify: ({ data, ...configs }) =>
      client({
        url: "/users/otplogin",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    register: ({ data, ...configs }) =>
      client({
        url: "/users/register",
        method: METHODS.POST,
        data,
        ...configs,
      }),
  },
  home: {
    getAll: ({ data, params, ...configs }) =>
      client({
        url: "/product/getHome",
        method: METHODS.GET,
        data,
        params,
        ...configs,
      }),
  },
  wishlists: {
    getAll: ({ data, params, ...configs }) =>
      client({
        url: "/product/getWishlist",
        method: METHODS.GET,
        data,
        params,
        ...configs,
      }),
    update: ({ data, ...configs }) =>
      client({
        url: "/product/addUpdateWishlist",
        method: METHODS.POST,
        data,
        ...configs,
      }),
  },
};
