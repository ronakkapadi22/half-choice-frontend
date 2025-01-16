import { ICONS } from "../icons";

export const ERROR_MESSAGES = {
  400: "Invalid request. Please try again.",
  401: "Please log in to continue.",
  403: "Access denied.",
  404: "The content does not exist.",
  408: "Request took too long. Try again.",
  422: "Invalid input. Please try again.",
  500: "Oops! Something went wrong. Try later.",
  502: "Connection issue. Try later.",
  503: "Service is down. Try later.",
  504: "Server took too long. Try again.",
  common: "Oops! Something went wrong. Try later.",
};

export const METHODS = {
  POST: "post",
  GET: "get",
  DELETE: "delete",
  PUT: "put",
  PATCH: "patch",
  HEAD: "head",
  OPTIONS: "options",
};

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
}

export const ADDRESS_TYPE = ['HOME', 'OFFICE', 'OTHERS']

export const CAROUSEL_LOADER = [1, 2, 3, 4]
export const PRODUCTS_LOADER = [1, 2, 3, 4, 5, 6, 7, 8]

export const IMAGE_PATH = 'https://admin.halfchoice.in/images/variant/'

export const CAT_IMAGE_PATH = 'https://admin.halfchoice.in/images/category/'

export const BANNER_PATH = 'https://admin.halfchoice.in/images/promotion/'

export const FEATURES = [
  {
    name: "Free Shipping",
    desc: "Free shipping on all orders",
    icon: ICONS.SHIPPING,
    color: 'text-[#8DC63F]'
  },
  {
    name: "Secure Payments",
    desc: "Your transactions, always protected",
    icon: ICONS.SHIELD,
    color: 'text-[#FF2189]'
  },
  {
    name: "Easy Returns",
    desc: "Hassle-free 30-day returns, No questions asked.",
    icon: ICONS.PEOPLE_BOX,
    color: 'text-[#FCB018]'
  },
  {
    name: "24/7 Support",
    desc: "Always here when you need us, day or night",
    icon: ICONS.USER_CLOCK,
    color: 'text-[#77b9b9]'
  },
];

export const ORDER_COLORS = {
  'PENDING': {
    bg: '#fff3cd',
    fill: '#856404'
  },
  CANCELLED: {
    bg: '#ffcdce',
    fill: '#ce2c31'
  },
  DELIVERED: {
    bg: '#d4edda',
    fill: '#155724'
  },
  CANCELLED_BY_COMPANY: {
    bg: '#ffcdce',
    fill: '#ce2c31'
  }
}


export const ORDER_STATUS = [
  {
    id: 1,
    label: 'All'
  },
  {
    id: 2,
    label: 'Pending'
  },
  {
    id: 3,
    label: 'Delivered'
  },
  {
    id: 4,
    label: 'Calcelled'
  }
]

export const PAYMENT_OPTIONS = [
  {
    id: 'card',
    icon: ICONS.CARD,
    label: 'Credit / Debit',
    className: 'col-span-12'
  },
  {
    id: 'net_banking',
    icon: ICONS.BANK,
    label: 'Net Banking',
    className: 'col-span-12 md:col-span-7'
  },
  {
    id: 'UPI',
    icon: ICONS.LINK,
    label: 'UPI',
    className: 'col-span-12 md:col-span-5'
  },
  {
    id: 'COD',
    icon: ICONS.CASH,
    label: 'Cash On Delivery',
    className: 'col-span-12'
  }
]

