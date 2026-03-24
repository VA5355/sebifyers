
const express = require('express');
const fyersExtra = require('extra-fyers');
const  queue =  require('./tokenQueue.js');
const router  = express.Router()
var path = require('path');
var ejs = require('ejs');
 var fyersV3= require("fyers-api-v3");
const ism = require('@zero65tech/indian-stock-market');
const upstoxClientSdk = require("upstox-js-sdk") 
const FyersAPI =fyersV3.fyersModel

var fyersAPI =  new upstoxClientSdk.ApiClient(true);
//var fyersModel= fyersV3.fyersModel
 // var fyersAPI =  new fyersModel({"path":"./","enableLogging":true}); // new require("fyers-api-v3").fyersModel();
    // var fyersAPI = new FyersAPI()
//var client_id= "7GSQW68AZ4-100"
//var client_id=  'e7a79a25-6f2d-490a-9898-275fd89cbeb6'; // not working         //"JDK56F3KP5-200"; // "7GSQW68AZ4-100" ; // PROD 
var client_id=  'PW3-6Agd37PB52Q6B6DDpYWLuT7b';          //"JDK56F3KP5-200"; // "7GSQW68AZ4-100" ; // PROD 
var secret_key = "ixtzp79svm"; 		 // "MGY8LRIY0M"; // PROD 
//var redirectUrl  = "https://192.168.1.8:56322/fyersauthcodeverify"
var redirectUrl  = 'https://fyerssebi.netlify.app/.netlify/functions/netlifyupstoxbridge/api/upstoxcallback';
//"https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersauthcodeverify"
//var redirectUrl  = "https://store-stocks.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersauthcodeverify"
//var fyers= new fyersModel({"path":"./","enableLogging":true})
//fyers.setAppId(client_id)

//fyers.setRedirectUrl(redirectUrl)
var globalUptox = { 
  access_token : undefined,
  extended_token : undefined,
   user_id :  undefined,
          email : undefined,
          user_name: undefined,
}
var authcode='';
var global_auth_code ='';
var recentUserAuthCode = '';
var globalLogin = undefined;
let iterateObject = function*(obj) {
    for (let k in obj) yield [ k, obj[k] ];
  };
//var URL=fyers.generateAuthCode()
    //use url to generate auth code
//        console.log("Upstox URL " , URL) 

   
     // redirect_uri=https://192.168.1.8:56322/fyersauthcode&response_type=code&state=sample_state
     var axios = require('axios');  // "secret_key":"MGY8LRIY0M",
const { isCallLikeExpression } = require('typescript');
     var data = { "client_id":client_id, " redirect_uri":redirectUrl,
        "response_type":"code", "state":"sample_state"
     };
     var config = {
         method: 'get',
         url: " https://api-t1.fyers.in/api/v3/generate-authcode",
         headers: { 'Content-Type': 'application/json' },
         data : data
     };
     
function getFormattedTimeKey()  {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const min = now.getMinutes().toString().padStart(2, '0');
  const sec = now.getSeconds().toString().padStart(2, '0');
  const ms = now.getMilliseconds().toString().padStart(3, '0');
  return `${day}-${hour}-${min}-${sec}-${ms}`;
}
function isOutsideTradingHours() {
  // Current time in IST
  const now = new Date();
  const istTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  // Convert to minutes from midnight
  const currentMinutes = istTime.getHours() * 60 + istTime.getMinutes();

  // Trading window in minutes from midnight
  const startMinutes = 9 * 60 + 15;   // 9:15 AM = 555 min
  const endMinutes = 15 * 60 + 30;    // 3:30 PM = 930 min

  // Check if outside the range
  return currentMinutes < startMinutes || currentMinutes > endMinutes;
}

function formatDate(date) {
        const dateObj = new Date(date);
        return dateObj.toISOString().slice(0, 10);
      }
//CORS HEADERS for localhost:4200 , localhost:3450, localhost:8888 
function setCORSHeaders( res ) { 
  // CHECK OBJECT is a HTTP Response with send method 
if( res !==null && res !==undefined && typeof(res.send ==='function')){
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
   res.setHeader("Access-Control-Allow-Methods", "*");
}
} 
 /*
UpstoxClient.TradeData
Properties
Name	Type	Description	Notes
exchange	String	Exchange to which the order is associated	[optional]
product	String	Shows if the order was either Intraday, Delivery, CO or OCO	[optional]
tradingsymbol	String	Shows the trading symbol which could be a combination of symbol name, instrument, expiry date etc	[optional]
instrumentToken	String	Identifier issued by Upstox used for subscribing to live market quotes	[optional]
orderType	String	Type of order. It can be one of the following MARKET refers to market order<br>LIMIT refers to Limit Order<br>SL refers to Stop Loss Limit<br>SL-M refers to Stop loss market	[optional]
transactionType	String	Indicates whether the order was a buy or sell order	[optional]
quantity	Number	The total quantity traded from this particular order	[optional]
exchangeOrderId	String	Unique order ID assigned by the exchange for the order placed	[optional]
orderId	String	Unique order ID assigned internally for the order placed	[optional]
exchangeTimestamp	String	User readable time at when the trade occurred	[optional]
averagePrice	Number	Price at which the traded quantity is traded	[optional]
tradeId	String	Trade ID generated from exchange towards traded transaction	[optional]
orderRefId	String	The order reference ID for which the order must be modified	[optional]
orderTimestamp	String	User readable timestamp at which the order was placed	[optional]



 */
function transformCandlesToTimeSeries(data, symbol = "SBET") {
    // https://github.com/upstox/upstox-nodejs/blob/master/docs/TradeData.md
  try {  // data.length !== "ok"
    if (!data || data.length === 0 || !Array.isArray(data)) {//.candles
      throw new Error("Invalid or missing candle data");
    }

    const timeSeries = {};
    let lastRefreshed = null;
 // Sort candles descending by timestamp (optional, to find latest easily)
    const sortedCandles = [...data ].sort((a, b) => b[0] - a[0]);
    for (const [orderTimestamp, averagePrice,  quantity] of sortedCandles) {
      if (!ts || isNaN(open) || isNaN(close)) {
        let high  = averagePrice +20;
        let low = averagePrice - 20; 
        let close =  high - low <100 ? averagePrice * (10 + Math.random() *10) :  averagePrice * (20 + Math.random() *10)
        console.log("issue parsing ",JSON.stringify(orderTimestamp , open , high , low , close ,quantity))
        continue;
        }
      const dateStr = new Date(ts * 1000).toISOString().slice(0, 10); // YYYY-MM-DD
      if (!timeSeries[dateStr]) {
       timeSeries[dateStr] = {
        "1. open": open.toFixed(4),
        "2. high": high.toFixed(4),
        "3. low": low.toFixed(4),
        "4. close": close.toFixed(4),
        "5. volume": quantity.toString()
       };
     }
      if (!lastRefreshed || dateStr > lastRefreshed) {
        lastRefreshed = dateStr;
      }
    }

    return {
      "Meta Data": {
        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
        "2. Symbol": symbol,
        "3. Last Refreshed": lastRefreshed || "N/A",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
      },
      "Time Series (Daily)": timeSeries
    };
  } catch (err) {
    console.error("Error transforming candle data:", err.message);
    return {
      error: "Failed to transform candle data",
      reason: err.message
    };
  }
}


function convertToTimeSeries(data) {
        if (!data || !data.MarketQuote) return [];
      
        const timeSeries = {};
        let metaData = null;
        
         

       data.MarketQuote.map(quote => {
          const d = quote.MarketQuoteDetails;

            // Format date from timestamp
            const date = new Date(d.tt).toISOString().split('T')[0];
             // Build daily time series object
             timeSeries[date] = {
                "1. open": d.open_price,
                "2. high": d.high_price,
                "3. low": d.low_price,
                "4. close": d.lp,
                "5. volume": d.volume
              };
                // Build metadata (assuming we only use the first quote for metadata)
            if (!metaData) {
                metaData = {
                "Information": "Daily Prices (Open, High, Low, Close) and Volumes",
                "Last Refreshed": date,
                "Exchange": d.exchange,
                "Symbol": d.short_name
                };
            }
        
        });

        return {
            "Meta Data": metaData,
            "Time Series (Daily)": timeSeries
          };

        /*
                  

          return {
            symbol: details.short_name || quote.n || quote.s,
            exchange: details.exchange || "NSE",
            timestamp: details.tt, // Assuming `tt` is a valid timestamp in ms
            open: details.open_price,
            high: details.high_price,
            low: details.low_price,
            close: details.lp,
            volume: details.volume
          };
         */
      }
      
    
      
// STEP SHOW the PROFILE , QOUTE OR MARKET DEPHT from ABOVE CALLBACKS 
// 
async function showFYERSPROFILEQUOTES (req ,res , data  ){
    const jsonToTable = require('json-to-table');
    const tabled = jsonToTable(data,'--NA--');


    for (let [ k, v ] of iterateObject(tabled)) {
        console.log({ k, v });
      }
    console.log("DATA ",  JSON.stringify(tabled))
   
    try {
         // FAILED DATA PARSE 
         let dataParsed = '';
         if(data["Upstox"]!==null && data["Upstox"]!== undefined){
            dataParsed = data["Upstox"]
         }
         else {
            dataParsed = data;
         }  
        //res.send(output)
        setCORSHeaders( res )
             res.send("{ data: comming soon }");
        // ejs.renderFile(path.join(__dirname, "views/fyers_quotes_template.ejs"),
        //   {
        //   requesterName : "Vinayak Anvekar",
        //   lastlogin: new Date(),
          
        //   data :  dataParsed ,
        //      TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
        //   })
        //   .then(result => {
        //     fyersTemplate = result;
        //     res.send(fyersTemplate);
        //   });
    } catch (e) {
        console.log(e);
        res.send("{ data: error }" );
    }


}

//-----------------STEP1------------- Upstox REDIRECT --- 
// Auth Code Redirect -------------
// curl --location --request GET https://api-t1.fyers.in/api/v3/generate-authcode?client_id=7GSQW68AZ4-100&redirect_uri='https://192.168.1.8:56322/fyersauthcode'&response_type=code&state=sample_state
// curl --location --request GET "https://api-t1.fyers.in/api/v3/generate-authcode?client_id=7GSQW68AZ4-100&redirect_uri='https://localhost:8888/.netlify/functions/netlifystockfyersbridge/api/fyersauthcode'&response_type=code&state=sample_state"

