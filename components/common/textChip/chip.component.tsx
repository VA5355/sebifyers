"use client";
import React, {useEffect, useState} from 'react'
 import   useIsMobile   from "@/components/listing/tradeGrid/useIsMobile";
export interface ChipProps {
  text: string;
  onClick?: () => void;
  isSelected: boolean;
}
const Chip = ({ text, onClick, isSelected }: ChipProps) => {
     // CHECK MOBILE OR DESTOP
       const isMobile:boolean = useIsMobile();
        const isMobileSecond = typeof window !== "undefined" && window.innerWidth < 768;
       const [isClearMobile , setIsClearMobile] =  useState( isMobile && isMobileSecond ?   true :  false )
       const [selected , setSelected] =  useState( isSelected ?   'bg-brandgreen' : 'bg-brandgreenlight' )
       const [buttonClass , setButtonClass] =  useState( isClearMobile ?   'dark:bg-white' : `${selected} p-1 px-3  transition-all rounded-full mx-2 dark:bg-white` )
       const [pClass , setPClass] =  useState( isClearMobile ?   'text-black dark:bg-white' : `text-brandgreen text-xs font-semibold ` )



  return ( <>
  <button onClick={onClick} className={`${buttonClass  }`}>
      <p className={`${pClass  } `}>{text}</p>
    </button>
     </>

    
  )
}

export default Chip

/**
 * 
     { isClearMobile ? (<></>) : (<><button onClick={onClick} className={`${isSelected ? 'bg-brandgreen' : 'bg-brandgreenlight'} p-1 px-3  transition-all rounded-full mx-2 dark:bg-white`}>
      <p className={`${isSelected ? 'text-white' : 'text-brandgreen'} text-xs font-semibold  `}>{text}</p>
    </button> </>) }



 */