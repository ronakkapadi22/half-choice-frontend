import React from "react";
import logo from "../../assets/images/logo.png";

const Register = () => {
  return (
    <div className="grid w-full h-full grid-cols-12">
      <div className="items-center justify-center hidden col-span-12 md:col-span-7 bg-background md:flex">
        <img className="w-4/5" src={logo} alt="logo" />
      </div>
      <div className="col-span-12 md:col-span-5"></div>
    </div>
  );
};

export default Register;
