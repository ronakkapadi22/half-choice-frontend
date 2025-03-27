import React, { useMemo, useState } from 'react'
import Breadcrumb from '../../shared/breadcrumb'
import Provider from '../../components/account-provider'
import Account from '../../components/account'
import Logout from '../../components/account/log-out'
import ReactHelmet from '../seo/helmet'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { seo } = useSelector(({ common }) => common)
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


    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "HalfChoice",
        "url": "https://halfchoice.in",
        "logo": "https://halfchoice.in/assets/logo-Cm-CM6YC.png",
        "description": "HalfChoice is a top kids' clothing website and the best kids' shopping app in India, offering trendy fashion for children aged 1-15 years. Shop stylish T-shirts, party dresses, ethnic wear, and more at great prices. Enjoy free shipping, exclusive deals & a seamless shopping experience. Download now!",
        "sameAs": [
            "https://www.facebook.com/profile.php?id=61551765577969&mibextid=ZbWKwL",
            "https://www.instagram.com/half.choice/",
            "https://x.com/HalfChoice01",
            "https://x.com/HalfChoice01",
            "https://www.youtube.com/@halfchoice",
            "https://blog.halfchoice.in/",
            "https://play.google.com/store/apps/details?id=com.half.choice"
        ],
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+91-8160678824",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
            }
        ],
        "keywords": [
            "Top kids clothes website",
            "Top kids shopping clothes app",
            "Best kids shopping clothes app",
            "Top kids shopping clothes app in India",
            "Top kids shopping clothes app free",
            "Top kids shopping clothes app download",
            "Best app for baby clothes in India",
            "Online shopping for kidswear in India",
            "HalfChoice kids clothing online shopping",
            "Kids shopping app India",
            "HalfChoice kids clothing online shopping India",
            "Best kids clothing online shopping India",
            "Online shopping for kids clothes in India",
            "HalfChoice kids clothing online shopping India"
        ]
    };


    return (
        <ReactHelmet {...{
            title: seo?.profile?.meta_title || '',
            description: seo?.profile?.meta_description || '',
            keywords: seo?.profile?.meta_keywords || '',
        }} >
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>

            <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
                <div className="w-full" >
                    <Breadcrumb links={links} />
                </div>
                <div className="grid grid-cols-12 w-full">
                    <div className="hidden md:block col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3">
                        <Provider {...{ activeKey, handleTab }} />
                    </div>
                    <div className="col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9">
                        <div className='md:px-4 py-4 md:py-8' >
                            <TabChange {...{ name: activeKey }} />
                        </div>
                    </div>
                </div>
            </div>
        </ReactHelmet>
    )
}

export default Profile