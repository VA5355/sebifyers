"use client";
import React, {useState} from 'react'
import Chip from '../../common/textChip/chip.component'
import {useDispatch, useSelector} from 'react-redux';
 import   useIsMobile   from "@/components/listing/tradeGrid/useIsMobile";
import {changeTab} from '@/redux/slices/miscSlice';
import {disableLoader, enableLoader} from "@/redux/slices/miscSlice"
import {API, FYERSAPI, UPSTOXAPI, ICICDIRECTAPI ,  FYERSAPILOGINURL, UPSTOXAPILOGINURL, TRADE_LOGIN_URL ,FYERSAUTHORISEURL ,
      FYERSAPIURL, FYERSMODALCALLBAKURL
} from "@/libs/client"
import {GlobalState} from '@/redux/store';
import {saveActivelyTraded, saveGainers, saveLosers} from '@/redux/slices/stockSlice';
import { platform } from 'os';
import { StorageUtils } from '@/libs/cache';
import { CommonConstants } from '@/utils/constants';
import { AnyNode } from 'postcss';
import BrokerAuthModalImproved from '@/app/BrokerAuthModalImproved';
import BrokerAuthModal from '@/app/BrokerAuthModal';

const arr = [
    {key: 1, title: "Educate"},
    {key: 2, title: "Observe"},
    {key: 3, title: "Trade"},
    {key: 4, title: "Position"},
     {key: 5, title: "Subscribe"},
]
const sortMapper = [
    {key: 1, title: "Sort by percentage"},
    {key: 2, title: "Sort by price"},
]

