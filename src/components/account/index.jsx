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
import { handleAuthInitial, handleAuthSlice } from '../../redux/slices/auth.slice'
import Confirmation from '../../shared/confirmation'
import { clearDataFromLocal } from '../../assets/utils/local'

const Account = ({ ...props }) => {

    const [confirm, setConfirm] = useState(false);
    const navigate = useNavigate()
    const user = useSelector(({ auth }) => auth?.user)
    const dispatch = useDispatch()

    const { handleBlur, handleSubmit, setValues, values, errors, touched } = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            phone: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            const clone = {
                email: values?.email,
                phone: values?.phone,
                fName: values?.fname,
                lName: values?.lname
            }
            await updateProfileAPI(clone)
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
                fname: user?.fname?.trim() || '',
                lname: user?.lname?.trim() || '',
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

    const handleAction = () => {
        dispatch(handleAuthInitial());
        clearDataFromLocal();
        setConfirm(false);
        navigate(PAGES.HOME.path || '/')
    };

    return (
        <div className="w-full rounded-[6px] px-0 py-4 md:p-4" {...props}>
            <p className='mb-2 font-medium'>Profile Information</p>
            <hr />
            <div className='w-full mt-8'>
                <Form {...{ handleSubmit }} className='w-full mt-4 grid grid-cols-12 gap-4' >
                    <div className='col-span-12' >
                        <ProfileImage className='!w-[120px] !h-[120px]' name={letterCutting(username)} url={user?.profile || ''} />
                    </div>
                    <div className='col-span-12 md:col-span-6' >
                        <FormControl
                            placeholder="Enter First Name"
                            type="text"
                            label="First Name"
                            isError={touched.fname && errors.fname}
                            {...{
                                name: "fname",
                                value: values.fname,
                                handleChange,
                                onBlur: handleBlur,
                                error: errors.fname
                            }}
                        />
                    </div>
                    <div className='col-span-12 md:col-span-6' >
                        <FormControl
                            placeholder="Enter Last Name"
                            type="text"
                            label="Last Name"
                            isError={errors.lname && touched.lname}
                            {...{
                                name: "lname",
                                value: values.lname,
                                handleChange,
                                onBlur: handleBlur,
                                error: errors.lname
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
                    <div className='col-span-6 lg:col-span-4' >
                        <div onClick={() => handleRedirect(PAGES.ORDERS.path)} className='w-full hover:text-white hover:bg-green text-green border-green flex cursor-pointer items-center px-4 py-2 rounded-lg border' >
                            <ICONS.BOX style={{ fontSize: 24 }} />
                            <p className='font-medium text-sm md:text-base ml-2' >My Orders</p>
                        </div>
                    </div>
                    <div className='col-span-6 lg:col-span-4' >
                        <div onClick={() => handleRedirect(PAGES.ADDRESS.path)} className='w-full hover:text-white hover:bg-green text-green border-green cursor-pointer flex items-center px-4 py-2 rounded-lg border' >
                            <ICONS.LOCATION style={{ fontSize: 24 }} />
                            <p className='font-medium text-sm md:text-base ml-2' >Address</p>
                        </div>
                    </div>
                    <div className='col-span-6 lg:col-span-4' >
                        <div onClick={() => handleRedirect(PAGES.WISHLISTS.path)} className='w-full text-green hover:text-white hover:bg-green border-green cursor-pointer flex items-center px-4 py-2 rounded-lg border' >
                            <ICONS.CART style={{ fontSize: 24 }} />
                            <p className='font-medium text-sm md:text-base ml-2' >My Wishlists</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='block md:hidden w-full mt-8' >
                <hr />
                <div
                    onClick={() => setConfirm(true)}
                    className="w-auto py-2 text-base flex items-center font-medium text-left text-gray-700 cursor-pointer"
                >
                    Sign out
                    <ICONS.LOGOUT className="ml-2 w-5 h-5" />
                </div>
            </div>

            <Confirmation
                handleAction={handleAction}
                actionLabel="Yes, Sign out"
                title="Sign Out"
                description="Are you sure you want to sign out of your account?"
                open={confirm}
                setOpen={setConfirm}
            />
        </div>
    )
}

export default Account