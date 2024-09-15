import * as Yup from "Yup";
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

export const CancelReasonSchema = Yup.object().shape({
  reason: Yup
    .string()
    .required('Reason is required')
})

export const AddressSchema = Yup.object().shape({
  address_line_1: Yup
    .string()
    .required('Block / House / Building is required')
    .max(100, 'Block / House / Building cannot exceed 100 characters'),
  address_line_2: Yup
    .string()
    .required('Road / Area colony is required')
    .max(100, 'Road / Area colony cannot exceed 100 characters'),
  address_type: Yup
    .string()
    .oneOf(['HOME', 'OFFICE', 'OTHERS'], 'Invalid address type')
    .required('Address type is required'),
  city: Yup
    .string()
    .required('City is required')
    .max(50, 'City cannot exceed 50 characters'),
  full_name: Yup
    .string()
    .required('Full name is required')
    .max(100, 'Full name cannot exceed 100 characters'),
  phone: Yup.string()
    .phone("Invalid phone number")
    .required("Phone number is required"),
  pincode: Yup
    .string()
    .required('Pincode is required')
    .matches(/^[0-9]{6}$/, 'Invalid Pincode'),
  state: Yup
    .string()
    .required('State is required')
    .max(50, 'State cannot exceed 50 characters'),
});

