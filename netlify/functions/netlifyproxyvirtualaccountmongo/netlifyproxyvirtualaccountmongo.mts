/*import { Context } from '@netlify/functions'

export default (request: Request, context: Context) => {
  try {
    const url = new URL(request.url)
    const subject = url.searchParams.get('name') || 'World'

    return new Response(`Hello ${subject}`)
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    })
  }
}
*/
/** 
 in case the import { Buffer } from "buffer"; does not work 
 /// <reference types="node" />

 */
import { Context } from '@netlify/functions'
//import { environment } from 'src/environment/environment';
import { environment } from '../../../utils/constants'; //import { CommonConstants, Quote } from '@/utils/constants';
import { isNullOrUndefined } from '../../../utils/constants';
//import { razorpay } from "@lib/razorpay"
import Razorpay from 'razorpay';
import { Buffer } from "buffer";

//declare const Buffer;
let localSite = 'localhost:8000';
var localSiteStrings = [localSite, 'localhost:8888', 'localhost:8080', 'localhost:4200', 'localhost:3450'];
var regex = new RegExp(localSiteStrings.join("|"), "i");
let ourDomainPage = 'https://onedinaar.com/'

export default async (request: Request, context: Context) => {
  try {
    const url = new URL(request.url)
    let min = 230;
    let max = 500;
      let isEmptyFetchAllPayRequest = false;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let    razorpayKey='rzp_test_2853QGpWUiQAri' ; //'rzp_test_stNGdMn4H9FjoR',
    let      razorpaySecret= 'X6WVCVKSrAkQS3EBAmkNNagW';
    var instance = new Razorpay({ key_id:  razorpayKey, key_secret:razorpaySecret});
  

    if (request.method === "POST" || request.method === "GET") {
             
              let callingSite =request.headers.get("Referer")
    let userAgentCase1 = request.headers.get("user-agent") || "";
      //  event.headers["user-agent"] || "";
        let isMobileCase1 = /iPhone|iPad|iPod|Android/i.test(userAgentCase1);
        ourDomainPage = getOurDomainPage(callingSite,isMobileCase1)

    if (!request.body || Object.keys(request.body).length === 0) {
          console.log("  Request body is empty" );
          console.log(" callingSite or request.headers.get('Referer') "+callingSite );
           console.log("ourDomainPage ::  "+ourDomainPage );
          (!isNullOrUndefined(instance)?   console.log("Razorpay instance PRESENT ::  "  ) :   console.log("Razorpay instance ABSENT  ::  " )   )

          isEmptyFetchAllPayRequest = true;
    }   

    const subject = url.searchParams.get('name') || 'World'
    let amt =                  url.searchParams.get('amount') ; //|| 5000
    let cur =               url.searchParams.get('currency'); // || 'INR'
    let recpt =  url.searchParams.get('receipt') || 'receipt'+random
    let n1  =                url.searchParams.get('location') || 'Pune '+random
    let n2  =             url.searchParams.get('description') || 'Store Notify Subscription '
     
      console.log("searchParams ::  "+JSON.stringify({ amt , cur , recpt,n1 , n2 }) );


  /**    USUAL RESPONSE 
  Query Params: [Object: null prototype] { symbol: 'VOLTAS' }
Request reached fetchYahooChart: VOLTAS
Response with status 200 in 116 ms.
Request from ::ffff:192.168.1.6: GET /.netlify/functions/netlifyproxyrazorpayment?amount=1&currency=INR&receipt=razor_receipt_2026-03-04+18:04:44++&location=en-IN&description=Life+time+subscription+virtual+tradning+%40onedinaar.com++
  Request body is empty
 callingSite or request.headers.get('Referer') https://192.168.1.6:8888/
ourDomainPage ::  https://192.168.1.6:8888/
Razorpay instance PRESENT ::
searchParams ::  {"amt":"1","cur":"INR","recpt":"razor_receipt_2026-03-04 18:04:44  ","n1":"en-IN","n2":"Life time subscription virtual tradning @onedinaar.com  "}
Response with status 500 in 10626 ms.
  
   * 
   */
   if (!isNullOrUndefined(amt) && !isNullOrUndefined(cur) && !isNullOrUndefined(recpt)  ) {
     const amountInPaise = Number(amt) *100;
     const safeAmount = Math.max(100, Number(amt) * 100);
     console.log("Razor pay considers  rupee 1 as 100 so the amount from user ")
     console.log("  user amt "+amt+ " ==>  "+safeAmount);
      const order = await     instance.orders.create({
        amount:safeAmount,
        currency: cur,
        receipt: recpt,
        notes: {
            key1: n1,
            key2: n2
        }
        })
        return new Response(  JSON.stringify(order) ,   {
          headers: { 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          
          'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      })
    } // AMT and CURRENCY REQUIRED 
    else {
        
         console.log("UNABLE to create RAZOR ORDER insuficuent params   "+JSON.stringify({ amt , cur , recpt,n1 , n2 }) );
    }
    /*
          The from and to fields in the request must be valid UNIX timestamps in seconds.
            946684800 = Jan 1, 2000
            4765046400 = Jan 1, 2121
            const fromDate = Math.floor(new Date('2024-01-01').getTime() / 1000); // in seconds
            const toDate = Math.floor(new Date().getTime() / 1000); // now
   
    */


    if (![...url.searchParams].length && request.method === "GET" && isEmptyFetchAllPayRequest ) {
            console.log(" GET request with not query parameters for payments list and no request body .");
           try {

            const currentTime =  Math.floor(new Date().getTime() / 1000); // now UNIX time in milliseconds
            const tenMinutesBefore = Math.floor((new Date().getTime() - (3 * 60 * 60 * 1000)) /1000); 
            // Subtract 3 * 60 minutes (3 hours) in milliseconds

            console.log("Current Time (ms):", currentTime);
             convertMillisecondsToDate(currentTime+"")
            console.log(" 3 hours Minutes Before (ms):", tenMinutesBefore);
            
             convertMillisecondsToDate(tenMinutesBefore+"")

            const payments = await instance.payments.all({  
                    from:  tenMinutesBefore, 
                  to:  currentTime ,
                   count: 5 });
             


           //  const encodedHeader = encodeJsonToHeader(JSON.stringify(payments));
             const encodedHeader = encodeJsonToHeader(payments as unknown as Record<string, unknown>);
             if(!isNullOrUndefined(payments))  { 
                  console.log(" payments  found.");
              if (isMobileCase1){
                  console.log(" request made from mobile ");
                return new Response(  JSON.stringify({ success: true, items: payments.items }) ,   {
                  headers: { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  
                  'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS',
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                  }
                 })

              }
              else { 
               console.log(" request made from web desktop laptop ");
                 return new Response( JSON.stringify({ success: true, items: payments.items }), {
            //       status: 302,  // Corrected from statusCode: 302
                  headers: { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                   "X-Custom-Header":`${ encodedHeader}`,
            //      'Location': `${ourDomainPage}customeronboard?customboardingheader=${encodedHeader}`,
                  'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS',
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                  }
                 })
              }
            }

            //res.status(200).json({ success: true, items: payments.items });

          } catch (error) {
            console.log("Error fetching payments:", error);

             new Response(  JSON.stringify({  success: false, message: "Failed to fetch payments" }) ,   {
                  headers: { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  
                  'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS',
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                  }
                 })


           // res.status(500).json({ success: false, message: "Failed to fetch payments" });
          }
    }


    if (![...url.searchParams].length && request.method === "POST" && isEmptyFetchAllPayRequest ) {
        console.log("No query parameters found.");
       const currentTime = Date.now(); // Current time in milliseconds
      const minutesBefore = currentTime - (3*60 * 60 * 1000); 
      // Subtract 3 * 60 minutes (3 hours) in milliseconds

      console.log("Current Time (ms):", currentTime);
      convertMillisecondsToDate(currentTime+"")
      console.log(" Minutes Before (ms):", minutesBefore);

      convertMillisecondsToDate(minutesBefore+"")

      const payments = await     instance.payments.all({
          from:  minutesBefore, 
          to:  currentTime ,
          count: 5
      });

      

     // const encodedHeader = encodeJsonToHeader(JSON.stringify(payments));
      const encodedHeader = encodeJsonToHeader(payments as unknown as Record<string, unknown>);
    
      if(!isNullOrUndefined(payments))  { 
        console.log(" payments  found.");
        if (isMobileCase1){
             console.log(" request made from mobile ");
              return new Response(  JSON.stringify(payments) ,   {
            headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            
            'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
           })

        }
        else { 
          console.log(" request made from web desktop laptop ");
           return new Response( null, {
             status: 302,  // Corrected from statusCode: 302
            headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
             "X-Custom-Header":`${ encodedHeader}`,
            'Location': `${ourDomainPage}customeronboard?customboardingheader=${encodedHeader}`,
            'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
           })
        }
      }
      // 

 
    } 
      //https://onedinaar.com/.netlify/functions/netlifyproxyrazorpayment?payment_id=pay_QE48dW5Tgq42SA 
     const paymentId = url.searchParams.get('payment_id')

    if (!isNullOrUndefined(paymentId)) {
        console.log(" query payment_id   found.");
        const currentTime = Date.now(); // Current time in milliseconds
        const tenMinutesBefore = currentTime - 10 * 60 * 1000; // Subtract 10 minutes in milliseconds

        console.log("Current Time (ms):", currentTime);
        console.log("10 Minutes Before (ms):", tenMinutesBefore);

        const payments = await     instance.payments.fetch( paymentId);

      // const encodedHeader = encodeJsonToHeader(JSON.stringify(payments));
       const encodedHeader = encodeJsonToHeader(payments as unknown as Record<string, unknown>);
    
       if(!isNullOrUndefined(payments))  { 
          if (isMobileCase1){
           return new Response(  JSON.stringify(payments) ,   {
            headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
           })
        }
         else { 
           return new Response( null, {
             status: 302,  // Corrected from statusCode: 302
             headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
             "X-Custom-Header":`${ encodedHeader}`,
            'Location': `${ourDomainPage}customeronboard?customboardingheader=${encodedHeader}`,
            'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
           })
         }
       }
    } 
    
    //CHECK of the request contains the PAYment id i.e pay_id=pay_XXXXXXX 
    const payId = url.searchParams.get('pay_id')

    // return the payments 
    if (!isNullOrUndefined(payId)) {
      const order = await instance.payments.fetch(payId)
      return new Response(  JSON.stringify(order) ,   {
        headers: { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        
        'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
      })
    }



    let queryPayments =  url.searchParams.get('allPayments'); // || 'World'

  if(!isNullOrUndefined(queryPayments) && queryPayments==='yes' ) {
     const currentTime = Date.now(); // Current time in milliseconds
      const tenMinutesBefore = currentTime - 10 * 60 * 1000; // Subtract 10 minutes in milliseconds

      console.log("Current Time (ms):", currentTime);
      console.log("10 Minutes Before (ms):", tenMinutesBefore);

      const payments = await     instance.payments.all({
          'from': +tenMinutesBefore, 
           'to': +currentTime
      });
    
      if(!isNullOrUndefined(payments))  { 



        return new Response(  JSON.stringify(payments) ,   {
        headers: { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        
        'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
       })
      }
  }

 }
  else if (request.method === "OPTIONS") {
    const res = new Response();

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.append("Access-Control-Allow-Headers", "*");
    res.headers.append("Access-Control-Allow-Methods", "*");

    return res;
  }

   /* order.then(function (order) {
        console.log(order);
      
      })
      .catch(function (error) {
        console.log(error);
        return new Response(  JSON.stringify(error) ,   {
          headers: { 'Content-Type': 'application/json' },
      })
      })
      */
     // res.status(201).json({ order })
  
   
  } catch (error:any) {
      console.log('Error occured either creation of order or response generaton :');
      console.log(' detais can be noted from error ::: '+JSON.stringify(error ));
      

    return new Response(error.toString(), {
      status: 500,
    })
  }
}

const getOurDomainPage = (referer: any, isMobile:any) => {
  let callingSite = referer;                     
  if (!isNullOrUndefined(callingSite)) {
    if (callingSite.indexOf(ourDomainPage) > -1) { // this fails if called from POSTMAN 
      console.log('Other domain found:');
    } else if (regex.test(callingSite)) {
      ourDomainPage = 'https://localhost:8000/'
      console.log('local found:');
    }
    else if (callingSite.indexOf("accounts.google.com") > -1) {  // check referer is google or not 

      ourDomainPage = 'https://onedinaar.com/'
    }
    else {
      ourDomainPage = callingSite
    }
  } else {
  
    if (environment.production) {
      ourDomainPage = 'https://onedinaar.com/'
    } else {
      console.log('envirnorment not work local found:');
      ourDomainPage =  'https://onedinaar.com/'  //'https://localhost:8000/'  CHANGE THIS LOCAL UPDATE
    }
     if (isMobile ){
         ourDomainPage = 'https://storenotify.com/'
   }
  }
  return ourDomainPage;

}

// Function to encode JSON to Base64
//Universal version (best if shared code)
const encodeJsonToHeader = (jsonData: Record<string, unknown>): string => {
  const jsonString = JSON.stringify(jsonData);

  if (typeof Buffer !== "undefined") {
    return Buffer.from(jsonString).toString("base64");
  }
  // this is for frontend Browser 
  return btoa(jsonString);
};

 const convertMillisecondsToDate = (timestampStr: string): string => {

  // Convert the string to a number
  let timestamp = Number(timestampStr);

  // Check if the conversion is valid
  if (isNaN(timestamp) || timestamp <= 0) {
    return "**/**/****"; // Masked date format
  }
  // Detect if timestamp is in seconds (10 digits), and convert to milliseconds
  if (timestampStr.length === 10) {
    timestamp *= 1000;
  }

  // Convert milliseconds to a Date object
  const date = new Date(timestamp);

  // Format the date as DD/MM/YYYY
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getUTCFullYear();

   console.log('read time : ', `${day}/${month}/${year}`);

  return `${day}/${month}/${year}`;
}