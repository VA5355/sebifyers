/*// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default (request, context) => {
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


// Docs on event and context https://api.icicidirect.com/apiuser/home
//https://www.npmjs.com/package/breezeconnect
//npm install breezeconnect
const express = require("express");
// Capital ServerlessHttp is fine small serverless not work '
const ServerlessHttp = require('serverless-http');
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
const routes = require('./routes')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/************************* EEXPRESSS SETIING the VIEW ENNINGE ************ */
//Notice //set express view engine to ejs
app.set("view engine", "ejs");
//var fyersModel= require("upstox-js-sdk").fyersModel
//var client_id= "7GSQW68AZ4-100"
var api_key="7`xZ6=v63s37L227e214j454mFN#h5Q4";
var secret_key="005@303Vgc26vI5153QD6^73672145~h";
import { asyncContext } from "./context/asyncContext";
var client_id= "75BX5B"
// login = https://api.icicidirect.com/apiuser/login?api_key=api_key
/*
Request Example:-
{"AppKey":"45$4O04v5388Y1x14633245K_9r6106j",
 "time_stamp":"03-Jul-2019 12:47:23",
 "JSONPostData":{\"UserID\":\"test\",\"API_Session\":\"36\",\"APPKey\":\"45$4O04v5388Y1x14633245K_9r6106j\"},
 "Checksum":"4A05E57572862484A48543FA2418CBE12117534DD28600A028F829441D008179"} 

 Response Example:-
{
	"Status": 200,
	"Error": null,
	"Success": {
		"exg_trade_date": {
			"NSE": "20-Jun-2019",
			"BSE": "20-Jun-2019",
			"FNO": "03-Jul-2019",
			"NDX": "02-Jul-2019"
		},
		"exg_status": {
			"NSE": "O",
			"BSE": "O",
			"FNO": "O",
			"NDX": "O"
		},
		"segments_allowed": {
			"Trading": "Y",
			"Equity": "Y",
			"Derivatives": "Y",
			"Currency": "Y"
		},
		"Idirect_Userid": "test",
		"SessionToken": "1173201",
		"idirect_user_name": "ert ert",
		"idirect_lastlogin_time": "03-Jul-2019 12:47:37"
	}
}
*/
//var redirectUrl  = "https://192.168.1.8:56322/fyersauthcodeverify"
var redirectUrl  = "https://fyerssebi.netlify.app/.netlify/functions/netlifystockicicidirectbridge/api/icicidirectauthcodeverify" 
 // we cannot use the above redirect uri as icicidirect allow only one App , so we may have to either replace the existing 
 //  https://localhost:56322/icici/login  with above   https://localhost:56322/getMoneyFlowScreen
 // so the menucomponent .jsx   logByIciciDirectPlatform will point to TRADE_LOGIN_URL i.e. https://api.icicidirect.com/apiuser/login?api_key=api_key
 // but the POP Up Form will finally redirect to the old app i.e. https://localhost:56322/icici/login
 // and not call back our all coded -- https://fyerssebi.netlify.app/.netlify/functions/netlifystockicicidirectbridge/api/icicidirectauthcodeverify
//var redirectUrl  = "https://store-stocks.netlify.app/.netlify/functions/netlifyupstoxbridge/api/upstoxauthcodeverify"
//var fyers= new fyersModel({"path":"./","enableLogging":true})
//fyers.setAppId(client_id)

//fyers.setRedirectUrl(redirectUrl)
var authcode='';

//var URL=fyers.generateAuthCode()
  //use url to generate auth code
  //  console.log("FYERS URL " , URL) 

   
     // redirect_uri=https://192.168.1.8:56322/fyersauthcode&response_type=code&state=sample_state
   var axios = require('axios');  // "secret_key":"MGY8LRIY0M",
   var data = { "client_id":client_id, " redirect_uri":redirectUrl,
    "response_type":"code", "state":"sample_state"
   };
   var config = {
     method: 'get',
     url: "https://api.icicidirect.com/apiuser/login?api_key="+api_key,
     headers: { 'Content-Type': 'application/json' },
     data : data
   };

   app.use('/asset', express.static(__dirname +'../../../../public'));
   //    app.use('/localcss', express.static(path.join(__dirname +'/css')));
   //    app.use('/localscripts', express.static(path.join(__dirname +'/iciciscripts')));
   //     app.use('/upload', express.static(path.join(__dirname +'/upload')));
   // 	app.use('/images', express.static(path.join(__dirname +'/images')));
     app.use('/js', express.static(path.join(__dirname + '../../../node_modules/bootstrap/dist/js')));
       app.use('/jquery', express.static(path.join(__dirname + '../../../node_modules/jquery/dist')));
       app.use('/bootcss', express.static(path.join(__dirname + '../../../node_modules/bootstrap/dist/css')));
       app.use('/icicicss', express.static(path.join(__dirname + '../../../node_modules/bootstrap/dist/css')));

 const handler2 =  ServerlessHttp(app) ;
const handler = async (event,context) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: '',
      };
    }
    if(app !==null && app !==undefined) { 

      console.log("App is created "+app)
     
       app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      //let routes = routes1(app);
      app.use("/.netlify/functions/netlifystockicicidirectbridge/api", routes);
      let reqId = req.headers["x-user-id"] ;
       const store = {
        requestId: crypto.randomUUID(),
      userId:reqId ,
      };

  asyncContext.run(store, () => next());
      //app.use("/api",routes )
      //process.env.PORT
      /*app.listen(5112, () => {
        console.log("listening on port " + 5112);//process.env.PORT
      });
      */
      app.get("/.netlify/functions/netlifystockicicidirectbridge/", async (req, res,next) => {
        // const result=await sendMail();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
       res.setHeader("Access-Control-Allow-Methods", "*");
        if (req.method === 'OPTIONS') return res.status(200).end();
       next();
        //res.send("Welcome to Gmail API with NodeJS");
      });

        console.log("App routes " +JSON.stringify(app.routes))
    }
    else { 
      console.log("App creation failed ")
    }
    return await   handler2(event, context)
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
