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
//import { Context } from '@netlify/functions'
//import { environment } from 'src/environment/environment';
import { environment } from '../../../utils/constants'; //import { CommonConstants, Quote } from '@/utils/constants';
import { isNullOrUndefined } from '../../../utils/constants';
//import { razorpay } from "@lib/razorpay"
import Razorpay from 'razorpay';
import { Buffer } from "buffer";
import {  user as User }   from './user';
import { Money } from './models';
import axios from 'axios';
import  mongoose, { connectMongo } from './mongoose-setup.mjs';
//declare const Buffer;
let localSite = 'localhost:8000';
var localSiteStrings = [localSite, 'localhost:8888', 'localhost:8080', 'localhost:4200', 'localhost:3450'];
var regex = new RegExp(localSiteStrings.join("|"), "i");
let ourDomainPage = 'https://onedinaar.com/'




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 //let routes = routes1(app);
     /** TRY GET  
   PAYLOAD RECEIVED 
  const payload = {
      name: "OneDinaar Trader",
      email: credentials.vId, // Mapping Virtual ID to the email field
      password: credentials.vPass,
      userSalt: credentials.salt,
      underlyingOrderId: order.id
    };
    */
 app.use("/.netlify/functions/netlifyproxyvirtualaccountmongo/api", routes);
//app.use("/api",routes )
 //process.env.PORT
/*app.listen(5112, () => {
  console.log("listening on port " + 5112);//process.env.PORT
});
*/
app.get("/.netlify/functions/netlifyproxyvirtualaccountmongo/", async (req, res) => {
  // const result=await sendMail();
  res.send("Welcome to user registeraton in Mongo DB  with NodeJS");
});

const handler2 =  ServerlessHttp(app) ;

