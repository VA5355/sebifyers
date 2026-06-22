"use client";
import {Inter} from 'next/font/google'
//import './virtualglobals.css'
//import './virtualaccountoverview.css'
import {ReduxProvider} from '@/providers/ReduxProvider'
import {Toaster} from 'react-hot-toast';
import {useEffect} from 'react';
import addInterceptor from '@/libs/interceptor';
import {API} from '@/libs/client';
import {ThemeProvider} from "@/providers/ThemeProvider";
import { EquityReduxProvider } from '@/providers/EquityReduxProvider';
import Analytics from '../../analytics/Analytics';
import { TradeReduxProvider } from '@/providers/TradeReduxProvider';
import { ModalProvider } from '@/providers/ModalProvider';
import { ModalRoot } from '@/components/common/service/ModalService';

const inter = Inter({subsets: ['latin']})


export default function VirtualAccountOverviewLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    useEffect(() => {

        var head = document.getElementsByTagName('HEAD')[0];

    // Create new link Element 
    var link = document.createElement('link'); 

        // set the attributes for link element  
        link.rel = 'stylesheet';  
    
        link.type = 'text/css'; 
    
        link.href = '/css/virtualglobals.css';  

        // Append link element to HTML head 
        head.appendChild(link);  
        link = document.createElement('link'); 

        // set the attributes for link element  
        link.rel = 'stylesheet';  
    
        link.type = 'text/css'; 
    
        link.href = '/css/virtualaccountoverview.css';  

        // Append link element to HTML head 
        head.appendChild(link);  



        addInterceptor(API)
    }, [])
    return ( <>
       {/*  <html lang="en" className=''>
        <title>Store Notify Stocks</title>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
           <script async src="https://pay.google.com/gp/p/js/pay.js"></script>
        <body className={inter.className}>
        <ReduxProvider>
            <EquityReduxProvider>
                <TradeReduxProvider>
            <ThemeProvider>
                 <ModalProvider>
                <>  <Analytics />
                    <Toaster/>
                    <ModalRoot/>*/}
                    <div> 
                    {children}</div>
            {/*       </></ModalProvider>
            </ThemeProvider>
             </TradeReduxProvider>
            </EquityReduxProvider>
        </ReduxProvider>
        </body>
        </html>*/}
        </>
    )
}
