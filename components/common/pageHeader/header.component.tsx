"use client"
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {Menu, SearchNormal} from 'iconsax-react'
import {useDispatch, useSelector} from 'react-redux'
 import   useIsMobile   from "@/components/listing/tradeGrid/useIsMobile";
import {toggleMode} from '@/redux/slices/miscSlice'
import SearchResults from '../../search/popup/popup.component'
import {useRouter} from 'next/navigation'
import {GlobalState} from '@/redux/store'
import StockCandleChart from "@/components/charts/StockCandleChart";
const Header = () => {
    const [query, setQuery] = React.useState('' as string)
    const [open, setOpen] = useState(false)
    const isDarkMode = useSelector((state: GlobalState) => state.misc.isDarkMode)
    const router = useRouter()
    const dispatch = useDispatch()
       // CHECK MOBILE OR DESTOP
       const isMobile = useIsMobile();

    useEffect(() => {
        if (!open) setQuery('')
    }, [open])

    return (
        <div className='flex flex-wrap items-center   justify-between   gap-2  w-full px-3 py-3'>
            {/**  flex dark:bg-black justify-between w-11/12 mx-auto p-4 items-center */}
            {/* Logo */}
            <div className='flex justify-start items-center cursor-pointer ' onClick={() => router.push('/')}>
                <Image src={require('@/public/storenotify.in.png')} alt="logo" className='mr-2'  width={isMobile ? 40 : 65 } height={isMobile ? 40: 65 }  />
               {/*  w-0 md:w-[65px] md:h-[65px] removed */}
                <h1 className='hidden md:block md:w-100 text-md text-black font-semibold dark:text-white'>Store Notify Stocks</h1>
            </div>

            {/* Search Bar hidden md:hidden md:block*/}
            <div className='w-full   md:w-auto  px-3 pb-2'>
                {/*<div
                    className='ml-auto bg-greylight dark:bg-greydark flex items-center justify-start py-1 md:py-1 px-2 md:px-4 rounded-full w-full'>
                    <SearchNormal className='text-gray-500 dark:text-white mr-2' size={17}/>
                    <input  value={query} onChange={(e) => setQuery(e.target.value)} type="text"
                           placeholder="search e.g, tencent, tesco"
                           className='bg-transparent text-gray-500 text-xs dark:text-white py-1 focus-visible:outline-none w-full'/>
                </div>
                {query !== '' ? <SearchResults setQuery={(val: string) => setQuery(val)} query={query}/> : null} */}
                <div className="flex-1 mx-2 md:mx-4">
                    <div className=" flex items-center bg-gray-100 dark:bg-neutral-800 rounded-full px-3 py-2 md:px-4 md:py-2 w-full ">
                        <SearchNormal className="text-gray-500 mr-2" size={16} />
                        <input id="deskTopHeaderQuery" value={query} onChange={(e) => setQuery(e.target.value)} type="text"  placeholder="Search stocks..."
                         className="bg-transparent text-sm md:text-xs w-full focus:outline-none "/>
                    </div>
                    {query !== '' && ( <SearchResults setQuery={setQuery} query={query} />  )}
                    </div>
            </div>

            {/* Extras Menu */}
            <div className="relative inline-block text-left">
                <div>
                    <button onClick={() => setOpen(old => !old)} type="button"
                            className="inline-flex hover:bg-greylight dark:hover:bg-greydark p-2 rounded-full transition-all "
                            id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <Menu className={`text-black dark:text-white`} size={20}/>
                    </button>
                </div>


                {open ? <div
                    style={{maxWidth: '85vw'}}
                    className={` ${isMobile ? 'relative':'absolute'} transition-all divide-y divide-gray-100 w-screen  ${isMobile ? 'w-26':'md:w-56'} right-0 z-10 mt-2
                    origin-top-right rounded-md bg-white dark:bg-greydark text-black dark:text-white shadow-lg
                    ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <div className="py-1" role="none">
                        <button onClick={() => {
                            dispatch(toggleMode())
                            setOpen(false)
                        }} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1}
                                id="menu-item-0">{
                            isDarkMode ? 'Turn on Light Mode' : 'Turn on Dark Mode'
                        }</button>
                        <div className={`${isMobile ? 'hidden': 'md:hidden'}`}>
                            <div
                                className='ml-auto bg-greylight border-2  dark:bg-greydark flex items-center border-brandgreen justify-start py-1 md:py-1 px-2 md:px-4 rounded-lg w-11/12 mx-auto'>
                                <SearchNormal className='text-gray-500 dark:text-white mr-2' size={17}/>
                                <input id="mobileHeaderQuery" onChange={(e) => {setQuery(e.target.value);  setOpen(false) } } type="text"
                                       placeholder="search e.g, tencent, tesco"
                                       className='bg-transparent text-gray-500 text-sm dark:text-white py-1 focus-visible:outline-none'/>
                            </div> {/*<SearchResults setQuery={(val: string) => setQuery(val)} query={query}/> : null} */} 
                            {query !== '' ?
                               ( <>{/* moved to GridCardsFlipYahooChartNoTabs */}</>  ): null
                            }
                        </div>
                    </div>
                </div> : null}
            </div>

        </div>
    )
}

export default Header
