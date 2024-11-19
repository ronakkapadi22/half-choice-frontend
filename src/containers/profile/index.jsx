import React, { useMemo, useState } from 'react'
import Breadcrumb from '../../shared/breadcrumb'
import Provider from '../../components/account-provider'
import Account from '../../components/account'
import Logout from '../../components/account/log-out'
import ReactHelmet from '../seo/helmet'

const Profile = () => {

    const links = useMemo(() => [
        {
            id: 'profile',
            label: 'Profile'
        }
    ], [])

    const TabChange = ({ name, ...props }) => {
        switch (name) {
            case 'account_info':
                return <Account {...props} />
            case 'log_out':
                return <Logout {...props} />
            default:
                return <Account {...props} />
        }
    }

    const [activeKey, setActiveKey] = useState('account_info')

    const handleTab = (key) => setActiveKey(key)

    return (
        <ReactHelmet {...{
            title: "About Halfchoice - Leading Kids Fashion Brand for Stylish, Affordable Kids' Clothes in India",
            description: "Explore Halfchoice, India's top kids fashion brand offering trendy, stylish, and affordable kids' clothes for boys and girls. Enjoy free delivery and COD across India",
            keywords: "Kids fashion brand, stylish kids clothing, affordable kids clothes, trendy kids wear, free delivery India"
        }} >
            <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
                <div className="w-full" >
                    <Breadcrumb links={links} />
                </div>
                <div className="grid grid-cols-12 w-full">
                    <div className="col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3">
                        <Provider {...{ activeKey, handleTab }} />
                    </div>
                    <div className="col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9">
                        <div className='px-4 py-4 md:py-8' >
                            <TabChange {...{ name: activeKey }} />
                        </div>
                    </div>
                </div>
            </div>
        </ReactHelmet>
    )
}

export default Profile