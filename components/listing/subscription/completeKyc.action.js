import {StorageUtils} from "@/libs/cache"
import {API} from "@/libs/client"
import {disableLoader, enableLoader} from "@/redux/slices/miscSlice"
import {saveCompanyData} from "@/redux/slices/stockSlice"
import { saveBuyOrderBook } from '@/redux/slices/buyOrderBookSlice';  
import { saveSellOrderBook } from '@/redux/slices/sellOrderBookSlice';  
import { createAsyncThunk } from '@reduxjs/toolkit';
import { showModal, showError } from '../../common/service/ModalService';
import { useModal } from '@/providers/ModalProvider';
import {CommonConstants} from "@/utils/constants"
import toast from "react-hot-toast"
import { FYERSAPINSECSV ,FYERSAPITHREESECQUOTE , FYERSAPIORDERBOOKSURL ,  FYERSAPITICKERACCESTOKEN, FYERSAPICOMPLYCUBEURL,
     FYERSAPIKYCORDER , FYERSAPISELLORDER} from '@/libs/client';

      const KYC_URL  = [   FYERSAPIKYCORDER  ] ;
       let PLACEKYCORDERBUTTONID = 'PLACEKYCORDERBUTTONID';
        let PLACEKYCBUTTONSPAN = 'PLACEKYCBUTTONSPAN';
 const localISTDateTimeSec = (inStr) => {
            const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      let  utcDate = new Date();
      try{ 
        if (inStr !==null && inStr !== undefined )
        {         utcDate =  new Date(inStr);  } 
        else {
          utcDate = new Date();
        }
       }catch(derr){
        utcDate = new Date();
        console.log("ticker time no present, current used ")
       }
    const istTime = new Intl.DateTimeFormat('en-GB', options).format(utcDate);
      return istTime;

   }


