import { GlobalState } from '@/redux/store'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

export const ScreenLoader = () => {
    const loader = useSelector((state: GlobalState) => state.misc.loader)

    return (
        <div className={`${!loader?'hidden':''} fixed inset-0 z-50  flex items-center justify-center bg-white/80 dark:bg-black/80    `}>
            {/** loader-overlay bg-white dark:bg-black flex items-center justify-center */}
            <Image src={require('@/public/loader.gif')} alt="logo" className='rounded-lg' width={40} height={40} />
        </div>
    )
}
