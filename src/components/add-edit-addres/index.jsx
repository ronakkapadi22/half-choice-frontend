import React, { useMemo, useState } from "react";
import Button from "../../shared/button";
import { ICONS } from "../../assets/icons";
import { useFormik } from "formik";
import { AddressSchema } from "../../assets/utils/validation";
import Form from "../../shared/form";
import FormControl from "../../shared/form-control";
import CustomCheckBox from "../../shared/checkbox";
import { ADDRESS_TYPE } from "../../assets/utils/constant";
import { classNames } from "../../assets/utils/helper";
import Spinner from "../..";

const AddressForm = ({ id, open, setOpen, ...props }) => {

    const [loader, setLoader] = useState(false);


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
                address_type
            } = props;
            return {
                address_line_1,
                address_line_2,
                city,
                state,
                pincode,
                phone,
                full_name,
                isDefault: false,
                address_type,
                address_type
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
                address_type: 'HOME'
            };
    }, [props, id]);

    const { values, errors, handleSubmit, setValues } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: AddressSchema,
        onSubmit: async (values) => {
            console.log("values", values);
        },
    });

    return (
        <div className="w-full h-auto">
            <div className="w-full flex justify-between items-center">
                <h2 className="text-xl mb-4 mt-3 font-medium text-text">
                    {id ? "Edit Address" : "Add Address"}
                </h2>
                <Button className="!bg-slate-200 !border-none !rounded-full !p-1 !text-text">
                    <ICONS.CLOSE
                        onClick={() => setOpen(null)}
                        className="w-8 h-8 text-s"
                    />
                </Button>
            </div>
            <Form
                {...{ handleSubmit }}
                className="w-full mt-4 grid grid-cols-12 gap-4"
            >
                <FormControl
                    className="col-span-12 md:col-span-6"
                    placeholder="Enter Full Name"
                    label="Full Name"
                    {...{
                        name: "full_name",
                        value: values.full_name,
                        error: errors["full_name"],
                    }}
                />
                <FormControl
                    className="col-span-12 md:col-span-6"
                    isPhone
                    placeholder="Enter Phone Number"
                    type="number"
                    label="Phone Number"
                    {...{ name: "phone", value: values.phone, error: errors["phone"] }}
                />
                <FormControl
                    className="col-span-12 md:col-span-6"
                    placeholder="Block / House / Building"
                    label="Block / House / Building"
                    {...{
                        name: "address_line_1",
                        value: values.address_line_1,
                        error: errors["address_line_1"],
                    }}
                />
                <FormControl
                    className="col-span-12 md:col-span-6"
                    placeholder="Road / Area colony"
                    label="Road / Area colony "
                    {...{
                        name: "address_line_2",
                        value: values.address_line_2,
                        error: errors["address_line_2"],
                    }}
                />
                <FormControl
                    className="col-span-4"
                    placeholder="Enter City"
                    label="City"
                    {...{
                        name: "city",
                        value: values.city,
                        error: errors["city"],
                    }}
                />
                <FormControl
                    className="col-span-4"
                    placeholder="Enter State"
                    label="State"
                    {...{
                        name: "state",
                        value: values.state,
                        error: errors["state"],
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
                        error: errors["pincode"],
                    }}
                />
                <div className="col-span-12 w-full">
                    <CustomCheckBox
                        {...{
                            name: "isDefault",
                            checked: values.isDefault,
                            value: values.isDefault,
                        }}
                        className="my-2"
                        label="Use a default address"
                    />
                </div>
                <div className="col-span-12 w-full">
                    <label className="mb-1 font-medium text-text ">
                        Address Type
                    </label>
                    <div className="w-full flex items-center justify-start flex-wrap gap-3 mt-2" >
                        {
                            ADDRESS_TYPE?.map(type => <div onClick={() => setValues({ ...values, address_type: type })} className={classNames(
                                "border py-2 px-4 text-text font-medium border-select rounded-md cursor-pointer",
                                values.address_type === type
                                    ? "bg-select !text-white"
                                    : "bg-transparent"
                            )} >{type || ''}</div>)
                        }
                    </div>
                </div>
                <div className="col-span-12 mt-2 items-end flex justify-end" >
                    <Button
                        disabled={loader}
                        className={classNames(
                            "!w-auto mb-1 flex min-w-28 items-center justify-center !bg-pink !border-pink hover:border-yellow hover:bg-yellow transition-all duration-300",
                            loader ? "cursor-not-allowed" : ""
                        )}
                        type="submit"
                    >
                        <span>{!loader ? id ? "Update" : "Save" : "Loading"}</span>
                        {loader ? <Spinner className="ml-1 !w-4 !h-4" /> : null}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddressForm;
