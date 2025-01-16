import React, { useCallback, useMemo } from 'react'
import { ICONS } from '../../assets/icons'
import { PAGES } from '../../assets/utils/urls'
import { classNames } from '../../assets/utils/helper'
import { useNavigate } from 'react-router-dom'
import { IoChevronForwardOutline } from 'react-icons/io5'

const Breadcrumb = ({ className, links, ...props }) => {

    const navigate = useNavigate()

    const breadcrumb = useMemo(() => links ? [
        {
            id: 'root',
            icon: ICONS.HOME,
            redirect: PAGES.HOME.path,
            isLink: true
        },
        ...links
    ] : [
        {
            id: 'root',
            icon: ICONS.HOME,
            redirect: PAGES.HOME.path,
            isLink: true
        }
    ], [links])

    const handleRedirect = useCallback((path = '') => {
        navigate(path)
    }, [navigate])

    return (
        <nav className='flex items-center justify-start' >
            <ol className='flex items-center list-none' >
                {
                    breadcrumb?.map(({ id, icon: ICON, ...item }, i) => <li onClick={() => handleRedirect(item?.redirect)} className={classNames('w-auto', item?.label ? 'ml-2' : '', breadcrumb?.length === i + 1 ? '' : 'cursor-pointer')} key={id} >
                        <div className='flex items-center' >
                            {ICON ? <ICON className='w-5 h-5 text-text' /> : null}
                            {item.label ? <div className='flex items-center' >
                                <IoChevronForwardOutline className='w-4 h-4 text-gray-400' />
                                <p className='ml-2 text-sm text-gray-400' >{item?.label || ''}</p>
                            </div> : null}
                        </div>
                    </li>)
                }
            </ol>
        </nav>
    )
}

export default Breadcrumb