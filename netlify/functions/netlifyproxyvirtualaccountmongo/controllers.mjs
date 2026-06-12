//const axios = require("axios");
import axios from 'axios';
//const path = require('path');
//const fs = require('fs');
//const { generateConfig } = require("./utils");
//const nodemailer = require("nodemailer");
// const smtpTransport  = require('nodemailer-smtp-transport');
//const CONSTANTS = require("./constants");
//const { google } = require("googleapis");
//const    welcomeOptions  = require('./mailworker/WelcomeSupportOnedinaarTemplate')
//const    welcomeInviteOptions  = require('./mailworker/WelcomeInviteTemplate')
//const rt = require("./provate");
//const store  = require( "store2");
//const sgMail = require('@sendgrid/mail');
//const mailboxemails = require("./mail-box-verify-delivery").default
import  mongoose, { connectMongo } from './mongoose-setup.mjs';
import { Buffer } from "buffer";
import {  user as User }   from './user.mjs';
import { Money } from './models.mjs';
import { NseAllIndices } from './nseallindices.mjs';

import dotenv from "dotenv";
dotenv.config();

let nDeliveryDate = '' 
let nDeliveryDateUS =  '';
let pingGmailTimeOutInterval = ''
let readGmailTimeOutInterval = ''
let isMailSendToValid= false;
let awaitForConnection = 0;
let sentVerifyMessageId='';
let snetMessageEnvelope='';
var myVar;
var  stopVerificationCallback = null;
var processing = false;
let isDelivered = { delivered : false  };
let htmlToSendGlobal = '';
// 3. Configure mail options
let  mailOptionsGlobal = {
            from:'sales-man@storenotify.in', //'"Store Notify " <YOUR_EMAIL@gmail.com>',
            to: '',
            subject: 'Welcome to our application!',
            html: '' // The final HTML content
        };
//oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
let    sgApiKey =  process.env.SENDGRID_API_KEY 
  let templateID =  process.env.SENDGRID_TEMPLATE_ID

//CORS HEADERS for localhost:4200 , localhost:3450, localhost:8888 
function setCORSHeaders( res ) { 
    // CHECK OBJECT is a HTTP Response with send method 
  if( res !==null && res !==undefined && typeof(res.send ==='function')){
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
     res.setHeader("Access-Control-Allow-Methods", "*");
  }
} 
stopVerificationCallback = function(req , res ) {
  /* work to do after stopping */
  checkValidDelivery(req , res );

};
function stopGetMailVerification(req , res ) {
  stopVerificationCallback = function(req , res ) {
      /* work to do after stopping */
      checkValidDelivery(req , res );

  };
  if (!processing) finishStopping();
}
let checkValidDelivery  = async(req , res ) => {
  let very =  store.get('isDelivered' ); 
 if(very !== null && very !==undefined) {
 if( very.delivered !==null &&  very.delivered !== undefined)
  {  isDelivered.delivered = very.delivered 
    // clearInterval(readGmailTimeOutInterval)
     // clearInterval(pingGmailTimeOutInterval)
    isMailSendToValid= true;   
    
  }
  else { 
      isDelivered.delivered = false; 
       
  }
  console.log(" verified ",JSON.stringify(isDelivered.delivered))
  if( res !==null && res !==undefined && typeof(res.send ==='function')){
    // res.send(isDelivered)
    console.log(" response object alive  ")
  }
   const nDate = new Date().toLocaleString('en-US', {
     timeZone: 'Asia/Calcutta'
   });
 
 console.log(nDate);
  // FOR TIME BEING CLOSE THIS 
  // finishStopping();
   console.log("closing ... ")
   return isDelivered
  
  
  // process.exit(0)
   }else  { 

    return  { delivered : false};
   } 
}
function finishStopping() {
  clearInterval(pingGmailTimeOutInterval);
 // stopVerificationCallback();
  stopVerificationCallback = null;
} 
/* THIS CAUSES NETLFIY CRASH 
const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error("SERVER_BUSY"));
    }, 20000);
});
*/