const handler= async (event,context) => {
  var path = "";
      let min = 230;
    let max = 500;
      let isEmptyFetchAllPayRequest = false;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let    razorpayKey='rzp_test_2853QGpWUiQAri' ; //'rzp_test_stNGdMn4H9FjoR',
    let      razorpaySecret= 'X6WVCVKSrAkQS3EBAmkNNagW';
   var instance = undefined

  try {
      //var instance = new Razorpay({ key_id:  razorpayKey, key_secret:razorpaySecret});
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
     await connectMongo();

      console.log("App is created "+app)
       console.log("App routes " +JSON.stringify(app.routes))
       app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      //let routes = routes1(app);
      app.use("/.netlify/functions/netlifyproxyvirtualaccountmongo/api", routes);
      //app.use("/api",routes )
      //process.env.PORT
      /*app.listen(5112, () => {
        console.log("listening on port " + 5112);//process.env.PORT
      });
      */
      app.get("/.netlify/functions/netlifyproxyvirtualaccountmongo/", async (req, res) => {
        // const result=await sendMail();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
       res.setHeader("Access-Control-Allow-Methods", "*");
        res.send("Welcome to register user in MongoDB  with NodeJS");
      });
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
/*
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



      let name = url.searchParams.get('name')?? undefined;
    let email =                  url.searchParams.get('email') ?? undefined; //|| 5000
    let password =               url.searchParams.get('password') ?? undefined; // || 'INR'
    let userSalt =  (url.searchParams.get('userSalt') ) ?? undefined ;// || 'receipt'+random
    let underlyingOrderId  =                url.searchParams.get('underlyingOrderId') ?? undefined ; //   || 'Pune '+random
   // let n2  =             url.searchParams.get('description') ?? undefined ;//|| 'Store Notify Subscription '
     


let parsedBody: any = null;

try {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        parsedBody = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
        const formData = await request.formData();

        parsedBody = Object.fromEntries(formData.entries());
    } else {
        const rawText = await request.text();

        if (rawText) {
            parsedBody = rawText;
        }
    }

    console.log("Parsed Request Body:", parsedBody);

    if (
        parsedBody === null ||
        parsedBody === undefined ||
        (typeof parsedBody === "object" &&
            Object.keys(parsedBody).length === 0)
    ) {
        console.log("Request body is empty");

        isEmptyFetchAllPayRequest = true;
    }

} catch (err) {

    console.log("Body parse failed:", err);

    isEmptyFetchAllPayRequest = true;
}
 if( parsedBody!==undefined && parsedBody !== null ){

  //    Then Access Data Like
  //payload {"name":"OneDinaar Trader","email":"VT_6MZrKstVKXFCrS_20260402",
  // "password":"SrCFXKVtsKrZM62047161805","userSalt":"2047161805","underlyingOrderId":"order_SrCFXKVtsKrZM6"}
    console.log(`request body ${JSON.stringify(parsedBody)} `  );
   // console.log(parsedBody.currency);
   name = parsedBody.name;
   email = parsedBody.email+'@onedinaar.com';
   password = parsedBody.password;
   userSalt = parsedBody.userSalt;
   underlyingOrderId = parsedBody.underlyingOrderId;

 }
 
  
      console.log("searchParams ::  "+JSON.stringify({ name , email , password,userSalt , underlyingOrderId }) );
 
   if (!isNullOrUndefined(name) && !isNullOrUndefined(email) && !isNullOrUndefined(password)  && !isNullOrUndefined(userSalt) && !isNullOrUndefined(underlyingOrderId)  ) {

    let confirmActivationData = {
      name: name,
      email: email, // Mapping Virtual ID to the email field
      password: password,
      userSalt:userSalt,
      underlyingOrderId:underlyingOrderId
    };

     // Forwarding to your Node.js backend signup endpoint
    //const response = await axios.post('https://your-node-backend.com/signup', confirmActivationData);
     let user: any = new User(confirmActivationData);

    // SAVE USER
    await user.save();

    // INITIAL VIRTUAL MONEY
    let initialMoney = new Money({
        money: 10000,
        _creator: user._id
    });

    console.log(
      `initial Money allocated in Mongo DB ${JSON.stringify(initialMoney)}`
    );

    await initialMoney.save();

    // AUTH TOKEN
    let authToken = await user.generateAuthToken();

    console.log(
      `user generated Auth Token Mongo DB ${JSON.stringify(authToken)}`
    );

    console.log(
      `user registered in Mongo DB ${JSON.stringify(user)}`
    );

    console.log(
      `user token ${JSON.stringify(authToken)}`
    );

    // VERY IMPORTANT
    // RETURN DIRECTLY FROM MAIN FUNCTION
    return new Response(
        JSON.stringify({
            success: true,
            user,
            token: authToken,
            message: "Virtual account activated successfully"
        }),
        {
            status: 200,
            headers: {
                "x-auth": authToken,
                "Content-Type": "application/json",

                "Access-Control-Allow-Origin": "*",

                "Access-Control-Allow-Methods":
                    "POST, GET, OPTIONS",

                "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, x-auth, Content-Type, Accept"
            }
        }
    );

 
 
    } // AMT and CURRENCY REQUIRED 
    else {
        
         console.log("UNABLE to create Virtual Account  insuficuent params   "+JSON.stringify({  name , email , password,userSalt , underlyingOrderId }) );
    }
   
 } // request.method === "POST" || request.method === "GET"
  else if (request.method === "OPTIONS") {
    const res = new Response();

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.append("Access-Control-Allow-Headers", "*");
    res.headers.append("Access-Control-Allow-Methods", "*");

    return res;
  }

  
     // res.status(201).json({ order })
  
   
  } catch (error:any) {
      console.log('Error occured either creation of virtual account  or response generaton :');
      console.log(' detais can be noted from error ::: '+JSON.stringify(error ));
      

    return new Response(error.toString(), {
      status: 500,
    })
  }
}
*/
//const getOurDomainPage = (referer , isMobile:any) => {
const getOurDomainPage = (referer , isMobile) => {
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
const encodeJsonToHeader = (jsonData)  => {
  const jsonString = JSON.stringify(jsonData);

  if (typeof Buffer !== "undefined") {
    return Buffer.from(jsonString).toString("base64");
  }
  // this is for frontend Browser 
  return btoa(jsonString);
};

 const convertMillisecondsToDate = (timestampStr ) => {

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