const platformMapper = [
    {key: 1, title: "Alpha-Vantage"},
    {key: 2, title: "Fyers"},
]
const Menu = () => {
    const [sortType, setSortType] = useState('1')
    let globalUserCheck  :any = undefined;
       // CHECK MOBILE OR DESTOP
           const isMobile = useIsMobile();
   const [showBrokerModal, setShowBrokerModal] = useState(false);
   const [brokerAuthUrl, setBrokerAuthUrl] = useState("");
    const [openBrokerModal, setOpenBrokerModal] =
    useState(false);

    const [platformType, setPlatformType] = useState('1')
    const tab = useSelector((state: GlobalState) => state.misc.tab)
    const gainers = useSelector((state: GlobalState) => state.stock.gainers)
    const losers = useSelector((state: GlobalState) => state.stock.losers)
    const activelyTraded = useSelector((state: GlobalState) => state.stock.activelyTraded)
    const currentPlatform = useSelector((state: GlobalState) => state.misc.platformType)
    //const currentPlatform = useSelector((state: GlobalState) => state.misc.platformType)
    const dispatch = useDispatch();


    // =====================================================
  // SUCCESS CALLBACK
  // =====================================================

  const handleBrokerSuccess = (
    authCode: string | null
  ) => {
    console.log(
      "✅ Broker authentication successful"
    );

    console.log("Auth Code:", authCode);

    // -----------------------------------------
    // SAVE TOKEN / CALL BACKEND
    // -----------------------------------------

    if (authCode) {
      localStorage.setItem(
        "BROKER_AUTH_CODE",
        authCode
      );

      /*
        Example API call

        fetch("/api/broker/verify", {
          method: "POST",
          body: JSON.stringify({
            code: authCode
          })
        })
      */
    }

    // Close modal after success
    setOpenBrokerModal(false);
  };

  // =====================================================
  // ERROR CALLBACK
  // =====================================================

  const handleBrokerError = (error: string) => {
    console.error(
      "❌ Broker authentication failed:",
      error
    );
  };

    const popupCenter = (url:any, title:any) => {
        const dualScreenLeft = window.screenLeft ?? window.screenX;
        const dualScreenTop = window.screenTop ?? window.screenY;
        let upStockWideSize = 0.412;
        let upStockAdjs = 0; let upStockWid= 0, upStocHeg= 0;
        let width =
          window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
    
         let height =
          window.innerHeight ??
          document.documentElement.clientHeight ??
          screen.height;
    
        let systemZoom = width / window.screen.availWidth;
             console.log("POP UP systemZoom "+systemZoom)
          if(title ==="Upstox Signin"){
            systemZoom -=upStockWideSize;
            upStockAdjs =100;
            upStockWid=300;
            upStocHeg = -210;
        }


        let left = (width - 500 +upStockAdjs) / 2 / systemZoom + dualScreenLeft;
        let top = (height - 550+upStockAdjs) / 2 / systemZoom + dualScreenTop;
        console.log("POP UP left "+left)
        console.log("POP UP top "+top)
        if(left <=0){
            left += 100;
        }
         if(left >=800){
            left -= 700;
        }
         if(top <=10){
            top += 150;
        }
        console.log("POP UP width "+width)
        console.log("POP UP height "+height)
         console.log("POP UP left after  "+left)
        console.log("POP UP top after  "+top)
           console.log("POP UP systemZoom after "+systemZoom)
        // globalLogin = { "value" : {"auth_code" :globalUptox.access_token , "code" :globalUptox.extended_token, "s" :'ok' ,"ttl" :now}};

        const newWindow = window.open(
          url,
          title,
          `width=${(500 +upStockWid )/ systemZoom},height=${(550 +upStocHeg)/ systemZoom
          },top=${top},left=${left}`
        );
        //  globalLogin = { "value" : {"auth_code" :globalUptox.access_token , "code" :globalUptox.extended_token, "s" :'ok' ,"ttl" :now}};
        //this variable is set after the upstoxauthcodeverify is called 
        // the above open calls the upstoxauthcallback so below 
        // the event listener must just check or ping and poll that the globalLogin was set on server or not
        // so call the upstoxgloballogin 
        // this will stop the polling and User is awaiting authorization .. callback either failed for fyers / upstox / alpha 
        // may stop 
        newWindow?.window.addEventListener('load', () => {
            newWindow?.window.addEventListener('unload', () => {
                console.log("unload the popup ")
               // ftech the globallogin boject 
               let globaProm =    ( async () => {        //
                 let login = title ==="Upstox Signin" ? await UPSTOXAPI.get('/upstoxgloballogin'): ( title ==="Fyers Signin" ?  await FYERSAPI.get('/fyersgloballogin') :   (title ==="IciciDirect Signin" ?  await ICICDIRECTAPI.get('/icicidirectgloballogin'): Promise.resolve()) ); 
                 console.log("fyers login called ");
                 return login;
                }) 
                const res = Promise.all([ globaProm()]);
                res.then((values) => {
                    if(title ==="Upstox Signin"){

                    } else if (title ==="Fyers Signin"){
                        StorageUtils._save(CommonConstants.fyersToken,values)
                     console.log("fyers login token saved ")
                    }
                    else if (title ==="IciciDirect Signin"){
                        StorageUtils._save(CommonConstants.fyersToken,values)
                     console.log("fyers login token saved ")
                    }
                  
                })
               
                // window.location.reload();
            });
        });
        
        newWindow?.focus();
      };
    const sortByPercentage = () => {
        if (tab === "Educate") {
            const sortedData = [...gainers].sort((a: any, b: any) => {

                return parseFloat(b.change_percentage) - parseFloat(a.change_percentage)
            })
            dispatch(saveGainers(sortedData))
        } else if (tab === 'Top Losers') {
            const sortedData = [...losers].sort((a: any, b: any) => {
                return parseFloat(b.change_percentage) - parseFloat(a.change_percentage)
            })
            dispatch(saveLosers(sortedData))
        } else {
            const sortedData = [...activelyTraded].sort((a: any, b: any) => {
                return parseFloat(b.change_percentage) - parseFloat(a.change_percentage)
            })
            dispatch(saveActivelyTraded(sortedData))
        }
    }
    const sortByPrice = () => {
        if (tab === "Educate") {
            const sortedData = [...gainers].sort((a: any, b: any) => {
                return parseFloat(b.change_amount) - parseFloat(a.change_amount)
            })
            dispatch(saveGainers(sortedData))
        } else if (tab === 'Top Losers') {
            const sortedData = [...losers].sort((a: any, b: any) => {
                return parseFloat(b.change_amount) - parseFloat(a.change_amount)
            })
            dispatch(saveLosers(sortedData))
        } else {
            const sortedData = [...activelyTraded].sort((a: any, b: any) => {
                return parseFloat(b.change_amount) - parseFloat(a.change_amount)
            })
            dispatch(saveActivelyTraded(sortedData))
        }
    }
    const checkUserLogged = () => { 
                 // IFF Logged in cehck
        let logd = false;
         const res1 = StorageUtils._retrieve(CommonConstants.fyersToken);
        if (res1.isValid && res1.data !== null &&  res1.data !== undefined && res1.data !== undefined) {
            
            let auth_code = res1.data['auth_code'];
            if (auth_code&& auth_code !== null && auth_code !== undefined) {
                console.log("User is Authorized ");
                logd = true;
                // check for access toekn 
                 let aces_token =   StorageUtils._retrieve(CommonConstants.fyersAccessToken);
                if (aces_token !== undefined || aces_token ==null){
                     //   setShowBrokerModal(false)                      
                    StorageUtils._retrieve(CommonConstants.fyersRefreshToken);
                    }
                else{
                     logd = false;
                    //    setShowBrokerModal(true)     
                }

            }

        }
        return logd;
    }
    const processAuth = async () => {
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("auth_code");
        if (!authCode) {         console.error("menu component processAuth :::  No auth code");        return;      }
        sessionStorage.setItem("fyers_auth_code", authCode );
        try {  const res = await fetch( `${FYERSAUTHORISEURL}/generate-token`,
            {  method: "POST",  headers: {  "Content-Type": "application/json" }, body: JSON.stringify({ auth_code: authCode  })
            } );
          const tokenData = await res.json();
          console.log(tokenData);
          console.log('menu component processAuth :::  processAuth worked Access Token availalbe ');
          localStorage.setItem("fyers_access_token",tokenData.access_token);
          localStorage.setItem("fyers_refresh_token",tokenData.refresh_token || "");
          localStorage.setItem("fyers_token_data",JSON.stringify(tokenData));
        // navigate("/dashboard");
        } catch (err) {   console.log ('menu component processAuth :::  process Auth error :: ' + JSON.stringify(err));
          //setError('process Auth error :: ' + JSON.stringify(err))
        }
      };
    const authLocalFyers = async () => {
             try {
           const res = await fetch(
            `${FYERSAUTHORISEURL}/generate-auth-url`
          );
            const data = await res.json();
             console.log('python generated auth url for LOCAL authorization ' );
             console.log('  ' +data.auth_url);
          return data.auth_url;

        } catch (err) {
             console.error(err);
        }
    }


    const logByPlatform = () => {
        // check platform type is alpha-vantage or fyers
        // currentPlatform
        if (currentPlatform !==  "fyers") {
            const apiKey = StorageUtils._retrieve(CommonConstants.platFormKey)
            if (apiKey.isValid && apiKey.data !== null) {
                
            }
            else {
                console.log("Fyers not logged in ");    
                try {
                    dispatch(enableLoader());

                   let fyerLoginProm =  ( async () => {
                        //{params: {function: 'TOP_GAINERS_LOSERS' , apikey:CommonConstants.apiKey}}
                        let res :any = undefined;
                     if (!checkUserLogged()) { 
                      //let res =  await FYERSAPI.get('/fyerscallback' )
                         
                         (async () =>  {
                                let pythonAuthUrl = await authLocalFyers();   
                                console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                                                console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                                                console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                                                console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                                                console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                                                console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                                                    console.log('pythonAuthUrl  '+pythonAuthUrl);
                                                    console.log('pythonAuthUrl  '+pythonAuthUrl);
                                                    console.log('pythonAuthUrl  '+pythonAuthUrl);
                                                    console.log('pythonAuthUrl  '+pythonAuthUrl);
                                                    console.log('pythonAuthUrl  '+pythonAuthUrl);
                                /* window.location.assign(
                                    "https://api-t1.fyers.in/api/v3/generate-authcode?" +
                                    params.toString()
                                );*/
                              //  window.location.assign(pythonAuthUrl );
                            if( pythonAuthUrl !== undefined && pythonAuthUrl !==''){
                                // res =   popupCenter(pythonAuthUrl, "Fyers Signin python generated url ")
                                 setBrokerAuthUrl(pythonAuthUrl);
                                    setShowBrokerModal(true); setOpenBrokerModal(true);
                            }
                            else {
                               //  res =   popupCenter(FYERSAPILOGINURL, "Fyers Signin")
                                 setBrokerAuthUrl(FYERSAPILOGINURL);
                                    setShowBrokerModal(true);setOpenBrokerModal(true);
                            }
                            })();
                            // CHECK for GENERATE TOKEN causing delay is Modal display for first time Fyers Broker select in the Menu Component
                                await processAuth();    


                       
                      }
                      else {
                        res = true;
                         StorageUtils._save(CommonConstants.globalUserCheck, 'false')
                      }
                        return res;
                    }) ;
                    const result = Promise.all([    fyerLoginProm()]);
                     // run a interval to check the fyersToken 
                    globalUserCheck  =  setInterval( async() => {

                        
                        let result =   await FYERSAPI.get('/fyersgloballogin' )
                        console.log("fyers login called ");
                        let data =    result.data.value;
                        StorageUtils._save(CommonConstants.fyersToken,data)
                        const res = StorageUtils._retrieve(CommonConstants.fyersToken);
                        if (res.isValid && res.data !== null  && res.data !== undefined) {
                           
                            let auth_code = res.data['auth_code'];
                            if (auth_code&& auth_code !== null && auth_code !== undefined) {
                                console.log("User is Authorized ");
                                   let aces_token =   StorageUtils._retrieve(CommonConstants.fyersAccessToken);
                                     console.log(`Authorization for app  ${JSON.stringify(aces_token)} `);
                                if (aces_token.isValid &&  aces_token.data !== null  && aces_token.data !== undefined   ){
                                      setShowBrokerModal(false)      ;setOpenBrokerModal(false);                
                                    StorageUtils._retrieve(CommonConstants.fyersRefreshToken);
                                    }
                                else{   console.log("Authorization for app pending , user not authorised  ");
                                       setShowBrokerModal(true);     setOpenBrokerModal(true);        
                                }
                               clearInterval(globalUserCheck);
                            }
                            else{
                                console.log("User is awaiting authorization ");
                            }
                        }
                     },5000);
                     // NOTE the globalUserCheck in the Storage and regularly clear it when user authenticated 
                        StorageUtils._save(CommonConstants.globalUserCheck, globalUserCheck)
                       result.then((fyerslogres:any ) => { 
                         console.log("fyerLoginProm result   "+JSON.stringify(fyerslogres));

                       }).catch((fyerslogerr:any) => { 
                         console.log("fyerLoginProm error  "+JSON.stringify(fyerslogerr));
                       })
                   // const res = StorageUtils._retrieve(CommonConstants.fyersToken );
                    
                } catch (error) {
                    // @ts-ignore
                    const {message} = error
                    //toast.error(message ? message : "Something went wrong!")
                    console.log(error)
                    return error
                } finally {
                    dispatch(disableLoader())
                }

                //dispatch(loginFyers([]));
               
            }
           // const sortedData = [...gainers].sort((a: any, b: any) => {
           //     return parseFloat(b.change_amount) - parseFloat(a.change_amount)
           // })
           // dispatch(saveGainers(sortedData))
        } 
         // https://onedinaar.com/.netlify/functions/netlifyupstoxbridge/api/upstoxcallback



    }
    const logByUpstoxPlatform =  () => {
        // check platform type is alpha-vantage or fyers
        // currentPlatform
        if (currentPlatform !==  "upstox") {
            const apiKey = StorageUtils._retrieve(CommonConstants.platFormKey)
            if (apiKey.isValid && apiKey.data !== null) {
                
            }
            else {
                console.log("Upstox not logged in ");    
                try {
                    dispatch(enableLoader());

                   let upstoxLoginProm =  ( async () => {
                        //{params: {function: 'TOP_GAINERS_LOSERS' , apikey:CommonConstants.apiKey}}
                        let res :any = undefined;
                     if (!checkUserLogged()) { 
                      //let res =  await FYERSAPI.get('/fyerscallback' )
                       // res =   popupCenter(UPSTOXAPILOGINURL, "Upstox Signin")
                         setBrokerAuthUrl(UPSTOXAPILOGINURL);
                                    setShowBrokerModal(true);setOpenBrokerModal(true);
                      }
                      else {
                        res = true;
                         StorageUtils._save(CommonConstants.globalUserCheck, 'false')
                      }
                        return res;
                    }) ;
                    const result = Promise.all([    upstoxLoginProm()]);
                     // run a interval to check the fyersToken 
                    globalUserCheck  =  setInterval( async() => {

                        
                        let result =   await UPSTOXAPI.get('/upstoxgloballogin' ) // /upstoxsdklogin,'/upstoxcallback'
                        console.log("upstox login called ");
                        let data =  result !== undefined ?    result.data.value : undefined;
                        StorageUtils._save(CommonConstants.fyersToken,data)
                        const res = StorageUtils._retrieve(CommonConstants.fyersToken);
                        if(data !==undefined) {   
                        if (res.isValid && res.data !== null  && res.data !== undefined) {
                           
                            let auth_code = res.data['auth_code'];
                            if (auth_code&& auth_code !== null && auth_code !== undefined) {
                                console.log("User is Authorized ");
                               clearInterval(globalUserCheck);
                            }
                            else{
                                console.log("User is awaiting authorization ");
                            }
                        }
                        }
                        else {
                               console.log("User is awaiting authorization .. callback either failed for fyers / upstox / alpha ");
                        }
                     },5000);
                     // NOTE the globalUserCheck in the Storage and regularly clear it when user authenticated 
                        StorageUtils._save(CommonConstants.globalUserCheck, globalUserCheck)
           
                   // const res = StorageUtils._retrieve(CommonConstants.fyersToken );
                    
                } catch (error) {
                    // @ts-ignore
                    const {message} = error
                    //toast.error(message ? message : "Something went wrong!")
                    console.log(error)
                    return error
                } finally {
                    dispatch(disableLoader())
                }

                //dispatch(loginFyers([]));
               
            }
           // const sortedData = [...gainers].sort((a: any, b: any) => {
           //     return parseFloat(b.change_amount) - parseFloat(a.change_amount)
           // })
           // dispatch(saveGainers(sortedData))
        } 
         // https://onedinaar.com/.netlify/functions/netlifyupstoxbridge/api/upstoxcallback



    }

    const logByIciciDirectPlatform =  (selectedOption:any) => {
        // check platform type is alpha-vantage or fyers
        // currentPlatform currentPlatform  !==  "Icicidirect"
        if (selectedOption == 4 ) {
            let ICICIKEY = CommonConstants. ICICI_API_KEY;
            let tradekey =  encodeURIComponent(ICICIKEY)
            const apiKey = StorageUtils._retrieve(CommonConstants.platFormKey) ? StorageUtils._retrieve(CommonConstants.platFormKey)  :CommonConstants. ICICI_API_KEY
            if (apiKey !== undefined && apiKey  !== null) {
                if(typeof(apiKey) === "string" ){
                        ICICIKEY= apiKey;
                        console.log("Icicidirect apiKey set ");    
                        tradekey =  encodeURIComponent(ICICIKEY)
                }
                
                console.log("Icicidirect not logged in ");    
                try {
                    dispatch(enableLoader());

                   let iciciDirectLoginProm =  ( async () => {
                        //{params: {function: 'TOP_GAINERS_LOSERS' , apikey:CommonConstants.apiKey}}
                        let res :any = undefined;
                     if (!checkUserLogged()) { 
                      //let res =  await FYERSAPI.get('/fyerscallback' )
                      //  res =   popupCenter(TRADE_LOGIN_URL+tradekey, "IciciDirect Signin")
                            setBrokerAuthUrl(TRADE_LOGIN_URL+tradekey);
                                    setShowBrokerModal(true);setOpenBrokerModal(true);

                      }
                      else {
                        res = true;
                         StorageUtils._save(CommonConstants.globalUserCheck, 'false')
                      }
                        return res;
                    }) ;
                    const result = Promise.all([    iciciDirectLoginProm()]);
                     // run a interval to check the fyersToken 
                    globalUserCheck  =  setInterval( async() => {

                        
                        let result =   await ICICDIRECTAPI.get('/icicidirectgloballogin' ) // /upstoxsdklogin,'/upstoxcallback'
                        console.log("icici direct login called ");
                        let data =  result !== undefined ?    result.data.value : undefined;
                        StorageUtils._save(CommonConstants.fyersToken,data)
                        const res = StorageUtils._retrieve(CommonConstants.fyersToken);
                        if(data !==undefined) {   
                        if (res.isValid && res.data !== null  && res.data !== undefined) {
                           
                            let auth_code = res.data['auth_code'];
                            if (auth_code&& auth_code !== null && auth_code !== undefined) {
                                console.log("User is Authorized ");
                               clearInterval(globalUserCheck);
                            }
                            else{
                                console.log("User is awaiting authorization ");
                            }
                        }
                        }
                        else {
                               console.log("User is awaiting authorization .. callback either failed for fyers / upstox / icici direct / alpha ");
                        }
                     },5000);
                     // NOTE the globalUserCheck in the Storage and regularly clear it when user authenticated 
                        StorageUtils._save(CommonConstants.globalUserCheck, globalUserCheck)
           
                   // const res = StorageUtils._retrieve(CommonConstants.fyersToken );
                    
                } catch (error) {
                    // @ts-ignore
                    const {message} = error
                    //toast.error(message ? message : "Something went wrong!")
                    console.log(error)
                    return error
                } finally {
                    dispatch(disableLoader())
                }

                //dispatch(loginFyers([]));
               
             
            } //
           
           // const sortedData = [...gainers].sort((a: any, b: any) => {
           //     return parseFloat(b.change_amount) - parseFloat(a.change_amount)
           // })
           // dispatch(saveGainers(sortedData))
        } 
         // https://onedinaar.com/.netlify/functions/netlifyupstoxbridge/api/upstoxcallback



    }
    return (
        <div className='flex flex-wrap  items-center gap-2 justify-between  w-full px-3'>
            {/** flex flex-wrap gap-2 bg-white dark:bg-black items-center justify-between w-11/12 mx-auto my-3 */}
            <select value={tab} onChange={(e) => {
                
                dispatch(changeTab(e.target.value))
               
            }}
                    className='p-2 text-sm rounded-lg w-full md:hidden  bg-gray-100 dark:bg-neutral-800 '>
                        {/**  md:w-auto this causes like ears select boxes to appear at the edges  */}
                        {/**p-2 focus-visible:outline-none block rounded-lg bg-greylight dark:bg-greydark text-gretdark dark:text-white  */}
                <option value={'Educate'}>Educate</option>
                <option value={'Observe'}> Observe</option>
                <option value={'Trade'}>Trade</option>
                 <option value={'Position'} >Position</option>
                   <option value={'Subscribe'} >Subscribe</option>
            </select>


            <div className='hidden  px-3 mx-12 md:flex relative flex-wrap items-center justify-between'>{/** bg-sky-500 hover:bg-sky-700 bg-brandblue */}
                {
                    arr.map(item => {
                        return <button key={item.key} onClick={() => {
                            dispatch(changeTab(item.title))
                        }} className={` mx-3 hover:scale-105 active:text-green-400 rounded-lg transition-all py-1 cursor-pointer toggle-tab`}>
                            <h1 className='text-md text-black dark:text-white  hover:text-blue-500  active:text-green-400 font-semibold'>{item.title}</h1>
                        </button> 
                    })
                }
                <div 
                    className={`hidden ml-16 md:flex relative py-4 flex-wrap items-center toggle-line ${tab === "Educate"  ? 'move-line' : tab === "Observe" ? 'move-line1' :  tab === "Trade" ? 'move-line2' :  tab === 'Position' ? 'move-2next' :  tab === 'Subscribe' ? 'move-line3' : ''}`}></div>
                  {/** hidden flex-wrap items-center justify-between */}
                </div>
           {/* <div className='hidden md:flex flex-wrap items-center justify-between'>
                {
                    sortMapper.map(item => {
                        return <Chip key={item.key} isSelected={sortType === String(item.key)} text={item.title}
                                     onClick={() => {
                                         if (item.key === 1) {
                                             sortByPercentage()
                                         } else {
                                             sortByPrice()
                                         }
                                         setSortType(String(item.key))
                                     }}/>
                    })
                }
            </div>*/} 
            {/*  <select value={sortType} onChange={(e) => {
                if (e.target.value == '1') {
                    sortByPercentage()
                } else {
                    sortByPrice()
                }
                setSortType(e.target.value)
            }}  
                    className='p-2 focus-visible:outline-none block md:hidden rounded-lg bg-greylight dark:bg-greydark text-gretdark  dark:active:text-green-700  '> 
                <option value={1}>Sort by Percentage</option>
                <option value={2}>Sort by Price</option>
            </select>*/} {/* dark:text-white */}
        

            <div className={` ${isMobile ? '':'hidden' } md:flex  mr-6 flex-wrap   items-center  justify-between`}>
                 {/* 
                  <select className="p-2 rounded-lg bg-greylight dark:bg-greydark text-gretdark dark:text-white focus-visible:outline-none">
                  md:hidden
                 Alpha-Advantange or Fyers selection */}
              
             

                  <select value={platformType} onChange={(e) => {
                                    if (e.target.value == '1') {
                                        console.log(" selected " + e.target.value)
                                    } else if (e.target.value == '2') {
                                        logByPlatform()
                                        console.log(" selected " + e.target.value)
                                    } else if (e.target.value == '3') {
                                        logByUpstoxPlatform()
                                        console.log(" selected " + e.target.value)
                                    }
                                    else if (e.target.value == '4') {
                                        logByIciciDirectPlatform(e.target.value)
                                        console.log(" selected " + e.target.value)
                                    }
                                    setPlatformType(e.target.value)
                  }}  
                    className='p-2 focus-visible:outline-none  rounded-lg bg-greylight dark:bg-greydark text-gray-900 dark:text-gray-100  dark:active:text-green-700  '> 
                    {/* dark:text-white */}
                <option value={1}>Alph-Vantage</option>
                <option value={2}>Fyers</option>
                <option value={3}>Upstox</option>
                 <option value={4}>Icicidirect</option>
               </select>
                {/**   ${FYERSMODALCALLBAKURL}/.netlify/functions/netlifystockfyersbridge/api/fyersauthcodeverify` */}
               </div>
                   <BrokerAuthModal  isOpen={showBrokerModal}
                    authUrl={brokerAuthUrl}
                    onClose={() => setShowBrokerModal(false)}
                    />
                
                {/*  <BrokerAuthModalImproved
                isOpen={openBrokerModal}
                brokerName="Fyers"
                authEndpoint={FYERSAPIURL}
                redirectUri={ brokerAuthUrl}
                onClose={() => setOpenBrokerModal(false)}
                onSuccess={handleBrokerSuccess}
                onError={handleBrokerError}
         /> */}

        </div>
    )
}

export default Menu
