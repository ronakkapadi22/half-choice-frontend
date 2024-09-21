import React, { useState } from "react";
import OtpInput from "react-otp-input";
import logo from "../../assets/images/logo.png";
import Form from "../../shared/form";
import FormControl from "../../shared/form-control";
import CustomCheckBox from "../../shared/checkbox";
import Button from "../../shared/button";
import { useFormik } from "formik";
import { LoginSchema } from "../../assets/utils/validation";
import { RecaptchaVerifier, signInWithPhoneNumber, auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthUI } from "../../redux/slices/common.slice";
import { classNames, isTokenActivated } from "../../assets/utils/helper";
import Spinner from "../..";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../assets/utils/urls";
import { handleAuthSlice } from "../../redux/slices/auth.slice";
import { setDataFromLocal } from "../../assets/utils/local";

const Login = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);

  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const common = useSelector(({ common }) => common);

  // Function to set up reCAPTCHA
  const setUpRecaptcha = () => {
    // Check if reCAPTCHA is already set up; if not, set it up
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container", // The ID of the container where reCAPTCHA will render
        {
          size: "invisible", // Options: 'invisible' or 'normal'
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired, please try again.");
          },
        },
        auth
      );
    } else {
      // If reCAPTCHA verifier exists, reset it before reusing
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier.render().then((widgetId) => {
        grecaptcha.reset(widgetId);
      });
    }
  };

  const handleSendOTP = () => {
    setLoader(true);
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+91" + values.phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        if (confirmationResult?.verificationId) {
          setLoader(false);
          dispatch(handleAuthUI("otp_screen"));
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log("error", error);
      });
  };

  const { values, errors, handleSubmit, setValues } = useFormik({
    initialValues: {
      phoneNumber: "",
      keepSignIn: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      handleSendOTP();
    },
  });

  const resendOtp = () => {
    const phoneNumber = "+91" + values.phoneNumber;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        if (confirmationResult?.verificationId) {
          console.log("OTP Resend", confirmationResult);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetchUserExistOrNot = async (uid) => {
    setLoader(true);
    try {
      const response = await api.auth.otpVerify({
        data: {
          phone: values.phoneNumber,
          device_id: uid || "",
          device_token: uid || "",
          device_type: "web",
        },
      });
      if (response?.data) {
        const { data } = response?.data;
        setLoader(false);
        if (!data?.isUserExist) {
          navigate(PAGES.REGISTER.path);
          return;
        }
        dispatch(
          handleAuthSlice({
            isLogged: isTokenActivated(data?.authtoken),
            uid: uid || "",
            token: data?.authtoken || "",
            user: { ...data, role: "user" },
          })
        );
        setDataFromLocal("token", data?.authtoken);
        navigate(PAGES.HOME.path);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError(true);
      return;
    }
    setLoader(true);
    setOtpError(false);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        if (user?.uid) {
          fetchUserExistOrNot(user?.uid);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoader(false);
      });
  };

  const handleFormProvider = (key) => {
    switch (key) {
      case "login":
        return (
          <Form
            handleSubmit={handleSubmit}
            className="w-full flex-col md:max-w-[480px] mx-auto p-4 md:p-8 h-full flex justify-center"
          >
            <h1 className="mb-1 text-2xl font-medium text-text">
              Welcome Back!
            </h1>
            <p className="mb-8 text-base font-normal text-text-secondary">
              Discover fun, colorful outfits that let kids be kids!
            </p>
            <FormControl
              isPhone
              placeholder="Enter Phone Number"
              type="number"
              label="Phone Number"
              error={errors.phoneNumber}
              {...{
                name: "phoneNumber",
                value: values.phoneNumber,
                handleChange,
              }}
            />
            <CustomCheckBox
              {...{
                name: "keepSignIn",
                checked: values.keepSignIn,
                handleChange,
              }}
              className="mt-4 mb-8"
              label="Keep me signed in"
            />
            <Button
              disabled={loader}
              className={classNames(
                "!w-full mb-1 flex items-center justify-center !bg-pink !border-pink hover:border-yellow hover:bg-yellow transition-all duration-300",
                loader ? "cursor-not-allowed" : ""
              )}
              type="submit"
            >
              <span>{!loader ? "Get OTP" : "Loading"}</span>
              {loader ? <Spinner className="ml-1 !w-4 !h-4" /> : null}
            </Button>
          </Form>
        );
      case "otp_screen":
        return (
          <Form
            className="w-full flex-col md:max-w-[480px] mx-auto p-4 md:p-8 h-full flex justify-center"
            {...{ handleSubmit: handleOTPSubmit }}
          >
            <h1 className="mb-1 text-2xl font-medium text-text">
              OTP Verification
            </h1>
            <p className="mb-8 text-base font-normal text-text-secondary">
              Enter the code from the sms we sent to{" "}
              {"+91" + values.phoneNumber}
            </p>
            <div className="w-full my-2">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                containerStyle="w-full flex justify-between items-center my-4 last:!mr-0"
                inputType="number"
                inputStyle={classNames(
                  "!border !rounded-xl outline-none !w-auto max-w-[64px] focus:border-green md:max-w-[52px] h-[64px] md:!h-[52px] !p-1",
                  otpError ? "!border-red-500" : ""
                )}
                renderInput={(props) => (
                  <input type="number" id="otp" {...props} />
                )}
              />
            </div>
            <Button
              disabled={loader}
              className={classNames(
                "!w-full mb-1 flex items-center justify-center !bg-pink !border-pink hover:border-yellow hover:bg-yellow transition-all duration-300",
                loader ? "cursor-not-allowed" : ""
              )}
              type="submit"
            >
              <span>{!loader ? "Submit" : "Loading"}</span>
              {loader ? <Spinner className="ml-1 !w-4 !h-4" /> : null}
            </Button>
            <div className="flex items-center justify-center w-full">
              <p className="my-1 mb-8 text-base font-normal text-text">
                I didn't receive any code.{" "}
                <span
                  className="font-medium cursor-pointer"
                  onClick={resendOtp}
                >
                  Resend
                </span>
              </p>
            </div>
          </Form>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="grid w-full h-full grid-cols-12">
      <div className="items-center justify-center hidden col-span-12 md:col-span-7 bg-background md:flex">
        <img className="w-4/5" src={logo} alt="logo" />
      </div>
      <div className="col-span-12 md:col-span-5">
        {handleFormProvider(common.ui_key)}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login;