router.get('/upstoxauthcode', async function (req,res) {
    let s = ''
    let code = ''
    let auth_code= '';
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox REDIRECT QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        s = queryJSON['s'];
          code =queryJSON['code'];
         auth_code= queryJSON['auth_code'];

         console.log(`s: ${s}  code : ${code}  auth_code:  ${auth_code} `);

    }
    else if( req.params !== null && req.params !== undefined && req.params.length > 1){

        console.log("Upstox REDIRECT PARAMS : "+ JSON.stringify(req.params))


    }
    else { 
         console.log("REDIRECT from Fyers is with not PARAMTEREs , or could not PARSE THEM ")

    if(res.data !== null && res.data !==undefined){
        s = res .data['s'];
          code = res .data['code'];
         auth_code= res .data['auth_code'];
        ///
        // 
    }
    }
     setCORSHeaders( res )
    res.send(JSON.stringify({"auth_code" :auth_code}))

});

// NOTIFER CALLBACK ENDPOINT registered in 
// https://account.upstox.com/developer/apps/createapp?appID=364717d0-1f08-4b79-8297-86e0243c3564
// as Notifier webhook endpoint
// this is trggered from  upstoxcallback 
// once the GENERATE ACCESS TOKEN code in reached in the upstoxcallback
//   
// ON the View page fyes_login_template.ejs 
// PROCEED ACCESS button click , is handled by this EVENT HANDLER 
router.get('/upstoxgetaccess', async function (req,res) {
   // 678d46e1-91ac-4b8d-925d-89c8e3015c2b  is given in the https://upstox.com/developer/api-documentation/access-token-request/#request

  // POST /login/auth/token/request/:client_id 

  const axios = require('axios');
   const apikey ='e7a79a25-6f2d-490a-9898-275fd89cbeb6'
    const url = 'https://api.upstox.com/v3/login/auth/token/request/'+apikey;
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const data = {
      'client_secret':  secret_key
    };

    axios.post(url, new URLSearchParams(data), { headers })
      .then(response => {
        /*  {
            "status": "success",
            "data": {
                "authorization_expiry": "1732226400000",
                "notifier_url": "https://initiator-webhook-endpoint"
            }
        }
            status	string	A string indicating the outcome of the request. Typically success for successful operations.
            data	object	Response data for token request
              data.authorization_expiry	string	
                                  An expiration time for the access token generation process, starting from the moment
                                 a initiator requests the token until the 3:30 AM the following day.
              data.notifier_url	string	
                              The Notifier webhook endpoint where the access token is to be sent. The Notifier webhook endpoint must be configured 
                              during the app generation process.
        */
        console.log(response.status);
        console.log(response.data);


      })
      .catch(error => {
        console.error(error.response.status);
        console.error(error.response.data);
      });

    /*let s = ''
    let code = ''
    let auth_code= '';
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox VIEW LOGIN TEMPLATE QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        s = queryJSON['s'];
          code =queryJSON['code'];
         auth_code= queryJSON['auth_code'];
         global_auth_code= auth_code;
         console.log(`s: ${s}  code : ${code}  auth_code:  ${auth_code} `);
         // INVOKE the BELLOW HANDLE Upstox AUTH CODE to GET ACCESS and SHOW SOME CODE 
         // the FUCNTION SHOUD DISPLAY the PAGE 
          setCORSHeaders( res )

        // old logic 
        //await handledFyersRedirectAuthCode(auth_code,req,res);
        await handledUpstoxRedirectAuthCode(auth_code,req,res);

    } */

});
// PROCEED ACCESS button click , is handled by this EVENT HANDLER 
// just return the auth code , to the Next js login page

router.get('/upstoxgetaccessauthcode', async function (req,res) {

    let s = ''
    let code = ''
    let auth_code= '';
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox VIEW LOGIN TEMPLATE QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        s = queryJSON['s'];
          code =queryJSON['code'];
         auth_code= queryJSON['auth_code'];
         global_auth_code= auth_code;
          queue.enqueue({ time:getFormattedTimeKey(), data: global_auth_code });
         console.log(`s: ${s}  code : ${code}  auth_code:  ${auth_code} `);
         //SET MOST RECENT USER authcode 
         recentUserAuthCode = { s: s, authcode :auth_code , code:code  } ;
          
         // INVOKE the BELLOW HANDLE FYERS AUTH CODE to GET ACCESS and SHOW SOME CODE 
         // the FUCNTION SHOUD DISPLAY the PAGE 
         const now = Date.now();
        setCORSHeaders( res )
         res.send(JSON.stringify({ "value" : {"auth_code" :auth_code , "code" :code, "s" :s ,"ttl" :now}}));
        //await handledFyersRedirectAuthCode(auth_code,req,res);


    }

});
// JUST reply wih the recentUserAuthCode as this we have for the Ticker generation 
// from  anither node js application 
// PROCEED ACCESS button click , is handled by this EVENT HANDLER 
// just return the auth code , to the Next js login page

