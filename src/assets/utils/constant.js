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

export const IMAGE_PATH = 'https://halfchoice.in/superadmin/public/images/variant/'

export const CAT_IMAGE_PATH = 'https://halfchoice.in/superadmin/public/images/category/'

export const BANNER_PATH = 'https://halfchoice.in/superadmin/public/images/promotion/'


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

