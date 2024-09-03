import React, { useCallback } from "react";
import logo from "../../assets/images/logo.png";
import Form from "../../shared/form";
import FormControl from "../../shared/form-control";
import CustomCheckBox from "../../shared/checkbox";
import Button from "../../shared/button";
import { useFormik } from "formik";
import { LoginSchema } from "../../assets/utils/validation";
import { RecaptchaVerifier, signInPhoneNumber } from "../../firebase";

const Login = () => {

  // Correctly initialize Recaptcha only once
  const captchaVerifier = (id,handleSubmit) => {
    window.recaptchaVerifier = new RecaptchaVerifier(id, {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                handleSubmit();
                console.log(response);
                console.log('recaptcha verified');
            },
            defaultCountry: 'IN'
        });
}
      

    const handleSendOTP = async(values) => {
        captchaVerifier('sign-in-button', handleSendOTP)
        const appVerifier = window.recaptchaVerifier;
        const otpSent = signInPhoneNumber('+91'+values.phoneNumber, appVerifier)
        console.log('OTP Sent', otpSent)
    }

    const { values, errors, handleSubmit, setValues } = useFormik({
        initialValues: {
            phoneNumber: null,
            keepSignIn: false
        },
        validationSchema: LoginSchema,
        onSubmit: async(values) => {
            handleSendOTP(values)
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values, [name] : value
        })
    }

  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="hidden col-span-12 md:col-span-7 bg-background md:flex items-center justify-center">
        <img className="w-4/5" src={logo} alt="logo" />
      </div>
      <div className="col-span-12 md:col-span-5">
        <Form handleSubmit={handleSubmit} className="w-full flex-col md:max-w-[480px] mx-auto p-4 md:p-8 h-full flex justify-center">
          <h1 className="font-medium text-2xl mb-1 text-text">
            Welcome Back!
          </h1>
          <p className="text-base font-normal text-text-secondary mb-8">
            Discover fun, colorful outfits that let kids be kids!
          </p>
          <FormControl
            isPhone
            placeholder="Enter Phone Number"
            type="number"
            label="Phone Number"
            error={errors.phoneNumber}
            {...{name: 'phoneNumber', value: values.phoneNumber, handleChange}}
          />
           <CustomCheckBox {...{name: 'keepSignIn', checked: values.keepSignIn, handleChange}}
            className="mt-4 mb-8"
            label="Keep me signed in"
          />
           <Button className="!w-full mb-1 !bg-pink !border-pink hover:border-yellow hover:bg-yellow transition-all duration-300 " type="submit">
            <span>Get OTP</span>
          </Button>
          <div id='sign-in-button'></div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
