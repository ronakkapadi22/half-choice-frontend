import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '../../shared/button'
import { ICONS } from '../../assets/icons'
import location_image from '../../assets/images/location.svg'
import { useSelector } from 'react-redux'
import useDispatchWithAbort from '../../hooks/useDispatchWithAbort'
import { getAddress } from '../../redux/slices/address.slice'
import { classNames } from '../../assets/utils/helper'
import { api } from '../../api'
import Modal from '../../shared/modal'
import AddressForm from '../../components/add-edit-addres'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PAGES } from '../../assets/utils/urls'
import ReactHelmet from '../seo/helmet'

const Address = () => {

    const { seo } = useSelector(({ common }) => common)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const user = useSelector(({ auth }) => auth.user);
    const { isLoading, address } = useSelector(({ address }) => address);
    const [fetchAddress] = useDispatchWithAbort(getAddress);
    const [selected, setSelected] = useState(null)

    const getParams = useCallback((key = '') => {
        return searchParams.get(key)
    }, [searchParams])

    useEffect(() => {
        fetchAddress({
            isLoader: true,
            params: {
                user_id: user?.id,
            },
        });
    }, [user?.id, fetchAddress]);


    const handleSelected = useCallback((e, data) => {
        e.stopPropagation()
        setSelected(data)
    }, [])



    const my_address = useMemo(() => {
        if (isLoading) return [];
        const clone = [...address];
        return clone || [];
    }, [isLoading, address]);

    const handleDefault = useCallback(async (id) => {
        try {
            const response = await api.address.default({
                data: {
                    customer_id: user?.id,
                    id
                }
            })
            if (response?.data) {
                if (getParams('from') === 'checkout') {
                    navigate(PAGES.CHECKOUT.path)
                    return
                }
                fetchAddress({
                    isLoading: false,
                    params: {
                        user_id: user?.id,
                    },
                });
            }
        } catch (error) {
            console.log('error', error)
        }
    }, [user?.id, fetchAddress])

    const handleAddAddress = useCallback((e) => {
        e.stopPropagation()
        setSelected(true)
    }, [])

    return (
        <ReactHelmet {...{
            title: seo?.address?.meta_title || '',
            description: seo?.address?.meta_description || '',
            keywords: seo?.address?.meta_keywords || '',
        }} >
            <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
                <div className="w-full flex flex-col items-start justify-start my-9">
                    <h2 className="text-xl md:text-3xl text-text mb-1.5 font-semibold">My Address</h2>
                    <div className='w-full flex items-start md:items-center flex-col md:flex-row justify-between' >
                        <p className="text-slate-400 text-sm md:text-md">
                            Manage your delivery addresses with ease on our Address Page.
                        </p>
                        <Button handleClick={(e) => handleAddAddress(e)} className='flex mt-4 md:mt-0 items-center justify-center' >
                            <ICONS.LOCATION className='w-5 h-5 mr-1' />
                            <span>Add Address</span>
                        </Button>
                    </div>
                    <div className="w-full mt-16 grid grid-cols-12 gap-4 lg:gap-8">
                        {isLoading ? (
                            [1, 2, 3].map((id) => (
                                <div
                                    key={id}
                                    className="w-full col-span-12 md:col-span-6 lg:col-span-4"
                                >
                                    <div className='w-full rounded-lg animate-pulse bg-slate-200 min-h-[220px]' ></div>
                                </div>
                            ))
                        ) : my_address?.length ? (
                            my_address.map((address) => (
                                <div
                                    key={address?.id}
                                    className="w-full col-span-12 md:col-span-6 lg:col-span-4"
                                >
                                    <div onClick={() => handleDefault(address?.id)} className={classNames('w-full py-2 px-3 lex rounded-lg h-full bg-slate-50 flex-col cursor-pointer border-2', address?.isDefault ? 'border-green ' : 'border-slate-50')} >
                                        <div className='w-full flex justify-between items-center' >
                                            <div className='w-auto' >
                                                <h2 className="text-text text-base md:text-lg title-font font-medium">{address?.full_name || ''}</h2>
                                                <p className="text-slate-400 text-sm title-font font-medium">{address?.phone || ''}</p>
                                            </div>
                                            <div className='flex items-center justify-end' >
                                                <button onClick={(e) => handleSelected(e, address)} className='p-2 rounded-md bg-yellow-light' >
                                                    <ICONS.EDIT className='w-5 h-5 text-yellow-dark' />
                                                </button>
                                                {/* <button className='p-2 rounded-md bg-danger-hover' >
                                                <ICONS.DELETE className='w-5 h-5 text-danger' />
                                            </button> */}
                                            </div>
                                        </div>
                                        <div className='w-full text-sm md:text-base mt-3' >
                                            <p>{address?.address_line_1}, {address?.address_line_2}</p>
                                            <p>{address?.city}, {address?.state} - {address?.pincode}</p>
                                            <p>{address?.country}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full col-span-12">
                                <div className="w-full flex flex-col items-center justify-center">
                                    <img
                                        alt="location_image"
                                        src={location_image}
                                        className="object-cover max-w-[180px] md:max-w-[280px] w-auto"
                                    />
                                    <div className="mt-10 flex flex-col items-center justify-center">
                                        <h2 className="text-center text-xl md:text-2xl text-text mb-1 font-semibold">
                                            Your Address is empty !!
                                        </h2>
                                        <p className="text-center text-slate-400 text-md my-0.5">
                                            Please add a new delivery address for your order
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Modal rootClass='lg:!max-w-[768px] !px-4 !md:px-6' {...{ open: Boolean(selected?.id) || Boolean(selected), setOpen: setSelected }} >
                    <div className="w-full relative flex flex-col items-start justify-center" >
                        <AddressForm {...selected} {...{ setOpen: setSelected }} />
                    </div>
                </Modal>
            </div>
        </ReactHelmet>
    )
}

export default Address