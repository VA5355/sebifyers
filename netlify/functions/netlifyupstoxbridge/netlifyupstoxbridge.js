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


// Docs on event and context https://upstox.com/developer/api-documentation/authorize
// https://upstox.com/developer/api-documentation/upstox-generated-sdk
//npm install upstox-js-sdk 
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
var client_id= "75BX5B"
//var redirectUrl  = "https://192.168.1.8:56322/fyersauthcodeverify"
var redirectUrl  = "https://fyerssebi.netlify.app/.netlify/functions/netlifyupstoxbridge/api/upstoxauthcodeverify"
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
     url: " https://api.upstox.com/v2/login/authorization/dialog",
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
      app.use("/.netlify/functions/netlifyupstoxbridge/api", routes);
      //app.use("/api",routes )
      //process.env.PORT
      /*app.listen(5112, () => {
        console.log("listening on port " + 5112);//process.env.PORT
      });
      */
      app.get("/.netlify/functions/netlifyupstoxbridge/", async (req, res,next) => {
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
