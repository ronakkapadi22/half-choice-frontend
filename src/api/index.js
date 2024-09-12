import axios from "axios";
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
  product: {
    get: ({ data, params, ...configs }) =>
      client({
        url: "/product/getProductDetails",
        method: METHODS.GET,
        data,
        params,
        ...configs,
      }),
  },
  cart: {
    getAll: ({ data, params, ...configs }) =>
      client({
        url: "/cart/getCart",
        method: METHODS.GET,
        data,
        params,
        ...configs,
      }),
    update: ({ data, ...configs }) =>
      client({
        url: "/cart/addTocart",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    delete: ({ data, ...configs }) =>
      client({
        url: '/cart/removeCart',
        method: METHODS.DELETE,
        data,
        ...configs,
      })
  },
  address: {
    getAll: ({ data, params, ...configs }) =>
      client({
        url: "/users/address",
        method: METHODS.GET,
        data,
        params,
        ...configs,
      }),
    update: ({ data, ...configs }) =>
      client({
        url: "/users/addEditAddress",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    default: ({ data, ...configs }) =>
      client({
        url: "/users/defaultAddress",
        method: METHODS.POST,
        data,
        ...configs,
      })
  },
  orders: {
    add: ({ data, ...configs }) =>
      client({
        url: '/orders/addOrder',
        method: METHODS.POST,
        data,
        ...configs
      })
  }
};


export const shiprocket = {
  auth: async () => {
    try {
      const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
        email: 'sujanbarochiya@gmail.com',
        password: 'Sujan@2023'
      })
      return await response.data
    } catch (error) {
      console.log('error', error)
    }
  },
  estimate: async ({ pin, token }) => {
    try {
      const response = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/serviceability?cod=1&delivery_postcode=${pin}&pickup_postcode=382470&weight=1`, {
        headers: {
          Authorization: 'Bearer' + token
        }
      })
      return await response.data
    } catch (error) {
      console.log('error', error)
    }
  }
}