async function nseAllIndices(payload , dbConnection ) {

   // read from the nseallindices collection all the nifty indices data 
      let writeStream = undefined;
      let liveIndicesData = [] 
      let liveIndexTableHTML ="";
          try {
            // 1. EXECUTE UNIQUE DE-DUPLICATION AGGREGATION PIPELINE
            // This scans the collection, sorts by recent updates, and isolates unique documents by name
            const uniqueIndices = await NseAllIndices.aggregate([
                { 
                    // Step A: Sort everything descending by updatedAt so the freshest data floats to the top
                    $sort: { updatedAt: -1 } 
                },
                {
                    // Step B: Group by the unique index name field
                    $group: {
                        _id: "$name",
                        // Grabs the rest of the matching document fields from the freshest record
                        current: { $first: "$current" },
                        percentChange: { $first: "$percentChange" },
                        open: { $first: "$open" },
                        high: { $first: "$high" },
                        low: { $first: "$low" },
                        indicativeClose: { $first: "$indicativeClose" },
                        prevClose: { $first: "$prevClose" },
                        prevDay: { $first: "$prevDay" },
                        oneWeekAgo: { $first: "$oneWeekAgo" },
                        oneMonthAgo: { $first: "$oneMonthAgo" },
                        oneYearAgo: { $first: "$oneYearAgo" },
                        yearHigh: { $first: "$yearHigh" },
                        yearLow: { $first: "$yearLow" },
                        isNegative: { $first: "$isNegative" },
                        updatedAt: { $first: "$updatedAt" }
                    }
                },
                {
                    // Step C: Project the grouped fields back into a clean object structure
                    $project: {
                        _id: 0, // Hides the grouping ID
                        name: "$_id", // Restores the index name to its original property key
                        current: 1,
                        percentChange: 1,
                        open: 1,
                        high: 1,
                        low: 1,
                        indicativeClose: 1,
                        prevClose: 1,
                        prevDay: 1,
                        oneWeekAgo: 1,
                        oneMonthAgo: 1,
                        oneYearAgo: 1,
                        yearHigh: 1,
                        yearLow: 1,
                        isNegative: 1,
                        updatedAt: 1
                    }
                },
                {
                    // Step D: Sort alphabetically by index name so the cards preserve layout order
                    $sort: { name: 1 }
                }
            ]).exec();
    
            // 2. CHECK FOR EMPTY DATA RECORDS
            if (!uniqueIndices || uniqueIndices.length === 0) {
                console.warn("⚠️ Database query executed successfully, but collection 'nseallindices' contains zero records.");
                if(writeStream !==undefined && writeStream !==null){ 
                       writeStream.write(`[worker_write]${workerName} ${Date.now()}    mongoDB   worker Database query executed successfully, but collection 'nseallindices' contains zero records. \r\n`);
                }      
                 // Serve up the elegant offline placeholder playground state cleanly
               // const fallbackHtml = transformJsonToResponsiveCards(null);
             //   return res.status(200).send(fallbackHtml);
            }
            else {
                 let retreivedUniqueIndices  = Object.assign( {} , uniqueIndices);
                 store.set('indicesData',retreivedUniqueIndices);
                 liveIndicesData  = retreivedUniqueIndices; 

                 if (liveIndexTableHTML !=="" || liveIndicesData.length > 0){  
                 //  parentPort.postMessage({ status: 'success', data: { html: liveIndexTableHTML , indices : liveIndicesData } });      
                 }

            }
            console.log(`✅ Success! Pulled ${uniqueIndices.length} distinct index records from Atlas.`);
              if(writeStream !==undefined && writeStream !==null){ 
                       writeStream.write(`[worker_write]${workerName} ${Date.now()}    mongoDB   worker Success! Pulled ${uniqueIndices.length} distinct index records from Atlas. \r\n`);
                }      
            // 3. COMPILE STREAM INTO THE RESPONSIVE TAILWIND MATRIX CAROUSEL
           // const fullyCompiledHtml = transformJsonToResponsiveCards(uniqueIndices);
           // return res.status(200).send(fullyCompiledHtml);
    
        } catch (mongooseError) {
            // MONGOOSE & CONNECTION EXCEPTION HANDLING BLOCK
            console.error("🚨 Mongoose Query Exception Intercepted:", mongooseError.message);
            if(writeStream !==undefined && writeStream !==null){ 
                       writeStream.write(`[worker_write]${workerName} ${Date.now()}    mongoDB   worker Mongoose Query Exception Intercepted: ${JSON.stringify( mongooseError.message)} \r\n`);
             }     
            // Fallback protection: Generate backup playground markup so user app frames never break
            // try {
            //     const recoveryHtml = transformJsonToResponsiveCards(null);
            //     return res.status(200).send(recoveryHtml);
            // } catch (compilationError) {
            //     console.error("Critical HTML generator malfunction:", compilationError.message);
            //     return res.status(500).send('<p style="font-family:sans-serif; text-align:center; padding:40px; color:#64748b;">Connection Timeout. Please refresh dashboard view.</p>');
            // }
        }

           return liveIndicesData;


}
async function registerUser(payload , dbConnection ) {

   const {
      name,
      email,
      password,
          userSalt ,
    underlyingOrderId 
   } = payload;
   // let User = undefined;
 
            let email1 = email+'@onedinaar.com';

             
                let confirmActivationData = {
                  name: name,
                  email: email1, // Mapping Virtual ID to the email field
                  password: password,
                  userSalt:userSalt,
                  underlyingOrderId:underlyingOrderId
                };
                
                 // Forwarding to your Node.js backend signup endpoint
                //const response = await axios.post('https://your-node-backend.com/signup', confirmActivationData);
                 let user  = new User(confirmActivationData);
            
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
                //setCORSHeaders( res )
                  const data = {
                        success: true,
                        user,
                        token: authToken,
                        message: "Virtual account activated successfully"
                    }
                    return data;
          
            
     
}
async function register(req, res, dbConnection) { 
    let   name = req.body.email;
    let   email = req.body.email;
 
    let   password = req.body.password;
    let   userSalt = req.body.userSalt;
    let   underlyingOrderId = req.body.underlyingOrderId;
    
    console.log("req.body ", JSON.stringify(req.body))
    console.log("name ", name)
    console.log("email ", email)
    console.log("userSalt ", userSalt)
    console.log("underlyingOrderId ", underlyingOrderId);
    let User = undefined;
    //setCORSHeaders( res )
     if( email!==undefined && email !==null &&  email!=='null')
     { 
        try {
           if(dbConnection === underlyingOrderId || dbConnection === null){
             await connectMongo();
           }
            else {
              console.log("connection from router available ")
              console.log("createing user model ")
              // Use the specific connection to get a model 
              // import {  user as User }   from './user.mjs';
                 User = dbConnection.model('User', require('./user.mjs'));
            }

             email = email+'@onedinaar.com';

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
                 let user  = new User(confirmActivationData);
            
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
                setCORSHeaders( res )
                  const data = {
                        success: true,
                        user,
                        token: authToken,
                        message: "Virtual account activated successfully"
                    }

               res.status(201)                // Set status code
                 .set(  "x-auth",authToken) // Set custom header
                    .json(data);                // Send JSON body
                /*res.send(JSON.stringify(),
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
                  );*/
            
         
             } // request.method === "POST" || request.method === "GET"
              else if (request.method === "OPTIONS") {
                    setCORSHeaders( res )
            
              /*  res.headers.set("Access-Control-Allow-Origin", "*");
                res.headers.append("Access-Control-Allow-Headers", "*");
                res.headers.append("Access-Control-Allow-Methods", "*"); */
                 res.statusCode = 204; // No Content
                    res.end();
               return;
              //  res.send(JSON.stringify({"Registeraton": "Some user details are missing  "}));
               // return res;
              }
            
            } catch(erre){
                 console.log('Error occured either creation of virtual account  or response generaton :');
                  console.log(' detais can be noted from error ::: '+JSON.stringify(erre ));
                    setCORSHeaders( res )
		            res.send(JSON.stringify(erre));

                //works only in .mts 
               /* 
                return new Response(error.toString(), {
                  status: 500,
                })*/
            }
      }
      else {
        console.log(" Seems Bad User registeration request  ... ") 
		     setCORSHeaders( res )
		      res.send(JSON.stringify({"Registeraton": "Some user details are missing  "}));
      }
}


export {register , registerUser , nseAllIndices };

export default    register ;
//export default   {  register } 

/*

module.exports =   {
  getUser,
  sendMail,
  getDrafts,
  readMail, 
  register,
 // writeEmailFromInput
};*/
