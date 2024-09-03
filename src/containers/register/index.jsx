import React, { useCallback, useState } from "react";
import logo from "../../assets/images/logo.png";
import Form from "../../shared/form";
import FormControl from "../../shared/form-control";
import Button from "../../shared/button";
import CustomInput from "../../shared/input";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { classNames, isTokenActivated } from "../../assets/utils/helper";
import { PAGES } from "../../assets/utils/urls";
import { setDataFromLocal } from "../../assets/utils/local";
import { handleAuthSlice } from "../../redux/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { RegisterSchema } from "../../assets/utils/validation";
import Spinner from "../..";

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loader, setLoader] = useState(false);

  const { handleSubmit, values, errors, setValues } = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      phone: "",
      email: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await handleRegister(values)
    },
  });

  const handleRegister = async (data) => {
    setLoader(true)
    try {
        const response = await api.auth.register({ data: {
            ...data,
            login_type: 0,
            device_id: "d1",
            device_token: "testtoken",
            device_type: "mac"
        } })
        if(response?.data){
            setLoader(false)
            const { data } = response?.data
            setDataFromLocal('token', data?.authtoken)
            dispatch(handleAuthSlice({
                isLogged: isTokenActivated(data?.authtoken),
                uid: data?.id || null,
                token: data?.authtoken || null,
                user: { ...data, role: 'user' },
            }))
            navigate(PAGES.HOME.path)
        }
    } catch (error) {
        setLoader(false)
        console.log('error', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="hidden col-span-12 md:col-span-7 bg-background md:flex items-center justify-center">
        <img className="w-4/5" src={logo} alt="logo" />
      </div>
      <div className="col-span-12 md:col-span-5">
        <Form
          handleSubmit={handleSubmit}
          className="w-full flex-col md:max-w-[480px] mx-auto p-4 md:p-8 h-full flex justify-center"
        >
          <h1 className="font-medium text-2xl mb-1 text-text">Customer Information</h1>
          <p className="text-base font-normal text-text-secondary mb-8">
            Discover fun, colorful outfits that let kids be kids!
          </p>
          <div className="grid w-full grid-cols-12 gap-4 mb-4" >
          <FormControl className='col-span-12 md:col-span-6'
              placeholder="Enter First Name"
              type="text"
              label="First Name"
              error={errors.fname}
              {...{
                name: "fname",
                value: values.fname,
                handleChange,
              }}
            />
          <FormControl className='col-span-12 md:col-span-6'
              placeholder="Enter Last Name"
              type="text"
              label="Last Name"
              error={errors.lname}
              {...{
                name: "lname",
                value: values.lname,
                handleChange,
              }}
            />
          </div>
          <FormControl className='mb-4'
              isPhone
              placeholder="Enter Phone Number"
              type="number"
              label="Phone Number"
              error={errors.phone}
              {...{
                name: "phone",
                value: values.phone,
                handleChange,
              }}
            />
          <FormControl className='mb-4'
              placeholder="Enter Email"
              type="email"
              label="Email"
              error={errors.email}
              {...{
                name: "email",
                value: values.email,
                handleChange,
              }}
            />
            <Button
              disabled={loader}
              className={classNames(
                "!w-full mb-1 mt-8 flex items-center justify-center !bg-pink !border-pink hover:border-yellow hover:bg-yellow transition-all duration-300",
                loader ? "cursor-not-allowed" : ""
              )}
              type="submit"
            >
              <span>{!loader ? "Submit" : "Loading"}</span>
              {loader ? <Spinner className="ml-1 !w-4 !h-4" /> : null}
            </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
