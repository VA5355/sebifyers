
const express = require('express');
const fyersExtra = require('extra-fyers');
const  queue =  require('./tokenQueue.js');
const router  = express.Router()
var path = require('path');
var ejs = require('ejs');
 var fyersV3= require("fyers-api-v3");
const ism = require('@zero65tech/indian-stock-market');
const upstoxClientSdk = require("upstox-js-sdk") 
import { getContext } from "./context/asyncContext";
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
        ejs.renderFile(path.join(__dirname, "views/fyers_quotes_template.ejs"),
          {
          requesterName : "Vinayak Anvekar",
          lastlogin: new Date(),
          
          data :  dataParsed ,
             TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
          })
          .then(result => {
            fyersTemplate = result;
            res.send(fyersTemplate);
          });
    } catch (e) {
        console.log(e);
        res.send("{ data: error }" );
    }


}

// STEP icicidirect MAKE A CALL to the proxy  that CALLBACK OUR APP WITH 
// REDIRECT URI PROVIDED by US ONLY https://fyerssebi.netlify.app/.netlify/functions/netlifystockicicidirectbridge/api/icicidirectauthcodeverify
router.get('/icicidirectcallback', async function (req,res) {

    try {
        data = { "Icicidirect":"GOOD MORNING"}

          let s = ''
        let code = ''
        let auth_code= '';
        let isfrompython= '';
        let triggerredirectpython= false;
       	var session_token = req.body.API_Session; //14985324
        if (session_token== null || session_token == undefined) {
            session_token = req.query.apisession;
            global_session_number_token = session_token;
            sessionKey = session_token

        }
        // this is temporary to check request is from python 
         if( req.query !== null && req.query !== undefined ){
            console.log(" Icici direct REDIRECT QUERY PARAMS " +JSON.stringify(req.query))
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
        // WRITE SESSION TO FILE WE WON't do this as Netlify shall delay this process
        if(session_token){
           //  fileRW.file.write('./dataokqr/user.json',session_token )
           // StorageUtils._save(CommonConstants.icici_session_token,session_token)
            const ctx = getContext();

              if (ctx !== null && ctx !==undefined) {
                  const store = {
                      requestId: ctx.requestId,
                        userId:ctx.userId,
                     };
                // return res.status(500).json({ error: "Context missing" });
              }
           }
        console.log(" Custer Details URL :  "+CommonConstants.ICICI_CUSTOMER_DETAILS_URL) // CUSTOMER_DETAILS_URL="https://api.icicidirect.com/breezeapi/api/v1/customerdetails"

        var axios = require('axios');
		var data = {  "SessionToken": session_token,    "AppKey": "7`xZ6=v63s37L227e214j454mFN#h5Q4"};
		var config = {
			method: 'get',
			url: "https://api.icicidirect.com/breezeapi/api/v1/customerdetails",
			headers: { 'Content-Type': 'application/json' },
			data : data
		};

        axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
			var result = response.data['Success'];
			var userid = result['idirect_userid'];
			var sestok =result["session_token"]
			var usename = result["idirect_user_name"]
			var lstlogin = result ["idirect_lastlogin_time"]
			console.log(" session_token "+sestok)
			console.log(" session_token "+result["session_token"])

			global_session_token = sestok
			if(			global_session_token){
				//fileRW.file.write('./dataokqr/usersession.json',global_session_token )
                 StorageUtils._save(CommonConstants.icici_global_session_token,global_session_token)
			 }
       res.send(JSON.stringify({"auth_code" :global_session_token}))
			// currentUser.setSessionToken(sestok)
			// currentUser.setUserId(userid)
			// currentUser.setUserName(usename)
			// currentUser.setLastLogin(lstlogin)


       /* This is not required JUST send the session token

			ejs.renderFile(path.join(__dirname, "views/icici_customer_template.ejs"),
				{
				requesterName : usename,
				loginuserid : userid,
				password : "forit@123",
				lastlogin : lstlogin,
				TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4",
				requesterDesig : "Angular UX - Developer",
                triggerredirectpython:triggerredirectpython,
                posturl:"https://fyerssebi.netlify.app/.netlify/functions/netlifystockicicidirectbridge/api"
				})
				.then(result => {
					emailTemplate = result;
					res.send(emailTemplate);
				});
      */


		})
		.catch(function (error) {
			console.log(error);
		});

        
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

// STEP icicidirect MAKE A CALL to the proxy  that CALLBACK OUR APP WITH 
// REDIRECT URI PROVIDED by US ONLY https://fyerssebi.netlify.app/.netlify/functions/netlifystockicicidirectbridge/api/icicidirectauthcodeverify
router.post('/icicidirectcallbackpost', async function (req,res) {

    try {
        data = { "Icicidirect":"GOOD MORNING"}

          let s = ''
        let code = ''
        let auth_code= '';
        let isfrompython= '';
        let triggerredirectpython= false;
       	var session_token = req.body.apisession ; //API_Session; //14985324
        if (session_token== null || session_token == undefined) {
            session_token = req.query.apisession;
            global_session_number_token = session_token;
            sessionKey = session_token

        }
        // this is temporary to check request is from python 
         if( req.query !== null && req.query !== undefined ){
            console.log(" Icici direct REDIRECT QUERY PARAMS " +JSON.stringify(req.query))
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
        // WRITE SESSION TO FILE WE WON't do this as Netlify shall delay this process
        if(session_token){
           //  fileRW.file.write('./dataokqr/user.json',session_token )
            StorageUtils._save(CommonConstants.icici_session_token,session_token)
        }
        console.log(" Custer Details URL :  "+CommonConstants.ICICI_CUSTOMER_DETAILS_URL) // CUSTOMER_DETAILS_URL="https://api.icicidirect.com/breezeapi/api/v1/customerdetails"

        var axios = require('axios');
		var data = {  "SessionToken": session_token,    "AppKey": "7`xZ6=v63s37L227e214j454mFN#h5Q4"};
		var config = {
			method: 'get',
			url: "https://api.icicidirect.com/breezeapi/api/v1/customerdetails",
			headers: { 'Content-Type': 'application/json' },
			data : data
		};

        axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
			var result = response.data['Success'];
			var userid = result['idirect_userid'];
			var sestok =result["session_token"]
			var usename = result["idirect_user_name"]
			var lstlogin = result ["idirect_lastlogin_time"]
			console.log(" session_token "+sestok)
			console.log(" session_token "+result["session_token"])

			global_session_token = sestok
			if(			global_session_token){
				//fileRW.file.write('./dataokqr/usersession.json',global_session_token )
                 StorageUtils._save(CommonConstants.icici_global_session_token,global_session_token)
			 }
			// currentUser.setSessionToken(sestok)
			// currentUser.setUserId(userid)
			// currentUser.setUserName(usename)
			// currentUser.setLastLogin(lstlogin)
      /* 
			ejs.renderFile(path.join(__dirname, "views/icici_customer_template.ejs"),
				{
				requesterName : usename,
				loginuserid : userid,
				password : "forit@123",
				lastlogin : lstlogin,
				TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4",
				requesterDesig : "Angular UX - Developer",
                triggerredirectpython:triggerredirectpython,
                posturl:"https://fyerssebi.netlify.app/.netlify/functions/netlifystockicicidirectbridge/api"
				})
				.then(result => {
					emailTemplate = result;
					res.send(emailTemplate);
				});
       */


		})
		.catch(function (error) {
			console.log(error);
		});

        
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
router.get('/apiuser/home', async function (req,res) {
      try {
        data = { "ICICIDIRECT":"GOOD MORNING"}
        let redirectUrlInternal = '';
        //#"https://api.icicidirect.com/apiuser/home/validateuser", $('#form1'), $('#pnlgetlogin')
				console.log(" Login Form OTP Genereration end");
				var postData = req.body
				console.log(" client Form  Data "+JSON.stringify(postData))
				var PostForm = require('./jscommServer');
				var othjsonpara= $('#dvshowotp')
				var _form = $('#form1');
				var postdate = PostForm.serializeJSON(_form);
				if (othjsonpara != undefined || othjsonpara != null) {
				  postdate = $.extend({}, postdate, othjsonpara);
				}
				var urlICICI = CommonConstants.TRADE_LOGIN_URL + encodeURIComponent(CommonConstants.BREEZE_API_KEY)
				console.log(" Form  Data "+JSON.stringify(postdate))
				res.redirect(urlICICI);

       } catch (e) {
        console.log(e);
         setCORSHeaders( res )
        res.send("{ data: error }" );
    }     

});
 //-----------------STEP 5-------------MONEY FLOW Calculation----- GLAUBHANT Futures and Option positions -------------
 router.get('/getMoneyFlowScreen', async function (req,res) {



	// PAYLOAD
	//var payload_for_checksum =body.replace(/("[^"]+"[:,])/g, "$1 ");
	var checksum ="";
    // fetch checksum from python child process , STILL WE NEED TO PASS POSITION Tempate as argu
	try {

		//res.send(output)
		ejs.renderFile(path.join(__dirname, "views/icici_moneyflow_template.ejs"),
		  {
		  requesterName : "Vinayak Anvekar",
		  lastlogin: new Date(),
		  fnoresult : {},
		     TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
		  })
		  .then(result => {
		  	emailTemplate = result;
		  	res.send(emailTemplate);
		  });
	} catch (e) {
		console.log(e);
		res.send("{ data: error }" );
	}

});


 router.get('/fnopositions', async function (req,res) {

        // get SESSION TOKEN
	//var setoken = fileRW.file.read('./dataokqr/usersession.json' )
	var setoken =  StorageUtils._retrieve(CommonConstants.icici_global_session_token )
        // CURRENT DATE
	let d = new Date();
	let current_date = d.toISOString().substring(0,19)+  '.000Z';
        // GET  BODY
	var NFOCurrent = require('./NFOBODYtemplate.json');
	 var body = JSON.stringify(NFOCurrent)
	// PAYLOAD
	//var payload_for_checksum =body.replace(/("[^"]+"[:,])/g, "$1 ");
	var checksum ="";
    // fetch checksum from python child process , STILL WE NEED TO PASS POSITION Tempate as argu
	try {
		let output = await main(setoken, current_date, body,checksum)
		console.log("output : "+JSON.stringify(output));
		//res.send(output)
		ejs.renderFile(path.join(__dirname, "views/icici_fno_template.ejs"),
		  {
		  fnoresult : output,

		  })
		  .then(result => {
		  	emailTemplate = result;
		  	res.send(emailTemplate);
		  });
	} catch (e) {
		console.log(e);
		res.send("{ data: error }" );
	}

});
// STEP Upstox MAKE A CALL to the Upstox PROXY  that CALLBACK OUR APP WITH 
// REDIRECT URI PROVIDED by US ONLY 
router.get('/upstoxsdkcallback', async function (req,res) {

    try {
        data = { "Upstox":"GOOD MORNING"}
        let redirectUrlInternal = 'https://fyerssebi.netlify.app/.netlify/functions/netlifyupstoxbridge/api/upstoxcallback';
        //res.send(output)
        /*
        <input type="hidden" id="hidenUserId"  value='<%=PUSHLIEDDAYUPSTOXUSERID%>'>
<input type="hidden" id="hidenUserName"  value='<%=PUSHLIEDDAYUPSTOXUSERNAME%>'>
</div>
        */
        ejs.renderFile(path.join(__dirname, "views/upstox_callback_template.ejs"),
          {
          requesterName : "Vinayak Anvekar",
          lastlogin: new Date(),
          PUSHLIEDDAYFYERSAGREEMENT: client_id,
          PUSHLIEDDAYFYERSDIRECTION: redirectUrlInternal +'',
          PUSHLIEDDAYUPSTOXACCESSTOKEN: globalUptox.access_token,
          PUSHLIEDDAYUPSTOXEXTENDEDTOKEN: globalUptox.extended_token,
            PUSHLIEDDAYUPSTOXUSERID: globalUptox.user_id ,
           PUSHLIEDDAYUPSTOXUSERNAME :  globalUptox.user_name , 

          data : JSON.stringify(data),
             TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
          })
          .then(result => {
            fyersTemplate = result;
             setCORSHeaders( res );
            res.send(fyersTemplate);
          });
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
router.get('/upstoxcallback', async function (req,res) {

    try {
        data = { "Upstox":"GOOD MORNING"}
        let redirectUrlInternal = 'https://fyerssebi.netlify.app/.netlify/functions/netlifyupstoxbridge/api/upstoxcallback';
        //res.send(output)
        /*
        <input type="hidden" id="hidenUserId"  value='<%=PUSHLIEDDAYUPSTOXUSERID%>'>
<input type="hidden" id="hidenUserName"  value='<%=PUSHLIEDDAYUPSTOXUSERNAME%>'>
</div>
        */
        ejs.renderFile(path.join(__dirname, "views/upstox_callback_template.ejs"),
          {
          requesterName : "Vinayak Anvekar",
          lastlogin: new Date(),
          PUSHLIEDDAYFYERSAGREEMENT: client_id,
          PUSHLIEDDAYFYERSDIRECTION: redirectUrlInternal +'',
          PUSHLIEDDAYUPSTOXACCESSTOKEN: globalUptox.access_token,
          PUSHLIEDDAYUPSTOXEXTENDEDTOKEN: globalUptox.extended_token,
            PUSHLIEDDAYUPSTOXUSERID: globalUptox.user_id ,
           PUSHLIEDDAYUPSTOXUSERNAME :  globalUptox.user_name , 

          data : JSON.stringify(data),
             TRADECHECKKEY :"7`xZ6=v63s37L227e214j454mFN#h5Q4", //process.env.BREEZE_API_KEY,
          })
          .then(result => {
            fyersTemplate = result;
             setCORSHeaders( res );
            res.send(fyersTemplate);
          });
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
// SEND the GLOBAL LOGIN DATA
router.get('/icicidirectgloballogin', async function (req,res) {

    try {
         setCORSHeaders( res )
        res.send(JSON.stringify(globalLogin));
    } catch (e) {
        console.log(e);
         setCORSHeaders( res )
        res.send("{ data: error }" );
    }
});
 
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
