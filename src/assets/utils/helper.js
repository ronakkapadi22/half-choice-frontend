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
};

export const convertOrderStatus = (inputString = "") => {
  const words = inputString.split("_");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const convertedString = capitalizedWords.join(" ");
  return convertedString;
};

export const debounce = (callback, wait) => {
  // initialize the timer
  let timer;
  const debouncedFunc = () => {
    // checking whether the waiting time has passed
    if (shouldCallCallback(Date.now())) {
      callback();
    } else {
      // if time hasn't passed yet, restart the timer
      timer = startTimer(callback);
    }
  };

  return debouncedFunc;
};

const handleItems = (data = []) => {
  if (!data || !data.length) return [];
  const groupedMap = new Map();
  const clone = [...data];
  clone.forEach((item) => {
    if (!groupedMap?.has(item?.name)) {
      groupedMap?.set(item?.name, {
        ids: [],
        name: item?.name,
        image: item?.image,
      });
    }
    groupedMap?.get(item?.name)?.ids?.push(item?.id);
  });

  return Array.from(groupedMap.values());
};

export const isEmptyObject = (obj) => {
  if (!obj) return true;
  return Object.getOwnPropertyNames(obj).length === 0;
};

export const restructureCategories = (data) => {
  // Helper function to remove "- boys" from names
  const cleanName = (name) => name.replace(/\s*-\s*boys$/i, "");

  // Function to create a category object
  const createCategory = (category) => ({
    id: category.id,
    is_parent: category?.is_parent,
    name: cleanName(category.name),
    image: category?.image,
    sub: [],
  });

  // Find the root category (Kids), Boys, and Girls categories
  const rootCategory = data.find((category) => category.is_parent === 0);
  const boysCategory = data.find((category) => category.name === "Boys");
  const girlsCategory = data.find((category) => category.name === "Girls");

  if (!rootCategory || !boysCategory || !girlsCategory) {
    return [];
  }

  const result = [
    createCategory(rootCategory),
    createCategory(boysCategory),
    createCategory(girlsCategory),
  ];

  // Helper function to add subcategories
  const addSubcategories = (parentId, targetArray) => {
    data
      .filter((category) => category.is_parent === parentId)
      .forEach((subCategory) => {
        targetArray.push({
          id: subCategory.id,
          is_parent: subCategory?.is_parent,
          name: cleanName(subCategory.name),
          image: subCategory?.image || "",
        });
      });
  };

  // Add all subcategories to the root (Kids) category
  addSubcategories(boysCategory.id, result[0].sub);
  addSubcategories(girlsCategory.id, result[0].sub);

  // Add Boys subcategories
  addSubcategories(boysCategory.id, result[1].sub);

  // Add Girls subcategories
  addSubcategories(girlsCategory.id, result[2].sub);

  return result?.map((item) => ({
    ...item,
    sub: item?.is_parent ? item?.sub : handleItems(item?.sub || []),
  }));
};

export const letterCutting = (name = "") => {
  const nameArray = name?.split(" ");
  const initials = nameArray.map((name) => name?.[0]?.toUpperCase());
  return initials.join("");
};

export const totalPages = (totalCount, pageLimit) => {
  return Math.ceil(totalCount / pageLimit);
};

export const getCurrentPage = (offset, pageLimit) => {
  return Math.ceil(offset / pageLimit);
};

export const getTitle = (str = "") => {
  if (!str) return "";
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single one
    .trim(); // Remove leading or trailing hyphens
};
