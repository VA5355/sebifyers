// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
/*export default (request, context) => {
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
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
//import express, {Router} from 'express'
const path = require('path');
const fs = require('fs');
const express = require("express");
// Capital ServerlessHttp is fine small serverless not work '
const ServerlessHttp = require('serverless-http');
//const app = require('./app');
const routes = require('./routes')
require("dotenv").config();
const store  = require( "store2"); 
// var fyersModel= require("fyers-api-v3").fyersModel
var client_id=  process.env.FYERS_CLIENT_ID;  // "TRLV2A6GPL-100"
var client_secret=  process.env.FYERS_SECRET_KEY;  // "TRLV2A6GPL-100"

// fyers.setAppId(client_id)
 let redirectUrl = process.env.FYERS_REDIRECT_URI;
 //fyers.setRedirectUrl(redirectUrl)
 // const welcomeEmailTemplate  = require("./mailworker/welcomesendgrid");
 // const strWelcome = welcomeEmailTemplate.welcomeEmailTemplate;
/**  THIS NEEDS to the INITIALISED AT GLOBAL LEVEL  I.E. AT the controller LEVEL or netlifyproxyemailer function and placed in store2  */
 // const store  = require( "store2");
 //        store.set('welcomeEmailTemplate', strWelcome);
// Create a JSDOM instance from the HTML string
 
// Runs ONCE per cold start
 // const welcomeTemplatePath =  path.join(process.cwd(), 'netlify/functions/netlifyproxyemailer/mailworker/email_template.html');
// Cache the file content at startup (outside the handler)
//const filePath = path.resolve(process.cwd(), 'public/email_template.html');
let htmlContent = '';
/*
try {
    ( async   (cl , st , fp) => { 
     cl.log('HTML filePath '+JSON.stringify(fp));
     let  htmlContentFileStr = await fs.readFileSync(fp, 'utf8');
             cl.log('HTML loaded successfully');
       st.set('welcomeEmailTemplate', htmlContentFileStr);
        return htmlContentFileStr;
      })(console, store , filePath );

} catch (err) {
  console.error('Error reading HTML:', err);
}*/
 //  const welcomeTemplatePath =  path.join(__dirname, 'mailworker','email_template.html');
/*const welcomeTemplatePath = path.join(
  __dirname,
  "templates",
  "welcome.html"
);*/
/*
const welcomeEmailTemplateHtml = fs.readFileSync(
  welcomeTemplatePath,
  "utf8"
);*/
// Access the document object
//const document = dom.window.document;

// Now you can use standard DOM methods to work with the HTML
//const h1Element = document.querySelector(".wrapper");
//console.log(h1Element.textContent); // Output: Hello World!

//const contentDiv = document.getElementById(".wrapper")
/**  THIS NEEDS to the INITIALISED AT GLOBAL LEVEL  */
 // store.set('welcomeEmailTemplate', welcomeEmailTemplateHtml);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 //let routes = routes1(app);
 //app.use("/.netlify/functions/netlifyproxyemailer/api", routes);
   app.use("/.netlify/functions/netlifystockfyersbridge/api", routes);
//app.use("/api",routes )
 //process.env.PORT
/*app.listen(5112, () => {
  console.log("listening on port " + 5112);//process.env.PORT
});
*/
 app.get("/.netlify/functions/netlifystockfyersbridge/",  async (req, res) => {
  // const result=await sendMail();
  res.send("Welcome to Fyers API v3 with NodeJS");
});
const handler2 =  ServerlessHttp(app) ;
const handler= async (event,context) => {
  var path = "";
  try {
    console.log("QUERY PARAMETERS " + JSON.stringify(event.queryStringParameters) )
    let body = event.body;
    console.log("context " + JSON.stringify(context));
    console.log("event " + JSON.stringify(event));
    console.log("body " + JSON.stringify(body));
    path = event.rawUrl != undefined ? event.rawUrl : "/";
    console.log("path " + JSON.stringify(path));
    let checkQueryString = path.split("?")
    const routes = require('./routes')
    if (event.method === "POST") {
     // const res = context.json({ message: 'you posted!' });
       console.log("event method POST ");
    } else if (event.method === "OPTIONS") {
      console.log("event method OPTIONS ");
    }
    
    if(app !==null && app !==undefined) { 

      console.log("App is created "+app)
       console.log("App routes " +JSON.stringify(app.routes))
       app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      //let routes = routes1(app);
       app.use("/.netlify/functions/netlifystockfyersbridge/api",  routes);
      //app.use("/api",routes )
      //process.env.PORT
      /*app.listen(5112, () => {
        console.log("listening on port " + 5112);//process.env.PORT
      });
      */
      app.get("/.netlify/functions/netlifystockfyersbridge/",async (req, res) => {
        // const result=await sendMail();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
       res.setHeader("Access-Control-Allow-Methods", "*");
        res.send("Welcome to  Fyers API v3 with  NodeJS");
      });

        console.log("App routes " +JSON.stringify(app.routes))
    }
    else { 
      console.log("App creation failed ")
    }
   
    /*
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }*/
     
   return await   handler2(event, context)
     
   

  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
//module.exports.handler =   handler(event, context);
 module.exports = { handler }
