import React from 'react'
import * as Avatar from '@radix-ui/react-avatar';
import { classNames } from '../../assets/utils/helper';

const ProfileImage = ({ className, name, url = '' }) => {
    return (
        <Avatar.Root className={classNames("bg-blackA1 flex h-[45px] border w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle", className)}>
            {
                url ? <Avatar.Image
                    className="size-full rounded-[inherit] object-cover"
                    src={url || ''}
                    alt="profile"
                /> : null
            }
            <Avatar.Fallback className="text-text leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
                {name || ''}
            </Avatar.Fallback>
        </Avatar.Root>
    )
}

export default ProfileImage