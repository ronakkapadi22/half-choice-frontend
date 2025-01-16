import React, { useState } from 'react'
import { classNames } from '../../assets/utils/helper'
import Confirmation from '../../shared/confirmation';
import { useDispatch } from 'react-redux';
import { handleAuthInitial } from '../../redux/slices/auth.slice';
import { clearDataFromLocal } from '../../assets/utils/local';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../../assets/utils/urls';

const tabs = [
    {
        id: 1,
        tabKey: 'account_info',
        label: 'Profile'
    }
]

const Provider = ({ activeKey, handleTab, ...props }) => {

    const [confirm, setConfirm] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAction = () => {
        dispatch(handleAuthInitial());
        clearDataFromLocal();
        setConfirm(false);
        navigate(PAGES.HOME.path || '/')
    };

    return (
        <div
            className="w-full flex flex-row md:flex-col px-4 py-4 md:py-8"
            {...props}
        >
            {tabs?.map(({ id, tabKey, label }) => (
                <div
                    key={id}
                    onClick={() => handleTab(tabKey)}
                    className={classNames(
                        'w-full hidden md:block cursor-pointer xl:w-[300px] rounded-[6px]',
                        activeKey === tabKey ? 'bg-slate-100' : ''
                    )}
                >
                    <p className='font-medium py-4 px-6 !text-base sm:text-base md:!text-[18px]'>{label || ''}</p>
                </div>
            ))}
            <div
                onClick={() => setConfirm(true)}
                className={classNames(
                    'w-full hidden md:block cursor-pointer xl:w-[300px] ml-1 md:ml-0 md:mt-2 rounded-[6px]',
                    'hover:bg-slate-100'
                )}
            >
                <p className='font-medium py-4 px-6 !text-base sm:text-base md:!text-[18px]'>{'Sign Out'}</p>
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

export default Provider
