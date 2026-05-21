const { parentPort, workerData, isMainThread } = require('worker_threads')
const store  = require( "store2");
const nodemailer = require("nodemailer");
 const smtpTransport  = require('nodemailer-smtp-transport');
const CONSTANTS = require("../constants");
const Imap = require('imap');
const { ImapFlow } = require("imapflow");
const {simpleParser} = require('mailparser');
const mailboxemails = require("../mail-box-emails")
let nDeliveryDate = '' 
let nDeliveryDateUS =  '';
let pingGmailTimeOutInterval = ''
let readGmailTimeOutInterval = ''
 
var processing = false;
let isMailSendToValid= false;
let awaitForConnection = 0;
sentVerifyMessageId=undefined;
snetMessageEnvelope=undefined


stopVerificationCallback = function() {
    /* work to do after stopping */
    return checkValidDelivery();
};
function finishStopping() {
    clearInterval(pingGmailTimeOutInterval);
   // stopVerificationCallback();
    stopVerificationCallback = null;
  }
function stopGetMailVerification() {

    stopVerificationCallback = function() {
        /* work to do after stopping */
        checkValidDelivery();
    };
    if (!processing) finishStopping();
  }
  checkValidDelivery  = async() => {
    let very =  store.get('isDelivered' );
   if(very !== null && very !==undefined) {
   if( very.delivered !==null &&  very.delivered !== undefined)
    {  isDelivered.delivered = very.delivered 
        isMailSendToValid= true;   
     
    }
    else { 
        isDelivered.delivered = false;    
    }
    parentPort.on("message", async (data) => {

        // await func1(...)
      
        // await func2(...)
        
        console.log("Done");
      
        parentPort.postMessage(JSON.stringify(isDelivered.delivered));
      
      });
   
    console.log(" verified ",JSON.stringify(isDelivered.delivered))
    const nDate = new Date().toLocaleString('en-US', {
     timeZone: 'Asia/Calcutta'
   });
   
   console.log(nDate);
    finishStopping();
     console.log("closing ... ")
    // process.exit(0)
     }
     return isDelivered
  }

async function readEmail (passedMessage) { 
    console.log('Starting to read emails ');
  
     pingGmailTimeOutInterval = true
     let isDelivered = { delivered : true }
  readGmailTimeOutInterval =   () => {   awaitForConnection++;
      let very=  null;

      ( async () => {
        sentVerifyMessageId =passedMessage
        stopGetMailVerification()
        very = await mailboxemails.getMailReader(sentVerifyMessageId.messageIdgmail, isDelivered, 
            stopVerificationCallback  ).then((res)=>   {  console.log("Awaiting verification   " +JSON.stringify(typeof res) ) 
           return     res  }      
          ).catch(_ =>  "Error") 
      })();
      
       if(very !== null && very !==undefined) {
         console.log("very ", JSON.stringify(typeof very))
         if( very.delivered !==null &&  very.delivered !== undefined)
          {  isDelivered.delivered = very.delivered }
          else { 
              isDelivered.delivered = false; 
          }
          console.log(" verified ",JSON.stringify( isDelivered))
         }
       if(store.get('isDelivered' ) !=null && store.get('isDelivered' )!==undefined )  {
        let very =  store.get('isDelivered' );
        if(very !== null && very !==undefined) {
        if( very.delivered !==null &&  very.delivered !== undefined)
         {  isDelivered.delivered = very.delivered 
          //  clearInterval(readGmailTimeOutInterval)
          clearInterval(pingGmailTimeOutInterval)
           isMailSendToValid= true; return 
         }
         else { 
             isDelivered.delivered = false;  return 
         }
        }
        
       }
       checkValidDelivery  = async() => {

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
         const nDate = new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Calcutta'
        });
        
        console.log(nDate);
          console.log("closing ... ")
          process.exit(0)
      
          }
          return isDelivered
       }
       pingGmailTimeOutInterval =   setInterval(  () => {console.log(`Gmail verify ..... ${awaitForConnection} `);
                  let isDev =       (async () => {
                        await checkValidDelivery().then(res =>  res 
                   );
                })() ;
                awaitForConnection++
          }  ,500 )
          setTimeout(() => { clearInterval(pingGmailTimeOutInterval)
                    process.exit(0)
           } , 7000);
    
    console.log(`Connection ..... ${awaitForConnection} `)
    }  
   console.log(" read mail over "+isMailSendToValid)
   readGmailTimeOutInterval() 

 }
 // AWAIT READ 
async function awaitVerify(obj) {

   return  await readEmail (obj) ; 
}

 // START PROCESSING WORKER DATA 
 if(workerData !==null && workerData !==undefined){

    console.log("WORKER RECEIVED ---: ", workerData) //you have worker data here 

    const obj =  workerData!==undefined ? JSON.parse(workerData) :undefined
    // {messageIdgmail:"EMPTY" , messageId :"" , result:'unverified'}
    if(obj !== undefined)
    {   
        console.log("WORKER PARSED ---: ", JSON.stringify(obj))
        sentVerifyMessageId = obj
        parentPort.on("message", async (data) => {
            awaitVerify (obj).then(res => {

                console.log("WORKER PROCESSING --: " )
              }  ).catch(console.error); 
            // await func1(...)
          
            // await func2(...)
            
            console.log("Done");
          
            parentPort.postMessage(JSON.stringify(isDelivered.delivered));
          
          });
      
       
    }
    
  
 }
 else {
    console.log("workerData:  ","EMPTY") //you have worker data here 
    if(sentVerifyMessageId == undefined)
     { 
        const obj =  sentVerifyMessageId!==undefined ? sentVerifyMessageId : {messageIdgmail:"EMPTY" , messageId :"" , result:'unverified'}
   
        
        parentPort.postMessage(obj);
     }
 }
 