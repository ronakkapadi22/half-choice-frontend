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
    .phone('Invalid phone number')
    .required('Phone number is required'),
})
