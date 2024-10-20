import React, { useEffect, useMemo, useState } from 'react'
import Form from '../../shared/form'
import { useFormik } from 'formik'
import FormControl from '../../shared/form-control'
import { classNames, letterCutting } from '../../assets/utils/helper'
import Button from '../../shared/button'
import Spinner from '../..'
import { RegisterSchema } from '../../assets/utils/validation'
import { ICONS } from '../../assets/icons'
import { useNavigate } from 'react-router-dom'
import { PAGES } from '../../assets/utils/urls'
import { useDispatch, useSelector } from 'react-redux'
import ProfileImage from '../../shared/avatar'
import { api } from '../../api'
import { handleAuthSlice } from '../../redux/slices/auth.slice'

const Account = ({ ...props }) => {

    const navigate = useNavigate()
    const user = useSelector(({ auth }) => auth?.user)
    const dispatch = useDispatch()

    const { handleBlur, handleSubmit, setValues, values, errors, touched } = useFormik({
        initialValues: {
            fName: '',
            lName: '',
            email: '',
            phone: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            await updateProfileAPI(values)
        }
    })

    const updateProfileAPI = async (payload) => {
        if (loader) return
        setLoader(true)
        try {
            const response = await api.auth.profile({
                data: {
                    ...payload,
                    id: user?.id
                }
            })
            if (response?.data) {
                setLoader(false)
                dispatch(handleAuthSlice({
                    user: {
                        ...user,
                        ...response?.data?.data

                    }
                }))
            }
        } catch (error) {
            setLoader(false)
            console.log('error', error)
        }
    }

    const handleRedirect = (path = '') => {
        navigate(path)
    }

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (Object.values(user).length) {
            setValues({
                fName: user?.fname?.trim() || '',
                lName: user?.lname?.trim() || '',
                email: user?.email?.trim() || '',
                phone: user?.phone?.trim() || ''
            })
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const username = useMemo(() => {
        if (user.fname || user.lname) return `${user.fname} ${user.lname}`;
    }, [user]);


    return (
        <div className="w-full rounded-[6px] p-4" {...props}>
            <p className='mb-2 font-medium'>Profile Information</p>
            <hr />
            <div className='w-full mt-8'>
                <Form {...{ handleSubmit }} className='w-full mt-4 grid grid-cols-12 gap-4' >
                    <div className='col-span-12' >
                        <ProfileImage className='!w-[80px] !h-[80px]' name={letterCutting(username)} url={user?.profile || ''} />
                    </div>
                    <div className='col-span-12 md:col-span-6' >
                        <FormControl
                            placeholder="Enter First Name"
                            type="text"
                            label="First Name"
                            isError={touched.fName && errors.fName}
                            {...{
                                name: "fName",
                                value: values.fName,
                                handleChange,
                                onBlur: handleBlur,
                                error: errors.fName
                            }}
                        />
                    </div>
                    <div className='col-span-12 md:col-span-6' >
                        <FormControl
                            placeholder="Enter Last Name"
                            type="text"
                            label="Last Name"
                            isError={errors.lName && touched.lName}
                            {...{
                                name: "lName",
                                value: values.lName,
                                handleChange,
                                onBlur: handleBlur,
                                error: errors.lName
                            }}
                        />
                    </div>
                    <div className='col-span-12 md:col-span-6' >
                        <FormControl
                            isPhone
                            disabled
                            placeholder="Enter Phone Number"
                            type="number"
                            label="Phone Number"
                            isError={errors.phone && touched.phone}
                            {...{
                                name: "phone",
                                value: values.phone,
                                handleChange,
                                onBlur: handleBlur,
                                error: errors.phone
                            }}
                        />
                    </div>
                    <div className='col-span-12 md:col-span-6' >
                        <FormControl
                            placeholder="Enter Email"
                            type="email"
                            label="Email"
                            isError={errors.email && touched.email}
                            {...{
                                name: "email",
                                value: values.email,
                                handleChange,
                                onBlur: handleBlur,
                                error: errors.email
                            }}
                        />
                    </div>
                    <div className='col-span-12 md:col-span-6' >
                        <Button
                            disabled={loader}
                            className={classNames(
                                "!w-auto mb-1 flex items-center justify-center !bg-pink !border-pink hover:border-yellow hover:bg-yellow transition-all duration-300",
                                loader ? "cursor-not-allowed" : ""
                            )}
                            type="submit"
                        >
                            <span>{!loader ? "Update Profile" : "Loading"}</span>
                            {loader ? <Spinner className="ml-1 !w-4 !h-4" /> : null}
                        </Button>
                    </div>
                </Form>
            </div>
            <div className='w-full mt-8' >
                <p className='mb-2 font-medium'>Account Information</p>
                <hr />
                <div className='w-full grid grid-cols-12 gap-4 mt-4' >
                    <div className='col-span-12 md:col-span-6 lg:col-span-4' >
                        <div onClick={() => handleRedirect(PAGES.ORDERS.path)} className='w-full hover:text-white hover:bg-green text-green border-green flex cursor-pointer items-center px-4 py-2 rounded-lg border' >
                            <ICONS.BOX style={{ fontSize: 24 }} />
                            <p className='font-medium ml-2' >My Orders</p>
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-6 lg:col-span-4' >
                        <div onClick={() => handleRedirect(PAGES.ADDRESS.path)} className='w-full hover:text-white hover:bg-green text-green border-green cursor-pointer flex items-center px-4 py-2 rounded-lg border' >
                            <ICONS.LOCATION style={{ fontSize: 24 }} />
                            <p className='font-medium ml-2' >Address</p>
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-6 lg:col-span-4' >
                        <div onClick={() => handleRedirect(PAGES.WISHLISTS.path)} className='w-full text-green hover:text-white hover:bg-green border-green cursor-pointer flex items-center px-4 py-2 rounded-lg border' >
                            <ICONS.CART style={{ fontSize: 24 }} />
                            <p className='font-medium ml-2' >My Wishlists</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account