export const completeKyc = (params = {}   ) => {


    // Destructuring with a default value = {} prevents the crash if params is missing
       const { _id, qty, price ,symbol, firstName, lastName , email, mobileNumber, typeOfEnity  , dob, showFramerModal, hideModal, mountStartVerify } = params;
        //const { _id, qty, price ,symbol  } = orderData;
        let spinnerIsAvailable = true;
       if (showFramerModal ===undefined || hideModal === undefined) {
          console.error("Modal functions were not passed to completeKyc");
          spinnerIsAvailable = false;
         }
      // SAMPLE KYC  Provide user  DATA 
       console.log("completeKyc: _id  "+JSON.stringify( _id, qty, price, symbol))
        console.log("completeKyc: _id  "+JSON.stringify( _id, firstName, lastName, email))
      // THIS CAUSE OVERRIDE DEFAULT SAMPLE DATA   
      //StorageUtils._save (CommonConstants.threeSecSensexDataCacheKey,CommonConstants.sampleThreeSecSensexDataVersion1);
         let client = undefined ; let token = undefined;


    return async (dispatch) => {
     
       // dispatch(enableLoader())
         const existingKycFromCache = StorageUtils._retrieve(CommonConstants.existingKycCacheKey);
          let clientKyc = client;
          let tokenKyc = token;
        if (existingKycFromCache.isValid && existingKycFromCache.data !== null) {
             console.log("existingKyc: available  " )
              let parseAll = JSON.parse(existingKycFromCache.data);
              console.log('parseAll: ', JSON.stringify(parseAll));

           // let dArray = existingKycFromCache.data["d"];
          let dArray = existingKycFromCache.data["d"] ? existingKycFromCache.data["d"] : (  parseAll.d ? parseAll.d : '') ;
          if(dArray !==undefined && dArray !==null && Array.isArray(dArray)){
             console.log("dArray from cache available  " +JSON.stringify(dArray))

            let firstObj = dArray[0];
            let vObj =  firstObj ; //["v"];
            const parsedData =  vObj;
            const parsedMetaData =vObj;
            const parsedOrderId  = parsedMetaData["id"];
             console.log("existingKyc: order_id " + parsedOrderId);
            if ( parsedOrderId === _id ||  parsedData.id === _id ) {
                 console.log("existingKyc: avaialble as  "+JSON.stringify( _id))

               // dispatch(saveBuyOrderBook(parsedData))
                // THIS RETUNRN CAUSING PROBLEM not FIRING the BELOW fyersgetbsecequote SENSEX QUOTE LIVE
               // return;
            }else {
                 console.log("existingKyc:  not avaiable  "+JSON.stringify( _id)+" not found ")
                  console.log("existingKyc:  "+JSON.stringify(parsedData))
                //   dispatch(saveBuyOrderBook([parsedData]))
            }
          } // dArray CHECK 
          else {
             console.log("dArray from cache not present or not array  " )
          }
        }
        else {
             console.log("existingKyc: unavailable  " )
        }


        try {
             // FETCH IF KYC already processed only when USER LOGGED IN has the toek n
 
               // IFF Logged in fetch the BUY Book 
         const res1 = StorageUtils._retrieve(CommonConstants.fyersToken);
       // if (res1.isValid && res1.data !== null &&  res1.data !== undefined) {
            
           // let auth_code = res1.data['auth_code'];
           // if (auth_code&& auth_code !== null && auth_code !== undefined) {
             //   console.log("User is  Authorized ");
                console.log("User is  Authorization skipped as user is Guest USer ");
             //   console.log("User fetch  profile authoristaion ");
                  // fyersaccesstoken
                   const fetchAuthToken = async () => {

                     try {
                                          
                          const res = await API.get(FYERSAPITICKERACCESTOKEN , {params: { "auth_code" : auth_code }});
                          const text = await res.data ;
                          StorageUtils._save(CommonConstants.recentUserKycToken, text)

                          // sTOP the FRAMER 
                              (spinnerIsAvailable ?   setTimeout(hideModal, 300): console.log("Spinner unavailavle to close ") ) ;

                          // GET THe KYC  
                           const kycBook = await API.get(FYERSAPICOMPLYCUBEURL , {params: { "auth_code" : auth_code }});
                            const orderKycData = await kycBook.data ;
                            // https://192.168.1.3:8888/.netlify/functions/netlifystockfyersbridge/subscribe/complycubeKyc  
                            // send the { client , token }
                            if( orderKycData !==undefined && orderKycData !==null ) {  
                                
                                 client =    orderKycData.client; 
                                 token = orderKycData.token;
                                 clientKyc = client;
                                 tokenKyc = token;
                            console.log(" return from  "+FYERSAPICOMPLYCUBEURL+" ");
                            console.log(" clientKyc  "+JSON.stringify(clientKyc)+" ");
                            console.log(" tokenKyc  "+JSON.stringify(tokenKyc)+" ");

                                        dispatch(showModal({ title: 'Id Generation Status', message: `Client ${firstName} \n ${lastName} \n Post Kyc... id will be emailed `, }  ));

                                  }
                                  else {
                                    console.log(" return from  "+FYERSAPICOMPLYCUBEURL+" empty or not parseable " );
                                  }
                          // PARSE and SEGREGATE ORDER BOOK fill recentBuyOrderPlaced
                          // let orderRecent =     parseOrderBook (orderData); 
                           // WHILE PLACEING ORDER WE DO NOT NEED THIS  DISABLE the PLACE ORDER BUTTON NOT NEEDED 
                          /*
                           if(orderRecent !== null && orderRecent !== undefined){
                           el.removeAttribute("disabled");
                           }else {
                             //DISABLE the BUYL BUTTON 
                             // SET BUYLED BUTTON IN GREE 
                              let el = document.getElementById(PLACEORDERBUTTONID);  // GLOBAL DOM ID sensex-status
                               if(el !==null && el !== undefined){
                                el.removeAttribute("enabled");
                                 el.setAttribute("disabled","true");
                                 
                               }
                           }*/
                             // WHILE PLACEING ORDER WE DO NOT NEED THIS  DISABLE the PLACE ORDER BUTTON NOT NEEDED 
                          return text;
                     }
                     catch(erer){
                      console.log("Auth token fetch Error ");
                      console.log("The User is Guest , so proceed further  ");
                         // sTOP the FRAMER 
                         if (spinnerIsAvailable ){
                            setTimeout(hideModal, 300)
                         }

                            //  (spinnerIsAvailable ?   setTimeout(hideModal, 300):  setTimeout( () => { console.log("Spinner unavailavle to close ") } , 300) ) ;

                          // GET THe KYC  
                           const kycBook = await API.get(FYERSAPICOMPLYCUBEURL , {params: {  "id" : _id, 
                                       "mobileNumber":mobileNumber ,  lastName:lastName, dob:dob,  firstName: firstName,  email:email  ,typeOfEnity:typeOfEnity    }});
                            const orderKycData = await kycBook.data ;
                            // https://192.168.1.3:8888/.netlify/functions/netlifystockfyersbridge/subscribe/complycubeKyc  
                            // send the { client , token }
                            if( orderKycData !==undefined && orderKycData !==null ) {  
                                
                                 client =    orderKycData.client; 
                                 token = orderKycData.token;
                                 clientKyc = client;
                                 tokenKyc = token;
                            console.log(" return from  "+FYERSAPICOMPLYCUBEURL+" ");
                            console.log(" clientKyc  "+JSON.stringify(clientKyc)+" ");
                            console.log(" tokenKyc  "+JSON.stringify(tokenKyc)+" ");

                                        dispatch(showModal({ title: 'Id Generation Status', message: `Client ${firstName} \n ${lastName} \n ID Generated `, }  ));
                                      // should enable the COMPLY CUBE KYC CLIENT mount web-sdk as the client and token are generated 
                                        if(mountStartVerify !==undefined){
                                          let mountStartVerification = true;
                                          let clientToken = { ...clientKyc , token:tokenKyc};
                                        console.log(" call back to Mount Start Verification invoked   ");

                                             mountStartVerify(mountStartVerification, clientToken );
                                        }
                                  }
                                  else {
                                    console.log(" return from  "+FYERSAPICOMPLYCUBEURL+" empty or not parseable " );
                                  }



                        // return '';
                     }

                   };
               // READ KYC FROM THE RECENT completeKyc response 
                  const recentKycPlace = StorageUtils._retrieve(CommonConstants.recentKycExclusive);
             if(recentKycPlace !==null && recentKycPlace !== undefined ){
                console.log("Kyc  recentKycExclusive "+JSON.stringify(recentKycPlace));
                /*recentOrderPlace {"isValid":true,"data":"{\"id\":\"25080200003993\",\"exchOrdId\":\"\",\"exchange\":10,\"symbol\":\"NSE:NIFTY2580724650PE\",\"limitPrice\":234.4,\"side\":-1}"}
                */ 
                 let orde =    JSON.parse(recentKycPlace.data);
                 let order_id =   orde.id ;

                   console.log("KYC selected for id  "+order_id);
             // if(order_id !==null && order_id !== undefined) {  
               let fetchKYCORDERStatus = undefined;
                  if( (clientKyc !==undefined && clientKyc !==undefined && tokenKyc !==undefined && tokenKyc !==null ) || (client !==undefined && client !==null && token !==undefined && token !== null) ){


                  
                  fetchKYCORDERStatus = async (acctoken) => {
                      for (let endP = 0 ; endP < KYC_URL.length ; endP ++) { 
                       try {
                         // const sym = symbol; //'NIFTY2581424400CE';
                       /*  const params = new URLSearchParams({
                           // authcode: auth_code ,  //  localStorage.getItem(tokenKey),
                            interval: '1m',
                            limit: '100',
                            ticker:sym,
                            id : order_id,
                            access_token: acctoken,
                            price: price,
                            qty:qty
                            });
                            */
                          StorageUtils._save(CommonConstants.remoteServerComplyCubeErrorBasic,"");
                          // let  buyOrderTTL =  StorageUtils._retrieve(CommonConstants.recentBuyledOrder)
                           let  kycOrderTTL =  StorageUtils._retrieve(CommonConstants.recentKycExclusive)
                           let tt = 0;
                            try { 
                             kycOrderTTL.ttl !==undefined ? kycOrderTTL.ttl :0;

                            } catch(tterr){
                              console.log('kycOrderTTL time not captured ');
                             }
                          let comprisedKYCOrder=      JSON.parse( StorageUtils._retrieve(CommonConstants.recentKycExclusive).data);
                               console.log("Kyc recentKycExclusive  var :comprisedKYCOrder : "+JSON.stringify(comprisedKYCOrder));
                         //   let comprisedSellOrder=      JSON.parse( StorageUtils._retrieve(CommonConstants.recentSellledOrder).data);
                          const sym = symbol; //'NIFTY2581424400CE';
                         const params = new URLSearchParams({
                           // authcode: auth_code ,  //  localStorage.getItem(tokenKey),
                            interval: '1m',
                            limit: '100',
                            firstName: firstName, lastName: lastName , email:email, typeOfEnity : 'person' , dob: dob,
                            
                            id : comprisedKYCOrder._id,
                            access_token: acctoken,
                            
                            });

                            let { _id, firstName , lastName   } = comprisedKYCOrder;
                             let { typeOfEnity   , scheduled } =  comprisedKYCOrder;
                              let mobileNumber = comprisedKYCOrder.mobileNumber;
                            if ( _id !==undefined && firstName !==undefined && lastName !==undefined && sym1 !== undefined){ 
                             console.log("comprisedKYCOrder : -> "+JSON.stringify({  "id" : _id,
                            "mobile":mobileNumber ,   email:email,  firstName: firstName,
                            lastName:lastName ,  typeOfEnity:typeOfEnity   , scheduled:scheduled }));
                            }


                    const fetchData = createAsyncThunk('data/fetch', async (_, { rejectWithValue }) => {
                          try {

                             // 1. Immediately trigger the spinner
                                showFramerModal({ 
                                  status: 'loading', 
                                  message: 'Fetching kyc...' 
                                });
                                  let { id  } = clientKyc ; let { token } = tokenKyc; 
                               const res = await API.get(FYERSAPIKYCORDER , {params: {  "id" : _id, clientId:id , token : token,
                                       "mobileNumber":mobileNumber ,  lastName:lastName, dob:dob,  firstName: firstName,  email:email  ,typeOfEnity:typeOfEnity    }});  //   "access_token" : acctoken ,
                              // Axios auto-parses JSON
                              const responseData = res.data;
                              let kycOrderJSON = responseData;
                               let resJSON = responseData;
                            // Safe parsing SUCCESS CASE 
                                console.log("kycOrderJSON "+JSON.stringify(kycOrderJSON));

                              /*  showModal({ 
                                    status: 'success', 
                                    message: `Order for ${qty} shares of ${symbol} placed at market.` 
                                  });*/
                                  
                                  // Auto-hide success after 3 seconds
                                   // Auto-hide success after 3 seconds
                                      (spinnerIsAvailable ?   setTimeout(hideModal, 300): console.log("Spinner unavailavle to close ") ) ;
                               
                                if (kycOrderJSON !==undefined) {
                                   if (kycOrderJSON["FYERS"] !==undefined){
                                      let sym = kycOrderJSON["FYERS"];
                                       dispatch(showModal({ title: 'Kyc Status', message: `${sym} sent `, }  ));
                                       return;
                                   }
                                      const orderKycData =kycOrderJSON ;         // Full object with n, v, s
                                      // Optional: destructure needed fields
                                      const {
                                        code, // last firstName
                                        message, // change percentage
                                      id ,  // change in value
                                      s  
                                      } = orderKycData;
                                    if (typeof id !== "undefined" && typeof s !== "undefined" && s === 'ok') {
                                        console.log("KYC SUCCESS ");
                                        // SET the CACHE  recentKycOrder
                                        StorageUtils._save(CommonConstants.recentKycOrder,JSON.stringify(responseData));
                                        //remoteServerComplyCubeErrorBasic
                                        StorageUtils._save(CommonConstants.remoteServerComplyCubeErrorBasic,"");
                                        // SET KYC BUTTON IN GREE 
                                              let el = document.getElementById(PLACEKYCORDERBUTTONID);  // GLOBAL DOM ID sensex-status
                                           //   let quoteValue = firstName;
                                            //  let tickerData = quoteValue;
                                           //   let sym = mobileNumber;  // tickerData["symbol"];'SENSEX-INDEX'
                                           //   let orderid =id //  tickerData["lp"];
                                            
                                              let time =  localISTDateTimeSec(tt) ;// localISTDateTimeSec(tt)//tickerData["tt"]
                                         //     sensexQue.push({time:time, orderid :orderid});
                                                console.log('time '+JSON.stringify(time) );  // + "order_id  "+ orderid
                                            //  updateBestMatches1(sensexQue);
                                              console.log(" kyc status "+JSON.stringify(orderKycData ))  // JSON.stringify( { sym , orderid, time  })
                                              if(el !==null && el !== undefined){
                                              // el.textContent = time + " :: "+ sym +" :: "+ firstName;
                                                  let kycButtonSpan = document.getElementById(PLACEKYCBUTTONSPAN);
                                                  if(kycButtonSpan !==null && kycButtonSpan !== undefined){
                                                    kycButtonSpan.textContent = 'KYC  '+orderKycData.id ; //+orderid ;
                                                  }
                                                  // SKIPPED AS the HEADING DIV CLARIFY the SYMBOL
                                                  /*let symbolEl = document.getElementById(SENSEXBUYSYMBOL);
                                                  if(symbolEl !==null && symbolEl !== undefined){
                                                      symbolEl.textContent =   sym ;
                                                  }*/
                                                  // update firstName and color based on previus firstName 
                                            // let priceSpan = document.getElementById(SENSEXBUYPRICE);
                                              //   if(priceSpan !==null && priceSpan !== undefined){
                                                
                                                  //      priceElement.textContent = firstName;

                                                // SKIPPED FOR NOW 
                                                // updatePriceFromStream( firstName, SYMBOL);
                                                // }
                                              }
                                     // 1. Return the success message/data here!
                                     //   return {
                                     //       message: "Sell order executed successfully!",
                                      //      orderData: { sym , orderid, time  } // Pass the actual response object
                                     //   };    
                                       const options = {
                                                timeZone: 'Asia/Kolkata',
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                hour12: false
                                              };
                                              let  utcDate = new Date();
                                      let istTime =   new Intl.DateTimeFormat('en-GB', options).format(utcDate);
                                       dispatch(showModal({ title: 'Kyc Status', message: `${sym} ${istTime} sent `, }  ));
                                     // return rejectWithValue({ message: `Order ${sym} ${orderid} ${istTime} sent ` })       
 
                                  }     else {
                                      console.warn("KYC NOT  availalbe  (e.g., polling or WebSocket).");
                                       const options = {
                                                timeZone: 'Asia/Kolkata',
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                hour12: false
                                              };
                                              let  utcDate = new Date();
                                      let istTime =   new Intl.DateTimeFormat('en-GB', options).format(utcDate);
                                      // from above we may get the orderid in these variables 
                                      // id , code , 
                                      /*
                                      code :-99
                                      message: RED:Margin Shortfall: INR 2,78,806.74 Available:INR 1,774.51 for C-XV31360 [FYERS_RISK_CUG]
                                      s: error
                                      id :25093000494869
                                      */
                                     if (typeof id !== "undefined" && typeof s !== "undefined" ) {
                                        order_id = id;
                                       dispatch(showModal({ title: 'KYC Status', message: `${message} ${istTime} sent `, }  ));
                                       return;
                                     }
                                        if(resJSON?.error && resJSON?.error?.message && order_id !==undefined ){
                                        console.log("ERROR KYC message   " );
                                        StorageUtils._save(CommonConstants.recentKycOrderStatus,JSON.stringify(resJSON?.error));
                                         return rejectWithValue({ message: resJSON?.error?.message });  
                                        
                                        // SET the STATUS BUYSTATUS DIV 
                                            //   let buyDIVSpan = document.getElementById(BUYSTATUS);
                                            //   if(buyDIVSpan !==null && buyDIVSpan !== undefined){
                                            //     console.log("ERROR Buyinf  Order message   "+resJSON?.error?.message  );
                                            //       buyDIVSpan.textContent =  resJSON?.error?.message;
                                            //   }
                                        }

                                    }
            
                              /* if(bestMacthes1["bestMatches"] !==undefined && Array.isArray(bestMacthes1["bestMatches"]) )
                                    {  
                                      console.log("bestMacthes total recros " + bestMacthes1["bestMatches"].length);
                                      console.log("bestMacthes 5 record " + JSON.stringify(bestMacthes1["bestMatches"].slice(0, 5)));
                                        const lastFive = JSON.stringify(bestMacthes1["bestMatches"].slice(-5));
                                        console.log("bestMacthes last 5 record "  + lastFive);
                                          const bestMacthes = { bestMatches: [...bestMacthes1.bestMatches] };
                                        StorageUtils._save(CommonConstants.recentSensexTickersKey, bestMacthes.bestMatches) //StorageUtils._save(CommonConstants.recentEquitiesKey);
                                        // EMPTY the SAMPLE ticker Data 
                                        StorageUtils._save(CommonConstants.threeSecSensexDataCacheKey,CommonConstants.sampleThreeSecSensexDataVersion1);
                                        dispatch(saveQuoteBook(bestMacthes.bestMatches)); 
                                      
                                      } 
                                */     
                            } // dArray is not a ARRAY 
                            else { 
                                if(resJSON?.error && resJSON?.error?.message && order_id !==undefined ){
                                        console.log("ERROR KYC message   " );
                                  StorageUtils._save(CommonConstants.recentKycOrderStatus,JSON.stringify(resJSON?.error));
                                   
                                  // SET the STATUS BUYSTATUS DIV 
                                    //   let buyDIVSpan = document.getElementById(BUYSTATUS);
                                    //   if(buyDIVSpan !==null && buyDIVSpan !== undefined){
                                    //     console.log("ERROR Buyinf  Order message   "+resJSON?.error?.message  );
                                    //       buyDIVSpan.textContent =  resJSON?.error?.message;
                                    //   }
                                }
                                console.log("Unable to do KYC please check  "+order_id  );
                                

                            }
                          } catch (err) {

                            return rejectWithValue({ message: err.message });
                          }
                    }); // createAsyncThunk         
                      // As written, it's called with no explicit payload:
                      dispatch(fetchData());   















                      //   const res = await API.get(FYERSAPIBUYACCESTOKEN , {params: { "auth_code" : auth_code }});
                     //    const res = await API.get(FYERSAPITHREESECQUOTE , {params: { "auth_code" : auth_code ,"symbol":'SENSEX-INDEX'}});
                    /*     const res = await API.get(FYERSAPIBUYORDER , {params: { "auth_code" : auth_code, "id" : order_id, "access_token" : acctoken ,"symbol":sym ,   firstName: firstName,
                            lastName:lastName }});
                       // Axios auto-parses JSON
                      const responseData = res.data;
                      let resJSON = responseData;
                      */
                     // Safe parsing SUCCESS CASE 
                  /* {    
                    code: 1103,
                    message: 'Successfully buyled order',
                    s: 'ok', 
                    id: '52104097626'
                    }        
                    */ 
                       // Safe parsing FAILE  CASE 
                     /* {"FYERS":"FYERS Buy Order  CALL NO REACH","error":{"code":-51,"message":"invalid order id: 25080200003993","s":"error"}}
                    */
                      // THIS CODE MAY NOT work as resJSON is defined inside the fetchData 
                    /*  try { 
                           console.log("resJSON "+JSON.stringify(resJSON));
                        console.log("resJSON?code "+JSON.stringify(resJSON?.code));
                        console.log("message "+ resJSON?.message );
                        console.log("id  "+resJSON.id);
                      
                        if (resJSON?.code && resJSON?.message  && resJSON.id ) {
                            const kycData = resJSON ;         // Full object with n, v, s
                                                               // Only the "v" part with pricing info
                         // Optional: destructure needed fields
                            const {
                              code, // last firstName
                               message, // change percentage
                             id ,  // change in value
                             s  
                            } = kycData;
                   
                          } // dArray is not a ARRAY 
                          else { 
                              if(resJSON?.error && resJSON?.error?.message && order_id !==undefined ){
                                      console.log("ERROR KYC message   " );
                                StorageUtils._save(CommonConstants.recentKycOrderStatus,JSON.stringify(resJSON?.error));
                                }
                              console.log("Unable to KYC  please check  "+order_id  );
                              }
                      
                      }catch(eert1){

                      }*/
                       
                      
                      
                     }catch (err ){
                       console.log("Exception KYC please check  "+JSON.stringify(err)  );
                       //Netlify TIME OUT set the message inthe LocalStorage 
                       // usually error will contain 
                       // "message":"Request failed with status code 500","name":"AxiosError","stack":"AxiosError: Request failed with status code 500\n  
                       let remoteParsedError =   parseNetlifyError(err);
                       StorageUtils._save(CommonConstants.remoteServerGeneralKycErrorKey , remoteParsedError);
                       
                      }
                    
                   } //FOR LOOP 
                  }
                }
                  
                    fetchAuthToken().then(async aces_token   => { 
                        if (fetchKYCORDERStatus !==undefined){ 
                                  await  fetchKYCORDERStatus(aces_token);
                             }

                     });
              //      } // ORDER ID null or undefined  ORDER ID is not PRESENT while SENDing FRESH ORDER
              } // BUY ORDER CONDITON 

                     console.log("KYC ORDER TRIGGER  ..");
                    
                    //  fetchAuthToken().then(acToken => {
                    //     console.log("Ticker access token fetched ")
                       

                    //  })

                    
              
                //clearInterval(globalUserCheck);
       
 
           
      //  }  else  {
            // @ts-ignore
       //      console.log("User not Authorised ")

           // dispatch(saveCompanyData(null))
       // }
   // }  // AUTH CODE CHECL 
   // else { 
     //     console.log("User not logged  ")
   // }
 } // TRY 
    finally {
            dispatch(disableLoader())
        }
    }
}
