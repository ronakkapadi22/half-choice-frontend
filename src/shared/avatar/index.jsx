import React from 'react'
import * as Avatar from '@radix-ui/react-avatar';

const ProfileImage = ({ name }) => {
    return (
        <Avatar.Root className="bg-blackA1 inline-flex h-[45px] border w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
            <Avatar.Fallback className="text-text leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
                {name || ''}
            </Avatar.Fallback>
        </Avatar.Root>
    )
}

export default ProfileImage