router.get('/upstoxtickerauthcode', async function (req,res) {

    let s = ''
    let code = ''
    let auth_code= '';
    // no need to check the query paream as the request coming from localhost 3020 
    //if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox VIEW LOGIN TEMPLATE QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        s = queryJSON['s'];
          code =queryJSON['code'];
         auth_code= queryJSON['auth_code'];
         global_auth_code= auth_code;
         if(auth_code ===undefined || auth_code ==='' || auth_code === null ){
            // pop the first enqued token from the queue 
            let lastTok =   queue.dequeue();
            if(lastTok !== undefined && lastTok !=='') {
              global_auth_code = lastTok.data;
              auth_code= lastTok.data;
               console.log("queue deque lastTok: "+JSON.stringify(auth_code));
               console.log(`queue deque auth_code:  ${auth_code} `);
             }
         }
         else {
             console.log("auth code is not undefined  : " + JSON.stringify(auth_code));
         }
         console.log(`s: ${s}  code : ${code}  auth_code:  ${auth_code} `);
         //SET MOST RECENT USER authcode 
         recentUserAuthCode = { s: s, authcode :auth_code , code:code  } ;
          
         // INVOKE the BELLOW HANDLE Upstox AUTH CODE to GET ACCESS and SHOW SOME CODE 
         // the FUCNTION SHOUD DISPLAY the PAGE 
         const now = Date.now();
        setCORSHeaders( res )
         res.send(JSON.stringify({ "value" : {"auth_code" :auth_code , "code" :code, "s" :s ,"ttl" :now}}));
        //await handledFyersRedirectAuthCode(auth_code,req,res);


    //}

});
// const fyers = require('extra-fyers');
router.get('/upstoxquicklogin', async function (req,res) {

    try {
        data = { "Upstox":"GOOD MORNING"}
        let symbol = ''; let apikey = '';let resolution = '';let date_format = '';let range_from = '';let range_to = '';let cont_flag = '';
        let authcode =  global_auth_code;
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        let yyyymmddWeekAgo = oneWeekAgo.toISOString().slice(0, 10);
        if( req.query !== null && req.query !== undefined ){
            console.log(" Upstox fyersquicklogin QUERY PARAMS " +JSON.stringify(req.query))
            var queryJSON  = JSON.parse(JSON.stringify(req.query));
            symbol = queryJSON['symbol'];
              apikey =queryJSON['apikey'];
              authcode= queryJSON['auth_code'];
              resolution=queryJSON['resolution'] ? queryJSON['resolution']: 60;
              date_format=queryJSON['date_format']? parseInt(queryJSON['date_format']): 0;
              range_from=queryJSON['range_from'] ? queryJSON['range_from']: yyyymmddWeekAgo;
              range_to=queryJSON['range_to'] ? queryJSON['range_to']: formatDate(oneWeekAgo);
              cont_flag=queryJSON['cont_flag'] ? queryJSON['cont_flag']: "1";
            // global_auth_code= auth_code;
             console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode} `);
        }
        //res.send(output)
        var appId       = client_id ;  //'7GSQW68AZ4-100' PROD APP ID  app_id recieved after creating app
    if( symbol !==null && symbol !== undefined && symbol !== ''){
            console.log("Symbol : "+symbol); 
     if( authcode !==null && authcode !== undefined && authcode !== ''){
            console.log("Authcode : "+authcode);
        var accessToken = authcode;  // access_token recieved after login
        var api = new fyersExtra.Api(appId, accessToken);   // "MGY8LRIY0M", PROD 
      upstox.generate_access_token({"client_id":client_id,"secret_key": secret_key,
            "auth_code":authcode})
        .then(async (response)=>{
        if(response.s=='ok'){
                accessToken = response.access_token;
                console.log("Fyers access_token "+accessToken);
                console.log("Upstox Grants provided  ") 
                api = new fyersExtra.Api(appId, accessToken);
                const x = {
                    fromDate: new Date("2025-05-30T09:15:00"),
                    toDate: new Date("2025-06-01T15:30:00")
                };
                var marketRequest =   {
                    symbol: `NSE:${symbol}-EQ`,
                    resolution: resolution,
                    //date_format: "1",
                    //range_from: range_from,
                    //range_to: range_to,
                    //range_from: "2025-05-30 09:15",
                    //range_to: "2025-06-01 15:30",
                    //range_from: new Date("2025-05-30T09:15:00"), // ✅ Date object
                    //range_to: new Date("2025-06-01T15:30:00"),   // ✅ Date object
                    //range_from: '1717200000', // UNIX timestamp (seconds) — FROM
                    //range_to: '1717286400',   // UNIX timestamp (seconds) — TO
                    //range_from: Math.floor(x.fromDate.getTime() / 1000),
                    //range_to: Math.floor(x.toDate.getTime() / 1000),
                    fromDate: Math.floor(x.fromDate.getTime() / 1000),
                    /** Indicating the end date of records. */
                        toDate:  Math.floor(x.toDate.getTime() / 1000),
                    continuous: true
                    //cont_flag: cont_flag
                }
                 console.log(" Upstox Market Request " +JSON.stringify(marketRequest));
      //var marketresonse = await api.getMarketHistory(marketRequest);
       // await api.getMarketHistory( marketRequest) 
        // List equity and commodity fund limits.
    // await api.getFunds()
            if(api !==null && api !== undefined){
                    console.log("✅ upstox extra api is initialised" );
            }	
            if(fyersAPI !==null && fyersAPI !== undefined){
                fyersAPI.authentications["OAUTH2"].accessToken =  accessToken ; //"SANDBOX_ACCESS_TOKEN";
                 //   fyersAPI.setAppId(appId)
                //fyersAPI.setRedirectUrl("https://url.xyz")
                  //  fyersAPI.setAccessToken(accessToken)
                    const range_to = Math.floor(Date.now() / 1000);
                    const range_from = range_to - (86400 * 1); // 1 day back
                    var inp={
                        "symbol": `NSE:${symbol}-EQ`,
                        "resolution":"60",
                        "date_format":"1",
                        "range_from":   "2025-05-30" , //" "+range_from,
                        "range_to": "2025-06-01" , // " "+range_to,
                        "cont_flag":"1"
                    }
                    
                    console.log("✅ upstox Model api is initialised" );
                    let apiInstance = new fyersAPI.OrderApi();
                    apiInstance.getTradeHistory(apiVersion, (error, data, response) => {
                        if (error) {
                            console.error(error);
                             let wd1 = `NSE:${symbol}-EQ`;
                            let ret = {  "symbol": wd1 , "status" : " Input error "+JSON.stringify(err) };
                             setCORSHeaders( res );
                            res.send( JSON.stringify( ret));

                        } else {
                            console.log('API called successfully. Returned data: ' + data);
                              let wd = `NSE:${symbol}-EQ`;
                             let ret = {  "symbol": wd , "status" : "Data available" }
                             const output = transformCandlesToTimeSeries(data, symbol);
                             console.log(JSON.stringify(output, null, 2));
  
                             setCORSHeaders( res );

                            res.send( JSON.stringify(output));


                        }
                        });
                    /*getTradeHistory(inp).then((response)=>{
                        console.log(response)
                        let wd = `NSE:${symbol}-EQ`;
                        let ret = {  "symbol": wd , "status" : "Data available" }
                        const output = transformCandlesToTimeSeries(response, symbol);
                         console.log(JSON.stringify(output, null, 2));
  
                             setCORSHeaders( res );

                            res.send( JSON.stringify(output));
                    }).catch((err)=>{
                        console.log(err)
                        let wd1 = `NSE:${symbol}-EQ`;
                        let ret = {  "symbol": wd1 , "status" : " Input error "+JSON.stringify(err) };
                         setCORSHeaders( res );
                        res.send( JSON.stringify( ret));
                    })*/

                }
    /*await api.getMarketHistory( marketRequest) 
        .then(result => {
            console.log("✅ Got response:", result);
             // Example usage
                const input = result;
                console.log(input );
                //const timeSeriesData = convertToTimeSeries(input);
            //	console.log(timeSeriesData);
             //setCORSHeaders( res )
                // res.send( input);
                let wd = `NSE:${symbol}-EQ`;
                res.send( JSON.stringify({ wd: "Data available" } ));
          })
          .catch(err => {
            console.error("❌ Failed:", err);
            // setCORSHeaders( res )
            res.send(JSON.stringify({"Upstox": "Upstox MARKET CALL FAILED "}) );
          });
       */
        }  // response.s == OK 
       });

      }
     }
        // construct market request  
        /*{
              symbol: string,
  /// The candle resolution in minutes. /
  resolution: string,
  ///0 to enter the epoch value. 1 to enter the date format as yyyy-mm-dd. /
  date_format: number,
  /// Indicating the start date of records (epoch, yyyy-mm-dd). /
  range_from: string,
  /// Indicating the end date of records. /
  range_to: string,
  /// Set cont flag 1 for continues data and future options. /
  cont_flag: string,
        } */

        /*
        await api.connectMarketData(quote => {
            console.log(quote);
          });
        ejs.renderFile(path.join(__dirname, "views/fyers_callback_template.ejs"),
          {
          requesterName : "Vinayak Anvekar",
          lastlogin: new Date(),
          PUSHLIEDDAYFYERSAGREEMENT: client_id,
          PUSHLIEDDAYFYERSDIRECTION: redirectUrl +'',
         
          data : JSON.stringify(data),
             TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
          })
          .then(result => {
            fyersTemplate = result;
            res.send(fyersTemplate);
          });
          */
    } catch (e) {
        console.log(e);
          setCORSHeaders( res )
        res.send("{ data: error }" );
    }
    /*
     <% data.forEach(elem=> { %>

                <li> <% console.table(elem) %>
                </li>
                <% }); %>
    */


});

// STEP Upstox MAKE A CALL to the Upstox PROXY  that CALLBACK OUR APP WITH 
// REDIRECT URI PROVIDED by US ONLY 
// will receive https://<redirect_uri>?code=mk404x&state=XX56849 
// from the https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=<Your-API-Key-Here>&redirect_uri=<Your-Redirect-URI-Here>&state=<Your-Optional-State-Parameter-Here>

router.get('/upstoxauthcallback', async function (req,res) {

  try {
    const {  code = "", s = "", state = "" } = req.query || {};

  // 🟢 FIRST TIME (clean URL)
    if (!code && !state) {
      return res.redirect(302, "/upstox-auth-dialog");
    }

    console.log("UPSTOX callback received:", {
      
      code,
      s,
      state,
    });
		// 🟢 CALLBACK FROM FYERS (auth_code present)
    const params = new URLSearchParams({
    
      code: code || "",
      s: s || "",
      state: state || "",
    });
    // IF VALID code and state exixts 
    // Generate Access Token
        
    const axios = require('axios');

    const url = 'https://api.upstox.com/v2/login/authorization/token';
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = {
      'code': code,
      'client_id': client_id,
      'client_secret': secret_key,
      'redirect_uri': redirectUrl,
      'grant_type': 'authorization_code',
    };
    let access_token ="";
    axios.post(url, new URLSearchParams(data), { headers })
      .then(response =>  {
        console.log(response.status);
        console.log(response.data);
          // HERE you must get the access token 
          access_token = response.data;
      })
      .catch(error => {
        console.error(error.response.status);
        console.error(error.response.data);
         return res.redirect(302, "/upstox-error?reason=missing_auth_code");

      });
        const now = Date.now()
    globalLogin = { "value" : {"auth_code" :access_token , "code" :code, "s" :s ,"ttl" :now}};
       await handledUpstoxRedirectAccessToken(access_token,req,res);

    // Always redirect to Next.js auth page
    // Do NOT call FYERS again from backend
   /// res.writeHead(302, {
    //  Location: "/fyers-auth",
   // });
   // res.end();
 
		// return res.redirect(
    //  302,
   //   `/upstox-fallback?${params.toString()}`
   // );



    
  } catch (err) {
    console.error("FYERS callback error:", err);

    res.writeHead(302, {
      Location: "/upstox-error?reason=callback_failed",
    });
    res.end();
  }
/*
    try {
        data = { "Upstox":"GOOD MORNING"}

          let s = ''
        let code = ''
        let auth_code= '';
        let isfrompython= '';
        let triggerredirectpython= false;

        if( req.query !== null && req.query !== undefined ){
            console.log(" Upstox REDIRECT QUERY PARAMS " +JSON.stringify(req.query))
            var queryJSON  = JSON.parse(JSON.stringify(req.query));
            s = queryJSON['s'];
              code =queryJSON['code'];
            auth_code= queryJSON['auth_code'];
              queue.enqueue({ time:getFormattedTimeKey(), data: auth_code });
            console.log(`s: ${s}  code : ${code}  auth_code:  ${auth_code} `);
            // CHECK the LOGIN REQUEST from a PYTON WEB APP for STREAMING 
              isfrompython= queryJSON['state'];
            if( isfrompython !== null && isfrompython !== undefined && ( isfrompython ==='python_state' || isfrompython ==='python_order_state' ||
                isfrompython ==='python_test'  ) ){
                console.log(` request from python we app isfrompython:  ${isfrompython} `);
                  console.log(` should trigger return redirect to python running in local   ${isfrompython} `);
                  triggerredirectpython= true;

            }


        }
        else if( req.params !== null && req.params !== undefined && req.params.length > 1){

            console.log("Upstox REDIRECT PARAMS : "+ JSON.stringify(req.params))
            


        }
        else { 
            console.log("REDIRECT from Upstox is with not PARAMTEREs , or could not PARSE THEM ")
        if(res.data !== null && res.data !==undefined){
            s = res .data['s'];
              code = res .data['code'];
            auth_code= res .data['auth_code'];
            ///
            // 
        }
        }




        let redirectUrlInternal  = "https://fyerssebi.netlify.app/.netlify/functions/netlifyupstoxbridge/api/upstoxauthcodeverify"
       //res.send(output)
       setCORSHeaders( res )
             res.send("{ data: comming soon }");
          // ejs.renderFile(path.join(__dirname, "views/upstox_authverify_template.ejs"),
          //   {
          //   requesterName : "Vinayak Anvekar",
          //   lastlogin: new Date(),
          //   PUSHLIEDDAYFYERSAGREEMENT: client_id,
          //   PUSHLIEDDAYFYERSDIRECTION: redirectUrlInternal +'',
          //   PUSHLIEDDAYUPSTOX_S:s,
          //   PUSHLIEDDAYUPSTOX_CODE : code,
          //   PUSHLIEDDAYUPSTOX_AUTH_CODE: auth_code,
          //   data : JSON.stringify(data),
          //      TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
          //   })
          //   .then(result => {
          //     fyersTemplate = result;
          //    setCORSHeaders( res );
          //     res.send(fyersTemplate);
          //   });
    } catch (e) {
        console.log(e);
         setCORSHeaders( res )
        res.send("{ data: error }" );
    }*/
    /*
     <% data.forEach(elem=> { %>

                <li> <% console.table(elem) %>
                </li>
                <% }); %>
    */


});

// STEP Upstox MAKE A CALL to the Upstox PROXY  that CALLBACK OUR APP WITH 
// REDIRECT URI PROVIDED by US ONLY 
router.get('/upstoxsdkcallback', async function (req,res) {

    try {
        data = { "Upstox":"GOOD MORNING"}
        let redirectUrlInternal = '';
        //res.send(output)
        /*
        <input type="hidden" id="hidenUserId"  value='<%=PUSHLIEDDAYUPSTOXUSERID%>'>
<input type="hidden" id="hidenUserName"  value='<%=PUSHLIEDDAYUPSTOXUSERNAME%>'>
</div>
        */
       setCORSHeaders( res )
             res.send("{ data: comming soon now 03 22:46 }");
        // ejs.renderFile(path.join(__dirname, "views/upstox_callback_template.ejs"),
        //   {
        //   requesterName : "Vinayak Anvekar",
        //   lastlogin: new Date(),
        //   PUSHLIEDDAYFYERSAGREEMENT: client_id,
        //   PUSHLIEDDAYFYERSDIRECTION: redirectUrlInternal +'',
        //   PUSHLIEDDAYUPSTOXACCESSTOKEN: globalUptox.access_token,
        //   PUSHLIEDDAYUPSTOXEXTENDEDTOKEN: globalUptox.extended_token,
        //     PUSHLIEDDAYUPSTOXUSERID: globalUptox.user_id ,
        //    PUSHLIEDDAYUPSTOXUSERNAME :  globalUptox.user_name , 

        //   data : JSON.stringify(data),
        //      TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
        //   })
        //   .then(result => {
        //     fyersTemplate = result;
        //      setCORSHeaders( res );
        //     res.send(fyersTemplate);
        //   });
    } catch (e) {
        console.log(e);
         setCORSHeaders( res )
        res.send("{ data: error }" );
    }
    /*
     <% data.forEach(elem=> { %>

                <li> <% console.table(elem) %>
                </li>
                <% }); %>
    */


});

// 
//curl -H "Authorization:app_id:access_token" https://api-t1.fyers.in/api/v3/profile
//curl -H "Authorization: app_id:access_token" POST 'https://api-t1.fyers.in/api/v3/logout'
router.get('/upstoxgetquote', async function (req,res) {

    let symbol = ''; let apikey = '';
    let authcode =  global_auth_code;
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox fyersgetquote QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        symbol = queryJSON['symbol'];
          apikey =queryJSON['apikey'];
          authcode= queryJSON['auth_code'];
        // global_auth_code= auth_code;
         console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode} `);
    }
    
    
    if( symbol !==null && symbol !== undefined && symbol !== ''){
        console.log("Symbol : "+symbol); 
      if( authcode !==null && authcode !== undefined && authcode !== ''){
        console.log("Upstox Initiatied Successfully ") 
        let fyersAccess= false;
        fyers.generate_access_token({"client_id":client_id,"secret_key":secret_key,"auth_code":authcode}).then((response)=>{
            if(response.s=='ok'){
                fyers.setAccessToken(response.access_token)
                console.log("Upstox Grants provided  ") 
                fyers.get_profile().then((response)=>{
                    console.log("Upstox Profile logged  ") 
                    console.log(response)
  
                    fyers.getQuotes([`NSE:${symbol}-EQ` ]).then((response)=>{
                        console.log("Upstox Sample Quotes..  ") 
                        console.log(response)
                        //console.log("STOCK TABLE " , JSON.stringify(stock_table) )	
                       // showFYERSPROFILEQUOTES(req,res,stock_table)
                        setCORSHeaders( res )
                          res.send(response);
                        

                    }).catch((err)=>{
                        console.log("Upstox Quotes. no reach ..  ")
                         setCORSHeaders( res )
                        res.send(JSON.stringify({"Upstox": "Upstox PROFILE CALL FAILED "}));
                        //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                        console.log(err)
                    })

                }).catch((err)=>{
                    console.log("Upstox Profile no reach ..  ")
                     setCORSHeaders( res )
                    res.send(JSON.stringify({"Upstox": "Upstox PROFILE CALL NO REACH "}));
                    //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                    console.log(err)
                })

            }else{
                console.log("error generating access token",JSON.stringify(response.data));
                 setCORSHeaders( res )
                res.send(JSON.stringify({"Upstox": "Upstox ACCESS FAILED "}));
                //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox ACCESS FAILED "})
            }
        })
       }
       else {
        console.log("Upstox Initialization issues ... ") 
         setCORSHeaders( res )
        res.send(JSON.stringify({"Upstox": " AUTH CODE INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " AUTH CODE INVALID "})
       }
     }else {
        console.log("Upstox Initialization issues ... ") ;
         setCORSHeaders( res )
        res.send(JSON.stringify({"Upstox": " SYMBOL INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " SYMBOL INVALID "})
     }

});

// GET Upstox TRADE BOOK 
//Curl Request Method
//curl -H "Authorization: app_id:access_token" https://api-t1.fyers.in/api/v3/tradebook
/*
-------------------------------------------------------------------
Sample Success Response
-------------------------------------------------------------------
{
  "s": "ok",
  "code": 200,
  "message": "",
  "tradeBook":
              [{
                "clientId":"FXXXXX",
                "orderDateTime":"07-Aug-2020 13:51:12",
                "orderNumber":"120080789075",
                "exchangeOrderNo": "1200000009204725",
                "exchange":10,
                "side":1,
                "segment":10,
                "orderType":2,
                "fyToken":"101000000010666",
                "productType":"CNC",
                "tradedQty":10,
                "tradePrice":32.7,
                "tradeValue":327.0,
                "tradeNumber":"52605023",
                "row":52605023,
                "symbol":"NSE:PNB-EQ",
                "orderTag": "1:Ordertag"
}]

}
*/
router.get('/upstoxgettradebook', async function (req,res) {

    let symbol = ''; let apikey = '';
    let authcode =  global_auth_code;
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox fyersgettradebook QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        symbol = queryJSON['symbol'];
          apikey =queryJSON['apikey'];
          authcode= queryJSON['auth_code'];
        // global_auth_code= auth_code;
         console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode} `);
    }
    
    
    //if( symbol !==null && symbol !== undefined && symbol !== ''){
    //	console.log("Symbol : "+symbol); 
      if( authcode !==null && authcode !== undefined && authcode !== ''){
        console.log("Upstox Initiatied Successfully ") 
        let fyersAccess= false;
        fyers.generate_access_token({"client_id":client_id,"secret_key":secret_key,"auth_code":authcode}).then((response)=>{
            if(response.s=='ok'){
                fyers.setAccessToken(response.access_token)
                console.log("Upstox Grants provided  ") 
                fyers.get_tradebook().then((response)=>{
                    console.log("Upstox Trade book requested  ") 
                    console.log(response)
                     setCORSHeaders( res )
                     res.send(response);
                     

                }).catch((err)=>{
                    console.log("UpstoxTrade book no reach ..  ")
                     setCORSHeaders( res )
                    res.send(JSON.stringify({"Upstox": "Upstox Trade book CALL NO REACH "}));
                    //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                    console.log(err)
                })

            }else{
                console.log("error generating access token",JSON.stringify(response.data));
                 setCORSHeaders( res )
                res.send(JSON.stringify({"Upstox": "Upstox ACCESS FAILED "}));
                //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox ACCESS FAILED "})
            }
        })
       }
       else {
        console.log("Upstox Initialization issues ... ") 
         setCORSHeaders( res )
        res.send(JSON.stringify({"Upstox": " AUTH CODE INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " AUTH CODE INVALID "})
       }
    // }else {
    //	console.log("Upstox Initialization issues ... ") ;
    //	 setCORSHeaders( res )
    //	res.send(JSON.stringify({"Upstox": "  INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " SYMBOL INVALID "})
    // }

});

/*
-------------------------------------------------------------------
Sample Success Response
-------------------------------------------------------------------
{

  's': 'ok', 
  'code': 200, 
  'message':'', 
  'netPositions': 
  [
    {'netQty': 1, 
    'qty': 1, 
    'avgPrice': 72256.0, 
    'netAvg': 71856.0, 
    'side': 1,
    'productType': 'MARGIN', 
    'realized_profit': 400.0, 
    'unrealized_profit': 461.0, 
    'pl': 861.0,
    'ltp': 72717.0, 
    'buyQty': 2, 
    'buyAvg': 72256.0, 
    'buyVal': 144512.0, 
    'sellQty': 1, 
    'sellAvg': 72656.0, 
    'sellVal': 72656.0, 
    'slNo': 0, 
    'fyToken': '1120200831217406', 
    'crossCurrency': 'N', 
    'rbiRefRate': 1.0, 
    'qtyMulti_com': 1.0, 
    'segment': 20, 
    'symbol': 'MCX:SILVERMIC20AUGFUT', 
    'id': 'MCX:SILVERMIC20AUGFUT-MARGIN',
    "cfBuyQty": 0,
    "cfSellQty": 0,
    "dayBuyQty": 0,
    "daySellQty": 1,
    "exchange": 10,
    }
  ], 

  'overall': 
  {
    'count_total': 1, 
    'count_open': 1, 
    'pl_total': 861.0, 
    'pl_realized': 400.0, 
    'pl_unrealized': 461.0
  }
  
 }
*/

router.get('/upstoxgetpositionbook', async function (req,res) {

    let symbol = ''; let apikey = '';
    let authcode =  global_auth_code;
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox  fyersgetpositionbook QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        symbol = queryJSON['symbol'];
          apikey =queryJSON['apikey'];
          authcode= queryJSON['auth_code'];
        // global_auth_code= auth_code;
         console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode} `);
    }
    
    
    //if( symbol !==null && symbol !== undefined && symbol !== ''){
    //	console.log("Symbol : "+symbol); 
      if( authcode !==null && authcode !== undefined && authcode !== ''){
        console.log("Upstox Initiatied Successfully ") 
        let fyersAccess= false;
        fyers.generate_access_token({"client_id":client_id,"secret_key":secret_key,"auth_code":authcode}).then((response)=>{
            if(response.s=='ok'){
                fyers.setAccessToken(response.access_token)
                console.log("Upstox Grants provided  ") 
                   fyers.get_positions().then((positionResp)=>{
                    console.log("Upstox Position book requested  ") 
                    console.log(positionResp)
                     setCORSHeaders( res )
                     let validPositionRes = positionResp ;// = Object.assign ( {} , response);
                        
                     try { 
                     let postionRes =  Object.assign ( {} , positionResp); //JSON.parse(response);
                        validPositionRes =   Object.assign ( {} , positionResp);   // JSON.parse( response); 

                        console.log(" typeof positionResp "+(typeof positionResp ));
                         if( Array.isArray(positionResp?.netPositions) && positionResp?.netPositions.length > 0){
                            console.log("positions contains netPositions array ");
                            let netPositions = postionRes.netPositions;
                            if( Array.isArray(netPositions) && netPositions.length > 0){
                             let validPosition = netPositions.filter(pos => parseInt(pos.netQty) > 0 );
                                console.log("Upstox Position valid positions  "+JSON.stringify(validPosition)) ;
                              validPositionRes.netPositions = validPosition;
                            }
                             else {
                               console.log("Upstox Position book empty  " ) ;
                             }

                         }
                         else if( Array.isArray( positionResp["netPositions"]) ) {
                             console.log("positionResp['netPositions'] is valid ");
                         }
                        //console.log(" instanceof positionResp "+(  positionResp instanceof string));
                        //console.log(" instanceof positionResp "+(  positionResp instanceof  object ));
                        //console.log(" instanceof positionResp "+(  positionResp instanceof function ));

                        // check the positions , pass only those where the netQty and qty > 0 
                    /*	let netPostions = postionRes.netPostions;
                      if( Array.isArray(netPostions) && netPostions.length > 0){
                             let validPosition = netPostions.filter(pos => parseInt(pos.netQty) > 0 );
                            console.log("Upstox Position valid positions  "+JSON.stringify(validPosition)) ;
                            validPositionRes.netPostions = validPosition;
                      }
                      else {
                        console.log("Upstox Position book empty  " ) ;
                      }	*/

                     }
                     catch(er){
                        console.log("Upstox Position book JSON issues   "+JSON.stringify(er)) ;

                     }
                     res.send(validPositionRes);
                     

                }).catch((err)=>{
                    console.log("Upstox Position book no reach ..  ")
                     setCORSHeaders( res )
                    res.send(JSON.stringify({"Upstox": "Upstox Position book CALL NO REACH "}));
                    //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                    console.log(err)
                })

            }else{
                console.log("error generating access token",JSON.stringify(response.data));
                 setCORSHeaders( res )
                res.send(JSON.stringify({"Upstox": "Upstox ACCESS FAILED "}));
                //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox ACCESS FAILED "})
            }
        })
       }
       else {
        console.log("Upstox Initialization issues ... ") 
         setCORSHeaders( res )
        res.send(JSON.stringify({"Upstox": " AUTH CODE INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " AUTH CODE INVALID "})
       }
    // }else {
    //	console.log("Upstox Initialization issues ... ") ;
    //	 setCORSHeaders( res )
    //	res.send(JSON.stringify({"Upstox": "  INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " SYMBOL INVALID "})
    // }

});

// PLACE ORDER INSTANTLY 
/*

const reqBody={
         "symbol":"NSE:SBIN-EQ",
         "qty":1,
         "type":1,
         "side":-1,
         "productType":"INTRADAY",
         "limitPrice":355,
         "stopPrice":0,
         "disclosedQty":0,
         "validity":"DAY",
         "offlineOrder":false,
         "stopLoss":0,
         "takeProfit":0,
         "orderTag":"tag1"
   }
 ------------------------------------------------------------------------------------------------------------------------------------------
 Sample Success Response 
 ------------------------------------------------------------------------------------------------------------------------------------------
     {  
             s: 'ok',
             code: 1101, 
             message: 'Order submitted successfully. 
             Your Order Ref. No.52104097616',
             id: '52104097616'
     }


*/


router.get('/upstoxplacebuyorder', async function (req,res) {

    let symbol = ''; let apikey = '';
    let authcode =  global_auth_code;
    let ltp =  '';let price ='';
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox  fyersplacebuyorder QUERY PARAMS " +JSON.stringify(req.query))
    /*	var queryJSON  = JSON.parse(JSON.stringify(req.query));
        symbol = queryJSON['symbol'];
          apikey =queryJSON['apikey'];
          authcode= queryJSON['auth_code'];
          ltp= queryJSON['ltp'];
        // global_auth_code= auth_code;
         console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode} `);*/
            var queryJSON  = JSON.parse(JSON.stringify(req.query));
        symbol = queryJSON['symbol'];
          apikey =queryJSON['apikey'];
          authcode= queryJSON['auth_code'];
          ltp= queryJSON['ltp'];
          qty= queryJSON['qty'];
          price= queryJSON['price'];
        // global_auth_code= auth_code;
         console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode}  price: ${price} qty:${qty} ltp:${ltp}`);

    }
    
    
    //if( symbol !==null && symbol !== undefined && symbol !== ''){
    //	console.log("Symbol : "+symbol); 
      if( authcode !==null && authcode !== undefined && authcode !== ''){
        console.log("Upstox Initiatied Successfully ") 
        if( ltp !==null && ltp !== undefined && ltp !== ''){
        let fyersAccess= false;
        fyers.generate_access_token({"client_id":client_id,"secret_key":secret_key,"auth_code":authcode}).then((response)=>{
            if(response.s=='ok'){
                fyers.setAccessToken(response.access_token)
                console.log("Upstox Grants provided  ") 
                    symbol = symbol.indexOf("NIFTY")>-1 ? "NSE:"+symbol : (symbol.indexOf("SENSEX") > -1 ? "BSE:"+symbol: "NSE:"+symbol )  
                let offlein = false;
                if (isOutsideTradingHours()) {
                    console.log("❌ Outside trading hours");
                    offlein = true;
                } else {
                    console.log("✅ Within trading hours");
                    offlein = true;
                     offlein = (ism !== undefined ? !ism.isOpen(): true);
                }
                price = parseFloat(price);
                qty = parseInt(qty);
                const reqBody={
                        "symbol":`${symbol}`,
                        "qty":qty,
                        "type":1,
                        "side":1,
                        "productType":"MARGIN",
                        "limitPrice":price,
                        "stopPrice":0,
                        "disclosedQty":0,
                        "validity":"DAY",
                        "offlineOrder":offlein,
                         
                        "stopLoss":0,
                        "takeProfit":0,
                        "orderTag":"tag1"
                }

                  fyers.place_order(reqBody).then((response)=>{
                    console.log("Upstox Place Buy Order requested  ") 
                    console.log(response)
                     setCORSHeaders( res )
                     res.send(response);
                     

                }).catch((err)=>{
                    console.log("Upstox Place Buy ORder  no reach ..  ")
                     setCORSHeaders( res )
                    res.send(JSON.stringify({"Upstox": "Upstox Place Buy Order  CALL NO REACH "}));
                    //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                    console.log(err)
                })

            }else{
                console.log("error generating access token",JSON.stringify(response.data));
                 setCORSHeaders( res )
                res.send(JSON.stringify({"Upstox": "Upstox ACCESS FAILED "}));
                //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox ACCESS FAILED "})
            }
        })
         }
         else {
            console.log("Upstox Place Order issues ... ") 
              setCORSHeaders( res )
             res.send(JSON.stringify({"Upstox": "LTP BUY PRICE NOT SET "}));
         }
       }
       else {
        console.log("Upstox Initialization issues ... ") 
         setCORSHeaders( res )
        res.send(JSON.stringify({"Upstox": " AUTH CODE INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " AUTH CODE INVALID "})
       }
    // }else {
    //	console.log("Upstox Initialization issues ... ") ;
    //	 setCORSHeaders( res )
    //	res.send(JSON.stringify({"Upstox": "  INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"FYERS": " SYMBOL INVALID "})
    // }

});

// PLACE SELL ORDER INSTANTLY 
/*

const reqBody={
         "symbol":"NSE:NIFTY2580724650PE",
         "qty":1,
         "type":1,
         "side":-1,
         "productType":"MARGIN",
         "limitPrice":355,
         "stopPrice":0,
         "disclosedQty":0,
         "validity":"DAY",
         "offlineOrder":false,
         "stopLoss":0,
         "takeProfit":0,		
         "orderTag":"tag1"
   }
 ------------------------------------------------------------------------------------------------------------------------------------------
 Sample Success Response 
 ------------------------------------------------------------------------------------------------------------------------------------------
     {  
             s: 'ok',
             code: 1101, 
             message: 'Order submitted successfully. 
             Your Order Ref. No.52104097616',
             id: '52104097616'
     }


*/


router.get('/upstoxplacesellorder', async function (req,res) {

    let symbol = ''; let apikey = '';
    let authcode =  global_auth_code;
    let ltp =  ''; let price ='';
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox  fyersplacesellorder QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        symbol = queryJSON['symbol'];
          apikey =queryJSON['apikey'];
          authcode= queryJSON['auth_code'];
          ltp= queryJSON['ltp'];
          qty= queryJSON['qty'];
          price= queryJSON['price'];
        // global_auth_code= auth_code;
         console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode}  price: ${price} qty:${qty} ltp:${ltp}`);
    }
    
    
    //if( symbol !==null && symbol !== undefined && symbol !== ''){
    //	console.log("Symbol : "+symbol); 
      if( authcode !==null && authcode !== undefined && authcode !== ''){
        console.log("Upstox Initiatied Successfully ") 
        if( ltp !==null && ltp !== undefined && ltp !== ''  && 
              price !==null && price !== undefined && price !== '' &&
             symbol !==null && symbol !== undefined && symbol !== '' &&
             qty !==null && qty !== undefined && qty !== '' 
        ){
        let fyersAccess= false;
        fyers.generate_access_token({"client_id":client_id,"secret_key":secret_key,"auth_code":authcode}).then((response)=>{
            if(response.s=='ok'){
                fyers.setAccessToken(response.access_token)
                console.log("Upstox Grants provided  ") ;
                symbol = symbol.indexOf("NIFTY")>-1 ? "NSE:"+symbol : (symbol.indexOf("SENSEX") > -1 ? "BSE:"+symbol: "NSE:"+symbol )  
                let offlein = false;
                if (isOutsideTradingHours()) {
                    console.log("❌ Outside trading hours");
                    offlein = true;
                } else {
                    console.log("✅ Within trading hours");
                    offlein = true;
                     offlein = (ism !== undefined ? !ism.isOpen(): true);
                }
                price = parseFloat(price);
                qty = parseInt(qty);
                
                const reqBody={
                        "symbol":`${symbol}`,
                        "qty":qty,
                        "type":1,
                        "side":-1,
                        "productType":"MARGIN",
                        "limitPrice":price,
                        "stopPrice":0,
                        "disclosedQty":0,
                        "validity":"DAY",
                        "offlineOrder":offlein,
                        "stopLoss":0,
                        "takeProfit":0,
                        "orderTag":"fyersbook"
                }
                console.log("Upstox sell order  "+JSON.stringify(reqBody)) ;	
                  fyers.place_order(reqBody).then((response)=>{
                    console.log("Upstox Place SELL Order requested  ") 
                    console.log(response)
                     setCORSHeaders( res )
                     res.send(response);
                     

                }).catch((err)=>{
                    console.log("Upstox Place Sell ORder  no reach ..  ")
                     setCORSHeaders( res )
                    res.send(JSON.stringify({"Upstox": "Upstox Place SELL Order  CALL NO REACH "}));
                    //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                    console.log(err)
                })

            }else{
                console.log("error generating access token",JSON.stringify(response.data));
                 setCORSHeaders( res )
                res.send(JSON.stringify({"Upstox": "Upstox ACCESS FAILED "}));
                //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox ACCESS FAILED "})
            }
        })
         }
         else {
            console.log("Upstox Place Order issues ... ") 
              setCORSHeaders( res )
             res.send(JSON.stringify({"Upstox": "Either LTP ,QTY, SYMBOL, PRICE NOT SET "}));
         }
       }
       else {
        console.log("Upstox Initialization issues ... ") 
         setCORSHeaders( res )
        res.send(JSON.stringify({"Upstox": " AUTH CODE INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " AUTH CODE INVALID "})
       }
    // }else {
    //	console.log("Upstox Initialization issues ... ") ;
    //	 setCORSHeaders( res )
    //	res.send(JSON.stringify({"Upstox": "  INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " SYMBOL INVALID "})
    // }

});

// PLACE CANCEL ORDER INSTANTLLY 
/*

const reqBody = 
{
  "id":52104087951,
}

---------------------------------------------------------------------------------------------------------------------------------------------
Sample Success Response 
------------------------------------------------------------------------------------------------------------------------------------------
{    
  code: 1103,
  message: 'Successfully cancelled order',
  s: 'ok', 
  id: '52104097626'
}

*/



router.get('/upstoxcancelorder', async function (req,res) {

    let symbol = ''; let apikey = '';
    let authcode =  global_auth_code;
    let order_id =  '';
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox  fyerscancelorder QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        symbol = queryJSON['symbol'];
          apikey =queryJSON['apikey'];
          authcode= queryJSON['auth_code'];
          order_id= queryJSON['id'];
        // global_auth_code= auth_code;
         console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode} `);
    }
    
    
    //if( symbol !==null && symbol !== undefined && symbol !== ''){
    //	console.log("Symbol : "+symbol); 
      if( authcode !==null && authcode !== undefined && authcode !== ''){
        console.log("Upstox Initiatied Successfully ") 
        if( order_id !==null && order_id !== undefined && order_id !== ''){
        let fyersAccess= false;
        fyers.generate_access_token({"client_id":client_id,"secret_key":secret_key,"auth_code":authcode}).then((response)=>{
            if(response.s=='ok'){
                fyers.setAccessToken(response.access_token)
                console.log("Upstox Grants provided  ") 
                const reqBody = 
                        {
                        "id":order_id,
                        }

                // fyers.gtt_cancel_order(reqBody).then((response)=>{
                 fyers.cancel_order(reqBody).then((response)=>{
                    console.log("Upstox Cancel Order requested  ") 
                    console.log(response)
                     setCORSHeaders( res )
                     res.send(response);
                     

                }).catch((err)=>{
                    console.log("Upstox Cancel Order  no reach ..  ")
                     setCORSHeaders( res )
                     const combined = {
                        FYERS: "Upstox Cancel Order  CALL NO REACH",
                        error: err  // assuming `err` is an object
                    };
                    const result = JSON.stringify(combined);
                    res.send(result);
                    //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                    console.log(err)
                })

            }else{
                console.log("error generating access token",JSON.stringify(response.data));
                 setCORSHeaders( res )
                res.send(JSON.stringify({"Upstox": "Upstox ACCESS FAILED "}));
                //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox ACCESS FAILED "})
            }
        })
         }
         else {
            console.log("Upstox Cancel Order issues ... ") 
              setCORSHeaders( res )
             res.send(JSON.stringify({"Upstox": " ORDER ID NOT  SET "}));
         }
       }
       else {
        console.log("Upstox Initialization issues ... ") 
         setCORSHeaders( res )
        res.send(JSON.stringify({"Upstox": " AUTH CODE INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " AUTH CODE INVALID "})
       }
    // }else {
    //	console.log("FYERS Initialization issues ... ") ;
    //	 setCORSHeaders( res )
    //	res.send(JSON.stringify({"FYERS": "  INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " SYMBOL INVALID "})
    // }

});




/*
-------------------------------------------------------------------------------------------------------------------
 Sample success Response  
-------------------------------------------------------------------------------------------------------------------
{
    "code": 200,
    "message": "",
    "s": "ok",
    "overall": {
        "count_total": 2,
        "pnl_perc": -1.529,
        "total_current_value": 12531.6,
        "total_investment": 37642.15,
        "total_pl": -575.5499999999984
    },
    "holdings": [
        {
            "costPrice": 1456.35,
            "id": 0,
            "fyToken": "10100000009581",
            "symbol": "NSE:METROPOLIS-EQ",
            "isin": "INE112L01020",
            "quantity": 9,
            "exchange": 10,
            "segment": 10,
            "qty_t1": 0,
            "remainingQuantity": 9,
            "collateralQuantity": 0,
            "remainingPledgeQuantity": 9,
            "pl": -575.5499999999984,
            "ltp": 1392.4,
            "marketVal": 12531.6,
            "holdingType": "HLD"
        },
        {
            "costPrice": 490.7,
            "id": 1,
            "fyToken": "101000000014732",
            "symbol": "NSE:DLF-EQ",
            "isin": "INE271C01023",
            "quantity": 50,
            "exchange": 10,
            "segment": 10,
            "qty_t1": 0,
            "remainingQuantity": 0,
            "collateralQuantity": 0,
            "remainingPledgeQuantity": 0,
            "pl": 0,
            "ltp": 514.3,
            "marketVal": 0,
            "holdingType": "HLD"
        }
    ]
}
*/

router.get('/upstoxgetholdings', async function (req,res) {

    let symbol = ''; let apikey = '';
    let authcode =  global_auth_code;
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox fyersgetholdings QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        symbol = queryJSON['symbol'];
          apikey =queryJSON['apikey'];
          authcode= queryJSON['auth_code'];
        // global_auth_code= auth_code;
         console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode} `);
    }
    
    
    //if( symbol !==null && symbol !== undefined && symbol !== ''){
    //	console.log("Symbol : "+symbol); 
      if( authcode !==null && authcode !== undefined && authcode !== ''){
        console.log("Upstox Initiatied Successfully ") 
        let fyersAccess= false;
        fyers.generate_access_token({"client_id":client_id,"secret_key":secret_key,"auth_code":authcode}).then((response)=>{
            if(response.s=='ok'){
                fyers.setAccessToken(response.access_token)
                console.log("Upstox Grants provided  ") 
                fyers.get_holdings().then((response)=>{
                    console.log("Upstox Holdings requested  ") 
                    console.log(response)
                     setCORSHeaders( res )
                     res.send(response);
                     

                }).catch((err)=>{
                    console.log("Upstox Holdigns no reach ..  ")
                     setCORSHeaders( res )
                    res.send(JSON.stringify({"Upstox": "Upstox Holdinges CALL NO REACH "}));
                    //showFYERSPROFILEQUOTES(req,res,{"FYERS": "Upstox PROFILE CALL FAILED "})
                    console.log(err)
                })

            }else{
                console.log("error generating access token",JSON.stringify(response.data));
                 setCORSHeaders( res )
                res.send(JSON.stringify({"Upstox": "Upstox ACCESS FAILED "}));
                //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox ACCESS FAILED "})
            }
        })
       }
       else {
        console.log("Upstox Initialization issues ... ") 
         setCORSHeaders( res )
        res.send(JSON.stringify({"Upstox": " AUTH CODE INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " AUTH CODE INVALID "})
       }
    // }else {
    //	console.log("Upstox Initialization issues ... ") ;
    //	 setCORSHeaders( res )
    //	res.send(JSON.stringify({"Upstox": "  INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " SYMBOL INVALID "})
    // }

});

/*curl -H "Authorization: app_id:access_token" https://api-t1.fyers.in/api/v3/orders

---------------------------------------------------------------------------------------------------------------------------------------------
 Sample Success Response 
---------------------------------------------------------------------------------------------------------------------------------------------
Response structure:
{
  "s": "ok",
  "code": 200,
  "message": "",
  "orderBook": [{
      "clientId": "X******",
      "id": "23030900015105",
      "exchOrdId": "1100000001089341",
      "qty": 1,
      "remainingQuantity": 0,
      "filledQty": 1,
      "discloseQty": 0,
      "limitPrice": 6.95,
      "stopPrice": 0,
      "tradedPrice": 6.95,
      "type": 1,
      "fyToken": "101000000014366",
      "exchange": 10,
      "segment": 10,
      "symbol": "NSE:IDEA-EQ",
      "instrument": 0,
      "message": "",
      "offlineOrder": False,
      "orderDateTime": "09-Mar-2023 09:34:38",
      "orderValidity": "DAY",
      "pan": "",
      "productType": "CNC",
      "side": -1,
      "status": 2,
      "source": "W",
      "ex_sym": "IDEA",
      "description": "VODAFONE IDEA LIMITED",
      "ch": -0.1,
      "chp": -1.44,
      "lp": 6.85,
      "slNo": 1,
      "dqQtyRem": 0,
      "orderNumStatus": "23030900015105:2",
      "disclosedQty": 0,
      "orderTag": "1:Ordertag"
  }]
}

*/

router.get('/upstoxgetorderbook', async function (req,res) {

    let symbol = ''; let apikey = '';
    let authcode =  global_auth_code;
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox fyersgetorderbook QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        symbol = queryJSON['symbol'];
          apikey =queryJSON['apikey'];
          authcode= queryJSON['auth_code'];
        // global_auth_code= auth_code;
         console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode} `);
    }
    
    
    //if( symbol !==null && symbol !== undefined && symbol !== ''){
    //	console.log("Symbol : "+symbol); 
      if( authcode !==null && authcode !== undefined && authcode !== ''){
        console.log("Upstox Initiatied Successfully ") 
        let fyersAccess= false;
        fyers.generate_access_token({"client_id":client_id,"secret_key":secret_key,"auth_code":authcode}).then((response)=>{
            if(response.s=='ok'){
                fyers.setAccessToken(response.access_token)
                console.log("Upstox Grants provided  ") 
                 fyers.get_orders().then((response)=>{
              //  fyers.get_gtt_orders().then((response)=>{
                    console.log("Upstox orderbook requested  ") 
                    console.log(response)
                     setCORSHeaders( res )
                     res.send(response);
                     

                }).catch((err)=>{
                    console.log("Upstox orderbook no reach ..  ")
                     setCORSHeaders( res )
                    res.send(JSON.stringify({"Upstox": "Upstox orderbook CALL NO REACH "}));
                    //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                    console.log(err)
                })

            }else{
                console.log("error generating access token",JSON.stringify(response.data));
                 setCORSHeaders( res )
                res.send(JSON.stringify({"Upstox": "Upstox ACCESS FAILED "}));
                //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox ACCESS FAILED "})
            }
        })
       }
       else {
        console.log("Upstox Initialization issues ... ") 
         setCORSHeaders( res )
        res.send(JSON.stringify({"Upstox": " AUTH CODE INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " AUTH CODE INVALID "})
       }
    // }else {
    //	console.log("Upstox Initialization issues ... ") ;
    //	 setCORSHeaders( res )
    //	res.send(JSON.stringify({"Upstox": "  INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " SYMBOL INVALID "})
    // }

});

/**
 *   TICKER GET INDEX TICKER 
 * 
------------------------------------------------------------------------------------------------------------------------------------------
Sample Success Response 
------------------------------------------------------------------------------------------------------------------------------------------
          
 {
    symbol: 'NSE:NIFTY50-INDEX',
    ltp: 19733.55,
    prev_close_price: 19753.8,
    high_price: 19795.6,
    low_price: 19704.6,
    open_price: 19784,
    ch: -20.25,
    chp: -0.1,
    type: 'if'
  }

  OR for COMMODIDITY 
  
------------------------------------------------------------------------------------------------------------------------------------------
Sample Success Response 
------------------------------------------------------------------------------------------------------------------------------------------
          
 {
    symbol: 'MCX:CRUDEOIL25JULFUT',
    ltp: 19733.55,
    prev_close_price: 19753.8,
    high_price: 19795.6,
    low_price: 19704.6,
    open_price: 19784,
    ch: -20.25,
    chp: -0.1,
    type: 'if'
  }

  api-support@fyers.in
 * 
 */

router.get('/upstoxgetticker', async function (req,res) {

    let symbol = ''; let apikey = '';
    let authcode =  global_auth_code;
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox fyersgetticker QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        symbol = queryJSON['symbol'];
          apikey =queryJSON['apikey'];
          authcode= queryJSON['auth_code'];
        // global_auth_code= auth_code;
         console.log(`symbol : ${symbol}  code : ${apikey}  auth_code:  ${authcode} `);
    }
    
    
    //if( symbol !==null && symbol !== undefined && symbol !== ''){
    //	console.log("Symbol : "+symbol); 
      if( authcode !==null && authcode !== undefined && authcode !== ''){
        console.log("Upstox Initiatied Successfully ") 
        let fyersAccess= false;
        fyers.generate_access_token({"client_id":client_id,"secret_key":secret_key,"auth_code":authcode}).then((response)=>{
            if(response.s=='ok'){
                fyers.setAccessToken(response.access_token)
                console.log("Upstox Grants provided  ") 

            try {  
                console.log("Ticker Called with App ID "+client_id);

               var fyersdata= new upstoxClientSdk(client_id+":"+response.access_token)

                    function onmsg(message){
                        console.log(message)
                    res.send(JSON.stringify(message));

                    }

                    function onconnect(){
                        fyersdata.subscribe(['MCX:CRUDEOIL25JULFUT']) //not subscribing for market depth data
                        // fyersdata.mode(fyersdata.LiteMode) //set data mode to lite mode
                        // fyersdata.mode(fyersdata.FullMode) //set data mode to full mode is on full mode by default
                        fyersdata.autoreconnect() //enable auto reconnection mechanism in case of disconnection
                    }

                    function onerror(err){
                        console.log(err)
                    }

                    function onclose(){
                        console.log("socket closed")
                    }

                    fyersdata.on("message",() => {
                        onmsg(message)
                        console.log("ticker ... "+ JSON.stringify(message))
                    })
                    
                    fyersdata.on("connect",onconnect)
                    fyersdata.on("error",onerror)
                    fyersdata.on("close",onclose)
                    fyersdata.connect()
                    /*try { 

                        //res.send(JSON.stringify({"Upstox": "Upstox orderbook CALL NO REACH "}));
                    }*/
                    //

            /*  fyers.get_orders().then((response)=>{
                    console.log("Upstox fyersgetticker requested  ") 
                    console.log(response)
                     setCORSHeaders( res )
                     res.send(response);
                     

                }) .*/
            }	 
                catch (err) {
                    console.log("Upstox fyersgetticker no reach ..  ")
                     setCORSHeaders( res )
                    res.send(JSON.stringify({"Upstox": "Upstox ticcker CALL NO REACH "}));
                    //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                    console.log(err)
                } 

            }else{
                console.log("error generating access token",JSON.stringify(response.data));
                 setCORSHeaders( res )
                res.send(JSON.stringify({"Upstox": "Upstox ACCESS FAILED "}));
                //showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox ACCESS FAILED "})
            }
        })
       }
       else {
        console.log("Upstox Initialization issues ... ") 
         setCORSHeaders( res )
        res.send(JSON.stringify({"Upstox": " AUTH CODE INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " AUTH CODE INVALID "})
       }
    // }else {
    //	console.log("Upstox Initialization issues ... ") ;
    //	 setCORSHeaders( res )
    //	res.send(JSON.stringify({"Upstox": "  INVALID "}));
        //showFYERSPROFILEQUOTES(req,res,{"Upstox": " SYMBOL INVALID "})
    // }

});



// STEP BASIC CATCH for Upstox GoodStoreNotify App  Upstox redirect_uri
router.get('/upstoxauthcodeverifyold', async function (req,res) {

    let s = ''
    let code = ''
    let auth_code= '';
    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox REDIRECT QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        s = queryJSON['s'];
          code =queryJSON['code'];
         auth_code= queryJSON['auth_code'];

         console.log(`s: ${s}  code : ${code}  auth_code:  ${auth_code} `);

    }
    else if( req.params !== null && req.params !== undefined && req.params.length > 1){

        console.log("Upstox REDIRECT PARAMS : "+ JSON.stringify(req.params))


    }
    else { 
         console.log("REDIRECT from Fyers is with not PARAMTEREs , or could not PARSE THEM ")
    if(res.data !== null && res.data !==undefined){
        s = res .data['s'];
          code = res .data['code'];
         auth_code= res .data['auth_code'];
        ///
        // 
    }
    }
    // 
    // 
    // https://api-t1.fyers.in/api/v3/generate-authcode?client_id=7GSQW68AZ4-100&redirect_uri=https://192.168.1.8:56322/fyersauthcode&response_type=code&state=sample_state
    //s=ok&code=200&auth_code
    // PAYLOAD
    //var payload_for_checksum =body.replace(/("[^"]+"[:,])/g, "$1 ");
    var checksum ="";
    // fetch checksum from python child process , STILL WE NEED TO PASS POSITION Tempate as argu
    try {
           setCORSHeaders( res )
             res.send("{ data: comming soon }");
        //res.send(output)
       /* ejs.renderFile(path.join(__dirname, "views/fyers_login_template.ejs"),
          {
          requesterName : "Vinayak Anvekar",
          lastlogin: new Date(),
          s: s+'',
          code: code +'',
          auth_code : auth_code  +'',
          fnoresult : {},
             TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
          })
          .then(result => {
            emailTemplate = result;
             setCORSHeaders( res )
            res.send(emailTemplate);
          });*/
    } catch (e) {
        console.log(e);
         setCORSHeaders( res )
        res.send("{ data: error }" );
    }

});
function generateRandomNumberFromDate(dateObject) {
  // Get the timestamp (milliseconds since epoch) from the Date object
  const timestamp = dateObject.getTime();

  // Use the timestamp to create a seed for a pseudo-random number generator
  // (Note: This is a simplified approach and not a cryptographically secure RNG)
  // For a more robust solution, consider a seeded random number library.
  let seed = timestamp;

  // Simple pseudo-random number generation based on the seed
  // (Example: Linear Congruential Generator - LCG)
  const a = 1103515245;
  const c = 12345;
  const m = 2**31; // A large prime number for the modulus

  seed = (a * seed + c) % m;

  // Normalize the result to a value between 0 (inclusive) and 1 (exclusive)
  return seed / m;
}

/*
Request Body
Name	Required	Type	Description
code	true	string	The code is a unique parameter included in the URL upon a successful Authorize API authentication.
client_id	true	string	The API key obtained during the app generation process.
client_secret	true	string	The API secret obtained during the app generation process. This private key remains confidential, known only to the application and the authorization server.
redirect_uri	true	string	The URL provided during app generation.
grant_type	true	string	This value must always be authorization_code.

RESPONSE 
{
  "email": "******",
  "exchanges": ["NSE", "NFO", "BSE", "CDS", "BFO", "BCD"],
  "products": ["D", "CO", "I"],
  "broker": "UPSTOX",
  "user_id": "******",
  "user_name": "******",
  "order_types": ["MARKET", "LIMIT", "SL", "SL-M"],
  "user_type": "individual",
  "poa": false,
  "is_active": true,
  "access_token": "******************"
  "extended_token": "******************"
}

*/
// SEND the sDK LOGIN DATA
router.get('/upstoxsdklogin', async function (req,res) {

    try {
      let apiInstance = new upstoxClientSdk.LoginApi();
      let apiVersion = "2.0"; 
      const now = new Date();
       const randomNumberBasedOnNow = generateRandomNumberFromDate(now);
      let your_auth_code = randomNumberBasedOnNow;
      let your_client_id = 'e7a79a25-6f2d-490a-9898-275fd89cbeb6';
      let your_client_secret = 'ixtzp79svm';
      let your_redirect_url = 'https://fyerssebi.netlify.app/.netlify/functions/netlifyupstoxbridge/api/upstoxcallback';
      // defined at line 628 near about 
      
      let opts = { 
        'code': `${your_auth_code}`, 
        'clientId': `${your_client_id}`, 
        'clientSecret': `${your_client_secret}`, 
        'redirectUri': `${your_redirect_url}`, 
        'grantType': "authorization_code" 
      };
      apiInstance.token(apiVersion, opts, (error, data, response) => {
        if (error) {
          console.error(error);
           setCORSHeaders( res )
            res.send(JSON.stringify(error));
        } else {
          console.log('API called successfully. Returned data: ' + JSON.stringify(data));
          globalUptox.access_token = data.access_token;
          globalUptox.extended_token = data.extended_token;
          globalUptox.user_id = data.user_id;
          globalUptox.email = data.email;
          globalUptox.user_name = data.user_name;
            globalLogin = { "value" : {"auth_code" :globalUptox.access_token , "code" :globalUptox.extended_token, "s" :'ok' ,"ttl" :now}};
          res.send(JSON.stringify(data));

        }
      });


        
    } catch (e) {
        console.log(e);
         setCORSHeaders( res )
        res.send("{ data: error }" );
    }
});
// STEP UPSTOXK MAKE A CALL to the UPSTOX PROXY  that CALLBACK OUR APP WITH 
// REDIRECT URI PROVIDED by US ONLY   this is from loginByUpstoxPlatform from menu Compoinent 
router.get('/upstoxcallback_new', async function (req,res) {

  try {
    data = { "FYERS":"GOOD MORNING"}
    //res.send(output)
    setCORSHeaders( res )
             res.send("{ data: comming soon  3  22: 48 }");
    // ejs.renderFile(path.join(__dirname, "views/upstox_authdialog_template.ejs"),
    //   {
    //   requesterName : "Vinayak Anvekar",
    //   lastlogin: new Date(),
    //   PUSHLIEDDAYFYERSAGREEMENT: client_id,
    //   PUSHLIEDDAYFYERSDIRECTION: redirectUrl +'',
     
    //   data : JSON.stringify(data),
    //      TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
    //   })
    //   .then(result => {
    //     fyersTemplate = result;
    //    setCORSHeaders( res );
    //     res.send(fyersTemplate);
    //   });
  } catch (e) {
    console.log(e);
     setCORSHeaders( res )
    res.send("{ data: error }" );
  }
  /*
   <% data.forEach(elem=> { %>

                <li> <% console.table(elem) %>
                </li>
                <% }); %>
  */


});
// SEND the GLOBAL LOGIN DATA
router.get('/upstoxgloballogin', async function (req,res) {

    try {
         setCORSHeaders( res )
        res.send(JSON.stringify(globalLogin));
    } catch (e) {
        console.log(e);
         setCORSHeaders( res )
        res.send("{ data: error }" );
    }
});
// QUICK LOGIN with self triggered  button click
// coming from upstoxcallback . upstox_authverify_template.ejs
router.get('/upstoxauthcodeverify', async function (req,res) {

    let s = ''
    let code = ''
    let auth_code= '';
    let isfrompython= '';
    let triggerredirectpython= false;

    if( req.query !== null && req.query !== undefined ){
        console.log(" Upstox REDIRECT QUERY PARAMS " +JSON.stringify(req.query))
        var queryJSON  = JSON.parse(JSON.stringify(req.query));
        s = queryJSON['s'];
          code =queryJSON['code'];
         auth_code= queryJSON['auth_code'];
          queue.enqueue({ time:getFormattedTimeKey(), data: auth_code });
         console.log(`s: ${s}  code : ${code}  auth_code:  ${auth_code} `);
         // CHECK the LOGIN REQUEST from a PYTON WEB APP for STREAMING 
          isfrompython= queryJSON['state'];
        if( isfrompython !== null && isfrompython !== undefined && ( isfrompython ==='python_state' || isfrompython ==='python_order_state' ||
             isfrompython ==='python_test'  ) ){
             console.log(` request from python we app isfrompython:  ${isfrompython} `);
              console.log(` should trigger return redirect to python running in local   ${isfrompython} `);
              triggerredirectpython= true;

        }


    }
    else if( req.params !== null && req.params !== undefined && req.params.length > 1){

        console.log("Upstox REDIRECT PARAMS : "+ JSON.stringify(req.params))
        


    }
    else { 
         console.log("REDIRECT from Upstox is with not PARAMTEREs , or could not PARSE THEM ")
    if(res.data !== null && res.data !==undefined){
        s = res .data['s'];
          code = res .data['code'];
         auth_code= res .data['auth_code'];
        ///
        // 
    }
    }
    // 
    // 
    // https://api-t1.fyers.in/api/v3/generate-authcode?client_id=7GSQW68AZ4-100&redirect_uri=https://192.168.1.8:56322/fyersauthcode&response_type=code&state=sample_state
    //s=ok&code=200&auth_code
    // PAYLOAD
    //var payload_for_checksum =body.replace(/("[^"]+"[:,])/g, "$1 ");
    var checksum ="";
    // fetch checksum from python child process , STILL WE NEED TO PASS POSITION Tempate as argu
    try {
        const now = Date.now()
        // set in global object logged in data 
         globalLogin = { "value" : {"auth_code" :auth_code , "code" :code, "s" :s ,"ttl" :now}};

        //res.send(output)
        setCORSHeaders( res )
             res.send("{ data: comming soon 03 22:48  }");
        // ejs.renderFile(path.join(__dirname, "views/upstox_show_logged_in.ejs"),
        //   {
        //   requesterName : "Vinayak Anvekar",
        //   lastlogin: new Date(),
        //   client_id: client_id,
        //   secret_key: secret_key,
        //   s: s+'',
        //   code: code +'',
        //   auth_code : auth_code  +'',
        //   triggerredirectpython: triggerredirectpython+'',
        //   state: isfrompython+'',
        //   fnoresult : {},
        //      TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
        //   })
        //   .then(result => {
        //     emailTemplate = result;
        //      setCORSHeaders( res )
        //     res.send(emailTemplate);
        //   });
    } catch (e) {
        console.log(e);
         setCORSHeaders( res )
        res.send("{ data: error }" );
    }

});


async function handledUpstoxRedirectAccessToken(accessToken, req , res ){

	if( accessToken !==null && accessToken !== undefined && accessToken !== ''){
		console.log("Upstox Access Token received Successfully ") 
		let upstoxAccess= false;
  try {
        if (!accessToken  ) {
            	console.log("Upstox Access Token set as cookie ") 
          res.cookie("Authorization", 'Bearer '+accessToken);
          return res.redirect(302, "/upstox-auth-token");
         }


        
    } catch (e) {
        console.log(e);
         setCORSHeaders( res )
        res.send("{ data: error }" );
    }
		
	 }else {
		console.log("UPSTOX Initialization issues ... ") 
		showFYERSPROFILEQUOTES(req,res,{"UPSTOX": " AUTH CODE INVALID "})
	 }
	
}  


async function handledUpstoxRedirectAuthCode(authcode, req , res ){

	if( authcode !==null && authcode !== undefined && authcode !== ''){
		console.log("Upstox Initiatied Successfully ") 
		let fyersAccess= false;
  try {
      let apiInstance = new upstoxClientSdk.LoginApi();
      let apiVersion = "2.0"; 
      const now = new Date();
       const randomNumberBasedOnNow = generateRandomNumberFromDate(now);
      let your_auth_code = randomNumberBasedOnNow;
      let your_client_id = 'e7a79a25-6f2d-490a-9898-275fd89cbeb6';
      let your_client_secret = 'ixtzp79svm';
      let your_redirect_url = 'https://fyerssebi.netlify.app/.netlify/functions/netlifyupstoxbridge/api/upstoxcallback';
      // defined at line 628 near about 
       // https://api.upstox.com/v2/login/authorization/token
      let opts = { 
        'code': `${your_auth_code}`, 
        'clientId': `${your_client_id}`, 
        'clientSecret': `${your_client_secret}`, 
        'redirectUri': `${your_redirect_url}`, 
        'grantType': "authorization_code" 
      };
      let body = new upstoxClientSdk.IndieUserTokenRequest();
      body.clientSecret = your_client_secret; // Replace with your actual client secret
      apiInstance.initTokenRequestForIndieUser(body,your_client_id,  (error, data, response) => {
          if (error) {
            console.error(error.response.text);
             setCORSHeaders( res )
             res.send(JSON.stringify(error.response.text) );
          } else {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
             setCORSHeaders( res )
             /*

                          
              {
                  "client_id": "615b1297-d443-3b39-ba19-1927fbcdddc7",
                  "user_id": "******",
                  "access_token": "*********",
                  "token_type": "Bearer",
                  "expires_at": "1731448800000",
                  "issued_at": "1731412800000",
                  "message_type": "access_token"
              }
             */
             res.send(JSON.stringify(data) );
          }
        });

        
    } catch (e) {
        console.log(e);
         setCORSHeaders( res )
        res.send("{ data: error }" );
    }
		
	 }else {
		console.log("UPSTOX Initialization issues ... ") 
		showFYERSPROFILEQUOTES(req,res,{"UPSTOX": " AUTH CODE INVALID "})
	 }
	
}  

// STEP CLEAR focus on the auth code , usually to hanlde the browser redirect , cannot be 
// call as XHR or Ajax request will always fail 
async function handledFyersRedirectAuthCode(authcode, req , res ){

    if( authcode !==null && authcode !== undefined && authcode !== ''){
        console.log("Upstox Initiatied Successfully ") 
        let fyersAccess= false;
        fyers.generate_access_token({"client_id":client_id,"secret_key":secret_key,"auth_code":authcode}).then((response)=>{
            if(response.s=='ok'){
                fyers.setAccessToken(response.access_token)
                console.log("Upstox Grants provided  ") 
                fyers.get_profile().then((response)=>{
                    console.log("Upstox Profile logged  ") 
                    console.log(response)
  
                    fyers.getQuotes(["NSE:SBIN-EQ","NSE:TCS-EQ"]).then((response)=>{
                        console.log("Upstox Sample Quotes..  ") 
                    
                        console.log(response)

                        fyers.getMarketDepth({"symbol":["NSE:SBIN-EQ","NSE:TCS-EQ"],"ohlcv_flag":1}).then((response)=>{
                            console.log("Upstox Sample Quotes MARKET DEPTH..  ") 
 
                                
                             console.log(response.d )
                            let  quotes_obj = response.d;
                            let  stock_table = []
                            keys = Object.keys(quotes_obj),
                            len = keys.length;
                            if(Array.isArray(keys))	{
                                let a1 = keys  
                                let tableQ = { STOCK : "" ,  STOCK_ASK :"" ,   STOCK_BID :""};
                                //ITERATE STOCK entries 
                                entryVals = 		Object.entries(quotes_obj)
                                 console.log("STOCK Entries LENGTH ", entryVals.length)
                                //a1.forEach( stock_record => {
                               for (i = 0; i < entryVals.length; i++){	
                                  // NOTE STOCK ASK and BID ARRAYS 
                                  console.log( " entry"  , JSON.stringify(entryVals[i]) );
                                  const [k , v ]  =entryVals[i];
                                  let stock_ask  = v.ask;		
                                  let stock_bid  =v.bids;	 
                                 
                                //	 permittedValues[i] = array[i]["key"];
                                //  }
                                  if(stock_ask !== null && stock_ask !== undefined &&
                                     stock_bid !== null && stock_bid !== undefined ) 
                                    { 
                                        tableQ.STOCK = k
                                        tableQ.STOCK_ASK = stock_ask
                                        tableQ.STOCK_BID = stock_bid
                                        let rec = Object.assign({}, tableQ);
                                        console.log(k + " rec " , JSON.stringify(rec) )	
                                        stock_table.push(rec)
                                        console.log(k + " stock_record " , JSON.stringify(stock_table) )	
                                        tableQ = {};
                                    }
                                 
                                } 
                                if(a1.length > 1){
                                    
                                    a1.forEach( stock_record => {
                                        console.log("STOCK " + stock_record)
                                    });
                                }
                            }
                            console.log("STOCK TABLE " , JSON.stringify(stock_table) )	
                            showFYERSPROFILEQUOTES(req,res,stock_table)



                            
                        }).catch((err)=>{
                            console.log("Upstox Market DEPTH no reach ..  ") 
                            showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox MARKET DEPTH FAILED "})
                            console.log(err)
                        })	

                    }).catch((err)=>{
                        console.log("Upstox Quotes. no reach ..  ")
                        showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                        console.log(err)
                    })

                }).catch((err)=>{
                    console.log("Upstox Profile no reach ..  ")
                    showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox PROFILE CALL FAILED "})
                    console.log(err)
                })

            }else{
                console.log("error generating access token",JSON.stringify(response.data))
                showFYERSPROFILEQUOTES(req,res,{"Upstox": "Upstox ACCESS FAILED "})
            }
        })
        
     }else {
        console.log("Upstox Initialization issues ... ") 
        showFYERSPROFILEQUOTES(req,res,{"Upstox": " AUTH CODE INVALID "})
     }
    
}  

module.exports = router;
