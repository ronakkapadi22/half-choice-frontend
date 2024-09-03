import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

Yup.addMethod(Yup.string, "phone", function (message) {
  return this.test("phone", message, function (value) {
    const { path, createError } = this;
    // Attempt to parse the phone number
    const phoneNumber = parsePhoneNumberFromString(value, "IN"); // Replace 'US' with your default country code if needed
    // Check if the parsed phone number is valid
    if (!phoneNumber || !phoneNumber.isValid()) {
      return createError({ path, message: message || "Invalid phone number" });
    }
    return true;
  });
});

export const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .phone("Invalid phone number")
    .required("Phone number is required"),
});

export const RegisterSchema = Yup.object().shape({
  fname: Yup.string()
    .required("First name is required")
    .matches(/^[A-Za-z]+$/, "First name should only contain letters")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),

  lname: Yup.string()
    .required("Last name is required")
    .matches(/^[A-Za-z]+$/, "Last name should only contain letters")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  phone: Yup.string()
    .phone("Invalid phone number")
    .required("Phone number is required"),
});
