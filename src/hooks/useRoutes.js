import { useCallback, useMemo } from "react";
import { PAGES } from "../assets/utils/urls";
import Register from "../containers/register";
import Home from "../containers/home";
import About from "../containers/about";
import ContactUs from "../containers/contact-us";
import PrivacyPolicy from "../containers/privacy-policy";
import Products from "../containers/products";
import ProductDetails from "../containers/products/product-details";
import Wishlists from "../containers/wishlists";
import { ROLES } from "../assets/utils/constant";
import Orders from "../containers/orders";
import Cart from "../containers/cart";
import OrderDetails from "../containers/orders/order-details";
import Checkout from "../containers/checkout";
import { useSelector } from "react-redux";
import Login from "../containers/login";

const useRoutes = () => {
  const { role } = useSelector(({ auth }) => auth?.user);

  const routes = useMemo(
    () => [
      {
        ...PAGES.LOGIN,
        element: Login,
        isAuth: true,
      },
      {
        ...PAGES.REGISTER,
        element: Register,
        isAuth: true,
      },
      {
        ...PAGES.HOME,
        element: Home,
        isPublic: true,
      },
      {
        ...PAGES.ABOUT,
        element: About,
        isPublic: true,
      },
      {
        ...PAGES.CONTACT_US,
        element: ContactUs,
        isPublic: true,
      },
      {
        ...PAGES.PRIVACY_POLICY,
        element: PrivacyPolicy,
        isPublic: true,
      },
      {
        ...PAGES.PRODUCTS,
        element: Products,
        isPublic: true,
      },
      {
        path: PAGES.PRODUCTS.path + "/:id",
        name: "Product Details",
        element: ProductDetails,
        isPublic: true,
      },
      {
        ...PAGES.WISHLISTS,
        element: Wishlists,
        isPrivate: true,
        roles: [ROLES.USER, ROLES.ADMIN],
      },
      {
        ...PAGES.ORDERS,
        element: Orders,
        isPrivate: true,
        roles: [ROLES.USER, ROLES.ADMIN],
      },
      {
        path: PAGES.ORDERS.path + "/:id",
        name: "Order Details",
        element: OrderDetails,
        isPrivate: true,
        roles: [ROLES.USER, ROLES.ADMIN],
      },
      {
        ...PAGES.CART,
        element: Cart,
        isPrivate: true,
        roles: [ROLES.USER],
      },
      {
        ...PAGES.CHECKOUT,
        element: Checkout,
        isPrivate: true,
        roles: [ROLES.USER],
      },
    ],
    []
  );

  const isAccessible = useCallback((data = [], currentRole) => {
    return data.map((value) => value === currentRole).some((val) => val);
  }, []);

  const authRoutes = useMemo(() => {
    return routes.filter((val) => val?.isAuth);
  }, [routes]);

  const publicRoutes = useMemo(() => {
    return routes.filter((val) => val?.isPublic);
  }, [routes]);

  const privateRoutes = useMemo(() => {
    return routes.filter(
      (val) => val?.isPrivate && isAccessible(val.roles, role)
    );
  }, [role, isAccessible, routes]);

  return {
    routes,
    authRoutes,
    privateRoutes,
    publicRoutes,
  };
};

export default useRoutes;
