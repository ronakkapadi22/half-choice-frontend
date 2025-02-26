import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../shared/button";
import { ICONS } from "../../assets/icons";
import { useFormik } from "formik";
import { AddressSchema } from "../../assets/utils/validation";
import Form from "../../shared/form";
import FormControl from "../../shared/form-control";
import CustomCheckBox from "../../shared/checkbox";

import { classNames, isEmptyObject } from "../../assets/utils/helper";
import Spinner from "../..";
import { api } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../redux/slices/address.slice";

const AddressForm = ({ id, open, setOpen, ...props }) => {
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const detectUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Reverse geocode to get the city, state, etc.
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7cb5b50115c943ef961135586e23780a`)
          .then((response) => response.json())
          .then((data) => {
            const result = data.results[0];
            if (result) {
              const { city, state, postcode, state_district, suburb, road, neighbourhood, _normalized_city } = result.components;
              
              // Determine city
              const cityToSet = city || state_district || suburb || _normalized_city;
              
              // Determine address line 2
              const addressLine2 = `${road || ''} ${_normalized_city || ''} ${suburb || ''} ${neighbourhood || ''}`;
  
              // Update form values while preserving other fields
              setValues((prev) => ({
                ...prev,
                city: cityToSet || prev.city,
                state: state || prev.state,
                pincode: postcode || prev.pincode,
                address_line_2: addressLine2.trim() || prev.address_line_2,
              }));
            }
          })
          .catch((error) => {
            console.error("Geolocation error: ", error);
          });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };  

  const initialValues = useMemo(() => {
    if (id) {
      const {
        address_line_1,
        address_line_2,
        city,
        state,
        pincode,
        full_name,
        phone,
        isDefault,
        address_type,
      } = props;
      return {
        address_line_1,
        address_line_2,
        city,
        state,
        pincode,
        phone,
        full_name,
        isDefault,
        address_type,
      };
    } else
      return {
        isDefault: false,
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        full_name: "",
        address_type: "HOME",
      };
  }, [props, id]);

  const { values, errors, handleSubmit, setValues, handleBlur, touched } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: AddressSchema,
    onSubmit: async (values) => {
      await handleSubmitAddress(values);
    },
  });

  useEffect(() => {
    // Call detectUserLocation only when adding a new address (id is null or undefined)
    if (!id) {
      // Check if user details are available and set form values
      if (!isEmptyObject(user)) {
        setValues(prev => ({
          ...prev,
          full_name: `${user?.fname} ${user?.lname}`,
          phone: user?.phone
        }));
      }
      detectUserLocation();
    }
  }, [user, id]);  // Runs when user or id changes
  
  const handleSubmitAddress = async (payload) => {
    setLoader(true);
    try {
      const data = {
        ...payload,
        country: "India",
        customer_id: user?.id,
      };
      if (Boolean(id)) {
        data["id"] = id;
      }
      const response = await api.address.update({ data });
      if (response?.data) {
        setLoader(false);
        dispatch(
          getAddress({
            isLoader: false,
            params: {
              user_id: user?.id,
            },
          })
        ).then((response) => {
          response?.payload?.response?.status === 200 && setOpen(false);
        });
      }
    } catch (error) {
      setLoader(false);
      console.log("error", error);
    }
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    },
    [values]
  );

  return (
    <div className="w-full h-auto p-0 md:p-4 max-h-[80vh] overflow-y-auto"> {/* Added max-height and overflow-y-auto */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-lg sm:text-xl font-medium text-text">
          {id ? "Edit Address" : "Add Address"}
        </h2>
        <Button className="!bg-slate-200 !border-none !rounded-full !p-1 !text-text">
          <ICONS.CLOSE
            onClick={() => setOpen(null)}
            className="w-6 h-6 sm:w-8 sm:h-8 text-s"
          />
        </Button>
      </div>
      <Form
        {...{ handleSubmit }}
        className="grid w-full grid-cols-12 gap-3 sm:gap-4"
      >
        <FormControl
          className="col-span-12 sm:col-span-6"
          placeholder="Enter Full Name"
          label="Full Name"
          {...{
            name: "full_name",
            value: values.full_name,
            error: touched.full_name ? errors["full_name"] : null,
            handleChange,
            handleBlur
          }}
        />
        <FormControl
          className="col-span-12 sm:col-span-6"
          isPhone
          placeholder="Enter Phone Number"
          type="number"
          label="Phone Number"
          {...{
            name: "phone",
            value: values.phone,
            error: touched['phone'] ? errors["phone"] : null,
            handleChange,
            handleBlur
          }}
        />
        <FormControl
          className="col-span-12 sm:col-span-6"
          placeholder="Block / House / Building"
          label="Block / House / Building"
          {...{
            name: "address_line_1",
            value: values.address_line_1,
            error: touched['address_line_1'] ? errors["address_line_1"] : null,
            handleChange,
            handleBlur
          }}
        />
        <FormControl
          className="col-span-12 sm:col-span-6"
          placeholder="Road / Area colony"
          label="Road / Area colony"
          {...{
            name: "address_line_2",
            value: values.address_line_2,
            error: touched['address_line_2'] ? errors["address_line_2"] : null,
            handleChange,
            handleBlur
          }}
        />
        <FormControl
          className="col-span-4"
          placeholder="Enter City"
          label="City"
          {...{
            name: "city",
            value: values.city,
            error: touched?.city ? errors["city"] : null,
            handleChange,
            handleBlur
          }}
        />
        <FormControl
          className="col-span-4"
          placeholder="Enter State"
          label="State"
          {...{
            name: "state",
            value: values.state,
            error: touched['state'] ? errors["state"] : null,
            handleChange,
            handleBlur
          }}
        />
        <FormControl
          className="col-span-4"
          placeholder="Enter Pincode"
          label="Pincode"
          {...{
            type: "number",
            name: "pincode",
            value: values.pincode,
            error: touched['pincode'] ? errors["pincode"] : null,
            handleChange,
            handleBlur
          }}
        />
        <div className="w-full col-span-12">
          <CustomCheckBox
            {...{
              name: "isDefault",
              checked: values.isDefault,
              value: values.isDefault,
              handleChange,
            }}
            className="my-2"
            label="Use a default address"
          />
        </div>

        <div className="flex items-end justify-end col-span-12 mt-4">
          <Button
            type="submit"
            disabled={loader}
            className={classNames(
              "!w-full sm:!w-auto mb-1 flex min-w-full sm:min-w-28 items-center justify-center !bg-pink !border-pink hover:border-yellow hover:bg-yellow transition-all duration-300",
              loader ? "cursor-not-allowed" : ""
            )}
          >
            <span className="text-sm sm:text-base">
              {!loader ? (id ? "Update" : "Save") : "Loading"}
            </span>
            {loader ? <Spinner className="ml-1 !w-4 !h-4" /> : null}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddressForm;
