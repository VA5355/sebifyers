const axios = require("axios");
const path = require('path');
const fs = require('fs');
const { generateConfig } = require("./utils");
const nodemailer = require("nodemailer");
 const smtpTransport  = require('nodemailer-smtp-transport');
const CONSTANTS = require("./constants");
const { google } = require("googleapis");
const    welcomeOptions  = require('./mailworker/WelcomeSupportOnedinaarTemplate')
const    welcomeInviteOptions  = require('./mailworker/WelcomeInviteTemplate')
const rt = require("./provate");
const store  = require( "store2");
const sgMail = require('@sendgrid/mail');
const mailboxemails = require("./mail-box-verify-delivery").default
require("dotenv").config();
const welcomeEmailTemplate  = require("./mailworker/welcomeonedinaarsendgrid");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
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
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
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
async function readEmail (req , res ) { 
  console.log('Starting to read emails ');
  pingGmailTimeOutInterval = true
   let isDelivered = { delivered : true }
   console.log( "req " +  (typeof req)+ "res " +  (typeof res) )
   let checkDelivery = function  (req , res)  { 
    console.log( "checkDelivery  req " +  (typeof req)+  "    res " +  (typeof res) )
    return checkValidDelivery(req,res)    }
    checkDelivery = checkDelivery(req , res);
   stopGetMailVerification(req , res );
let readGmailTimeOutInterval = function( req , res) {
     awaitForConnection++;
     let very=  null;
    ( async function (req , res)   {
      // INITIALISE CALL BACCK after FINIGN the DEVLIVERY EMAIL success or FAilure
      // 
      console.log( "async  req " +  (typeof req)+  "    res " +  (typeof res) )
      console.log( "checkDelivery ", typeof checkDelivery)
      stopGetMailVerification(req , res );
      very = await mailboxemails.getMailReader(sentVerifyMessageId.messageIdgmail, isDelivered , checkDelivery ,req,res)
         .then((res)=>   {  console.log("Awaiting verification   " +JSON.stringify(typeof res) ) 
         return     res  }      
       ).catch(_ =>  "Error") 
    })(req , res);
    
      return new Promise( (resolve , reject) => {    // PROME OVER 
       let  pingTimeOutInterval =   setInterval( function ()   {
         console.log(`Gmail verify ..... ${awaitForConnection} `);
         awaitForConnection++
       }  ,500 )

     //if (theNum < 10) { 
            pingGmailTimeOutInterval =   setTimeout( async function ()   {
              // console.log(`Gmail verify ..... ${awaitForConnection} `);
                  if( req !==undefined  &&  res!== undefined) {
                    console.log( "Gmail Verifying  EMAIL " +  ( JSON.stringify (req.body[0]))+  "   RESPONSE " +  (typeof res) )
                   let isChecked = await  checkValidDelivery(req , res)//.then(deliver =>   resolve(deliver)       );
                       if ( isChecked  !== null && isChecked !== undefined ) { 
                          // 
                           // STOP The TIMER --- ABOVE 
                            clearInterval(pingTimeOutInterval)
                           //  .then((result ) => {
                          console.log("await checkD  "+JSON.stringify(isChecked) )  ; resolve(isChecked)
                          // })
                       }
                    // THIS ABOVE will KEEP RETUNING need to Check this aboce .
                  }
              // checkValidDelivery(req , res).then(res =>  res       );
                      /*let isDev =       (async (req , res) => {
                            await checkValidDelivery(req , res).then(res =>  res 
                                  );
                        })(req , res) ;*/
              //      awaitForConnection++
              }  , 4000)   // 10000  this TAKE too long
     //  } 
     });  // PROME OVER 
     
       /*setTimeout(() => { clearInterval(pingGmailTimeOutInterval)
                //  process.exit(0)
         } , 7000);*/
   console.log(`Connection ..... ${awaitForConnection} `)
 }  
 console.log(" read mail over "+isMailSendToValid)
 return await readGmailTimeOutInterval(req , res) /*.then( (tenCROSS3secondResukt) => {   console.log( "Gmail verifiyed bounces past 30 seconds  " );
                                 // --> 'done!'
                                    return tenCROSS3secondResukt
                     }) */
}
async function readEmailTemplate () {

    if (store !== undefined && store !== null ){
            htmlToSendGlobal = store.get('welcomeEmailTemplate');

           console.log("Store 2 set the htmlToSendGlobal ");
            console.log("htmlToSendGlobal  "+JSON.stringify(htmlToSendGlobal));
    }
    else {
        console.log("Store 2 not available ")
    }
   // const content =// await fs.readFile(CREDENTIALS_PATH);
  //  const filePath =  path.join(process.cwd(), 'mailworker/email_template.html'); //path.join(__dirname, 'email-template.html');
  /* await   fs.readFile(filePath, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            console.error('Error reading email template file:', err);
            return;
        }

        // 2. Replace placeholders with dynamic data
        let htmlToSend = html ;//.replace('{{username}}', username);
        htmlToSendGlobal = htmlToSend;//.replace('{{resetUrl}}', resetUrl);

        // 3. Configure mail options
        const mailOptions = {
            from:'sales-man@storenotify.in', //'"Store Notify " <YOUR_EMAIL@gmail.com>',
            to: 'recipientEmail',
            subject: 'Welcome to our application!',
            html: 'mlToSend '// The final HTML content
        };
       
     
    }); */  // 4. Send the email
       /* transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });*/
}
// READ Email temaplate before hand 
readEmailTemplate();

async function verifyEmailDelivery (req , res ) {  
  const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});
console.log(nDate);
  console.log('Read email to start ... ');

   return new Promise((resolve, reject) => {
      setTimeout( () => {
        resolve( readEmail(req ,res ));
            
         }, 300)
    /* setTimeout(() => {
       resolve('done!');
     });*/
   });

  
 }

 //new gmail api directly manual oauth flow to get the token
 // it returns a message resource with its id
 async function checkSentMessageId(req, res , messageId , to ) {
  try {
    setCORSHeaders( res )
     console.log(" checkSentMessageId searching for mesage send  ")
     console.log(" ........ "+to)
      const url = `https://gmail.googleapis.com/gmail/v1/users/fairvinay@gmail.com/messages/${messageId}`;
      const { token } = await oAuth2Client.getAccessToken();
      const config = generateConfig(url, token);
      const response = await axios(config);
  
      let data = await response.data;
  
       return data;
    } catch (error) {
      return error;
    }
      
 }


 async function listMessages(auth, query) {  
  return new Promise((resolve, reject) => {    
    const gmail = google.gmail({version: 'v1', auth});    
    gmail.users.messages.list(      
      {        
        userId: 'me',        
        q: query,      
      },            (err, res) => {        
        if (err) {                    reject(err);          
          return;        
        }        
        if (!res.data.messages) {                    resolve([]);          
          return;        
        }                resolve(res.data.messages);      
      }    
    );  
  }) 
 }  
async function writeEmail(req, res) { 
    let   user_email = req.body.email;
    let   user_email_params = req.params.email;
    let   user_id = req.body.virtualId;
    console.log("req.body ", JSON.stringify(req.body))
    console.log("user_email ", user_email)
    console.log("user_email_params ", user_email_params)
    setCORSHeaders( res )
     if( user_email!==undefined && user_email !==null &&  user_email!=='null')
     { 
        try {
             //let paswd  = 'For it @ 123'.replace(/ /g, '');
             let gpone = process.env.GAPPPASSLATEST;
             let paswd  = gpone.replace(/ /g, '');
             var transporter = nodemailer.createTransport(smtpTransport({
              service: 'gmail',
              host: 'smtp.gmail.com', 
              auth:  {    // https://myaccount.google.com/apppasswords
                  user: 'fairvinay@gmail.com',
                  pass: paswd
                }
            })); 
           CONSTANTS.mailoptions.to=user_email//'admin-sales@storenotify.in'
           let user = user_email;
           if(user_email.indexOf("@") > -1){
            user = user_email.substring(0, user_email.indexOf("@"));
           }
           let welText =   welcomeOptions.mailOptions .html
            let iser = { 
                                    username: user,
                                    virtualId: user_id,
                                    email:user_email,
                                    password: ''
                                              
                                }
            if(welText.indexOf("Onedinaar") > -1 ) {

               welText= welcomeOptions.getInjected(iser);
            }
           welText = welText.replace("(StoreUser)",user);
            console.log("check html template included or not "+welText);
           let   th = JSON.stringify(store.get('welcomeEmailTemplate'));
             let  strTH =welText.replace("(StoreUser)",user);
            strTH  = strTH.replace("\r\n", "");
            const mailOptions = {
              ...CONSTANTS.mailonedinaaroptions,
              html: strTH,
              headers: {
                  'Content-Type': 'text/html; charset=UTF-8'
                }
            };
            //override the mailonedinaaroptions to : viraatmailbox@gmail.com to actuall
            mailOptions.to = user_email;
            let delivered  =  false; let noResponseDelivered = true;
               console.log("trying after verying email id , send welcome from sendgrid using html themplate ")
                                let reqBody2 = { 
                                    username: user,
                                    email:user_email,
                                    password: ''
                                              
                                }
                                sendMailer( sgApiKey ,reqBody2) 
                                //sendHtmlEmail( recipientEmail ,username ,resetUrl);
                              // Example usage
                       sendHtmlEmail( transporter , user_email, user, 'https://storenotify.in/login');
    
             const result = await transporter.sendMail(mailOptions) .then((r)=> {
                   console.log( "Email Verification in process ... ") 
                   console.log( " ... ", JSON.stringify(r)) 
                   let response =  r.response ;
                   if(response !==null && response !==undefined){
                      // SPLIT get the 3 rd element which is supposed to be MESSAGEID
                      let parseDRes = response.split(" ")
                      if(Array.isArray(parseDRes)){
                          // 
                          console.log("Parsed  "+JSON.stringify(parseDRes))
                          if(parseDRes[4] !==null && parseDRes[4]!==undefined){
                            sentVerifyMessageId={  messageIdgmail : r.messageId , messageId: parseDRes[4] };
                            snetMessageEnvelope=r.envelope;
                            console.log( "Message  ", JSON.stringify(sentVerifyMessageId))
                            console.log( "Envelope  ", JSON.stringify(snetMessageEnvelope))
                          // START VERIFICATION HERER 
                          nDeliveryDateUS = new Date().toISOString() //new Date().toLocaleString('en-US'  );
                          nDeliveryDate = new Date().toLocaleString('en-US', {
                           timeZone: 'Asia/Calcutta'
                            });
                         // console.log("gmail result  ",result); 
                           console.log("US Date  ",nDeliveryDateUS);
                           console.log("LOCAL Date  ",nDeliveryDate);
                           isMailSendToValid=true;
                        
                         // LIST the MESSAGES SENT IMAP EXTENSION "LIST (\HasNoChildren \Sent) "/" "[Gmail]/Sent Mail" 
                       //   listMessages(oAuth2Client, 'label:sent subject:reminder' );
                          (async function () { 

                              await checkSentMessageId(req, res ,  r.messageId ,snetMessageEnvelope.to[0] )
                              .then(( r)=> {
                                console.log(" checkSentMessageId succesfukkt send message ",JSON.stringify (r))
                                isDelivered.delivered = true
                             
                                res.send(isDelivered);

                              }, (error) => {
                                 
                                 console.log(" checkSentMessageId  error  ",JSON.stringify (error))
                                 isDelivered.delivered = false;
                                 res.send(isDelivered);
                              }
                            
                              )
                           /*

                            delivered  =  await  verifyEmailDelivery(req , res );
                               
                           console.log( ' type  delivered '+ JSON.stringify(typeof delivered) )
                           console.log( ' delivered '+ delivered )
                               res.send(delivered);
                              */
                           })()
                       

                          }
                      }
                    }
              }); 
             //     
             if (  noResponseDelivered && !isMailSendToValid){
              res.send(delivered);
             }
           
           // res.send(sentVerifyMessageId);
          } catch (error) {
            console.log(error);
             console.log(" error  ", error)
           
             res.send(error);
          }
        }
        else   {
          let error = " BAD request || SEND --> {'email' :'valid  email'}"
           console.log("BAD request {'email' :'valid  email'}  ", error)
           res.send(error);  
        }
}
function sendMailer (kte  , iser)   {
    // Initialize API key once (cold start safe)
    console.log("API KEY "+kte);
    //sgMail.setApiKey('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');
    let key  =process.env.SENDGRIDKEY

    sgMail.setApiKey(key);
    let templateIDLocal = templateID;

      let html = welcomeEmailTemplate.welcomeEmailTemplate;
      // CHECK TEMPLATE is Onedinaar
      if(html.indexOf('Onedinaar') >-1){
            html = html.replace("{{username}}", iser.username );
            html = html.replace("{{{unsubscribe}}}", "https://onedinaar.com");
            html = html.replace("{{{unsubscribe_preferences}}}", "https://onedinaar.com");
            html = html.replace("{{resetUrl}}", "https://onedinaar.com/?invite=virtual-account");

      }
      /*.replace(
    'href=""',
    `href="${actionUrl}"`
  ); */

      /* let reqBody2 = { 
                                    username: user,
                                    email:user_email,
                                    password: welText
                                              
                                }*/
   let  msg = {
    to: iser.email,
    from: 'sales-man@storenotify.in', // Use your verified sender
    //templateId: templateIDLocal, // Your SendGrid dynamic template ID
     subject:`Welcome Onboard ${iser.username}`,
    html: html,
 // text: 'Good to see you !!',
    dynamicTemplateData: {
            name: iser.username,
            city: 'NA',
            subject: `Welcome Onboard ${iser.username}`, // Can be used to set the subject dynamically
          }, // Data for Handlebars variables in the template
  };
   console.log("send mail object:  "+JSON.stringify(msg ))
   let   msg2 = {
    to: iser.email,
    from: 'sales-man@storenotify.in', // Use your verified sender
  subject:`Welcome Onboard ${iser.username}`,
  text: 'Good to see you !!',
  html: '<strong>and easy to do anywhere, even with Store Notify </strong>',
}; 
  console.log("send mail object revised :  "+JSON.stringify(msg2 ))
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
            console.log('Templated email sent successfully!');
        })
        .catch((error) => {
          console.error('Error sending email: '+ JSON.stringify(error));
           if (error.response) {
            console.error(error.response.body);
          }
        })
}

// Function to send the email
function sendHtmlEmail( mailTransporter,  recipientEmail, username, resetUrl) {
    // 1. Read the HTML template file
    mailOptionsGlobal.recipientEmail = recipientEmail ;
    mailOptionsGlobal.username = username;
    mailOptionsGlobal.resetUrl = resetUrl;
     let th = '';
    if(mailOptionsGlobal.html !== ''){  
      // console.log('Email HTML Template being drafted   : '+ JSON.stringify(mailOptionsGlobal.html));
       console.log('Email HTML Template being drafted  NOT empty : ');
    }
     else {
    //   console.log('Email HTML Template not READ .. at initiation : '+ JSON.stringify(mailOptionsGlobal.html));
       console.log('Email HTML Template not READ .. at initiation : EMPTY ' );
      th = JSON.stringify(store.get('welcomeEmailTemplate'));
       // console.log('controller.js store.get(welcomeEmailTemplate) : '+  th);
        console.log('controller.js store.get(welcomeEmailTemplate) : ' );

    }
    if(th !==null && th !== undefined && th !=='') {   
     //let htmlToSend = Object.assign({},th) ;//.replace('{{username}}', username);
     let htmlToSend = String(th);
                  let welText =   welcomeOptions.mailOptions .html
           welText = welText.replace("(StoreUser)",username);
      //      console.log("check html template included or not "+welText);
          // let   th = JSON.stringify(store.get('welcomeEmailTemplate'));
           //  let  strTH =welText.replace("(StoreUser)",username);

           let  strTH  = welText.replace("\r\n", "");
            const mailOptionsSupport = {
              ...CONSTANTS.mailoptions,
              html: strTH,
              headers: {
                  'Content-Type': 'text/html; charset=UTF-8'
                },
                 from:'sales-man@storenotify.in',
                  to: recipientEmail, 
            };
      //  console.log('HTML WELCOME TEXT :htmlToSend  '+  htmlToSend );
      //  console.log('HTML WELCOME TEXT :  JSON.stringify(htmlToSend) '+ JSON.stringify(htmlToSend));
     htmlToSendGlobal = htmlToSend.replace('{{username}}', username);
     htmlToSendGlobal =  htmlToSendGlobal.replace('{{resetUrl}}', resetUrl);//.replace('{{resetUrl}}', resetUrl);
         const mailOptions = {
            from:'sales-man@storenotify.in', //'"Store Notify " <YOUR_EMAIL@gmail.com>',
            to: recipientEmail,
            subject: 'Welcome to our application!',
            html: htmlToSendGlobal// The final HTML content
        };
    //console.log('Sending   : '+ JSON.stringify(mailOptions.html));
    if (mailTransporter !== null && mailTransporter !==undefined ) {  
        console.log(' COMMENTED  Mail Transporter  sendMail for duplicate StoreNotify Welcome Email ' );
        console.log(' COMMENTED  Mail Transporter  sendMail for duplicate StoreNotify Welcome Email ' );
        console.log(' COMMENTED  Mail Transporter  sendMail for duplicate StoreNotify Welcome Email ' );
        console.log(' COMMENTED  Mail Transporter  sendMail for duplicate StoreNotify Welcome Email ' );
        console.log(' COMMENTED  Mail Transporter  sendMail for duplicate StoreNotify Welcome Email ' );
        console.log(' COMMENTED  Mail Transporter  sendMail for duplicate StoreNotify Welcome Email ' );
    /*
       mailTransporter.verify((err, success) => {

            if (err) {
              console.log("SMTP VERIFY ERROR", err);

            } else {
              console.log("SMTP READY");
            }
          });


        mailTransporter.sendMail(mailOptionsSupport, function(error, info) {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        */
       }
       else { 
        console.log(' Mail Transporter not initialized ' );
       }
    }
    else {
       console.log('controller.js  store.get(welcomeEmailTemplate) .. not SET : ' );
    //   let th = store.get('welcomeEmailTemplate');
       // console.log('controller.js store.get(welcomeEmailTemplate) : '+ JSON.stringify(th));
    }
}


async function writeEmailFromInput(req, res) { 
  let   user_email = req.body.email;
  let   user_email_params = req.params.email;
  let store_name =  req.body.store_name;  // req.params.store_name;  undefined
  let store_link =  req.body.store_link;  //    req.params.store_link;

  console.log("req.body ", JSON.stringify(req.body))
  console.log("user_email ", user_email)
  console.log("user_email_params ", user_email_params)
  console.log("store_name ", store_name)
  console.log("store_link ", store_link)
  setCORSHeaders( res )
   if( user_email!==undefined && user_email !==null &&  user_email!=='null')
   { 
      try {
           var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com', 
            auth:  {    // https://myaccount.google.com/apppasswords
                user: 'fairvinay@gmail.com',
                pass: process.env.GAPPPASSONE
              }
          })); 
         CONSTANTS.mailinviteoptions.to=user_email//'admin-sales@storenotify.in'
         let user = user_email;
         if(user_email.indexOf("@") > -1){
          user = user_email.substring(0, user_email.indexOf("@"));
         }
         let welText =   welcomeInviteOptions.mailOptions .text
         welText = welText.replaceAll("(StoreUser)",user);
         welText = welText.replaceAll("(store_name)",store_name);
         welText = welText.replaceAll("(store_link)",store_link);

          const mailinviteoptions = {
            ...CONSTANTS.mailinviteoptions,
            text: welText,
          };
          let delivered  =  false; let noResponseDelivered = true;
           const result = await transporter.sendMail(mailinviteoptions) .then((r)=> {
                 console.log( "Email Verification in process ... ") 
                 console.log( " ... ", JSON.stringify(r)) 
                 let response =  r.response ;
                 if(response !==null && response !==undefined){
                    // SPLIT get the 3 rd element which is supposed to be MESSAGEID
                    let parseDRes = response.split(" ")
                    if(Array.isArray(parseDRes)){
                        // 
                        console.log("Parsed  "+JSON.stringify(parseDRes))
                        if(parseDRes[4] !==null && parseDRes[4]!==undefined){
                          sentVerifyMessageId={  messageIdgmail : r.messageId , messageId: parseDRes[4] };
                          snetMessageEnvelope=r.envelope;
                          console.log( "Message  ", JSON.stringify(sentVerifyMessageId))
                          console.log( "Envelope  ", JSON.stringify(snetMessageEnvelope))
                        // START VERIFICATION HERER 
                        nDeliveryDateUS = new Date().toISOString() //new Date().toLocaleString('en-US'  );
                        nDeliveryDate = new Date().toLocaleString('en-US', {
                         timeZone: 'Asia/Calcutta'
                          });
                       // console.log("gmail result  ",result); 
                         console.log("US Date  ",nDeliveryDateUS);
                         console.log("LOCAL Date  ",nDeliveryDate);
                         isMailSendToValid=true;
                      
                       // LIST the MESSAGES SENT IMAP EXTENSION "LIST (\HasNoChildren \Sent) "/" "[Gmail]/Sent Mail" 
                     //   listMessages(oAuth2Client, 'label:sent subject:reminder' );
                        (async function () { 

                            await checkSentMessageId(req, res ,  r.messageId ,snetMessageEnvelope.to[0] )
                            .then(( r)=> {
                              console.log(" checkSentMessageId succesfukkt send message ",JSON.stringify (r))
                              isDelivered.delivered = true
                              res.send(isDelivered);

                            }, (error) => {
                               
                               console.log(" checkSentMessageId  error  ",JSON.stringify (error))
                               isDelivered.delivered = false;
                               res.send(isDelivered);
                            }
                          
                            )
                         /*

                          delivered  =  await  verifyEmailDelivery(req , res );
                             
                         console.log( ' type  delivered '+ JSON.stringify(typeof delivered) )
                         console.log( ' delivered '+ delivered )
                             res.send(delivered);
                            */
                         })()
                     

                        }
                    }
                  }
            }); 
           //     
           if (  noResponseDelivered && !isMailSendToValid){
            res.send(delivered);
           }
         
         // res.send(sentVerifyMessageId);
        } catch (error) {
          console.log(error);
           console.log(" error  ", error)
         
           res.send(error);
        }
      }
      else   {
        let error = " BAD request || SEND --> {'email' :'valid  email'}"
         console.log("BAD request {'email' :'valid  email'}  ", error)
         res.send(error);  
      }
}

//curl http://localhost:8000/api/mail/send
async function sendMail(req, res) {
  try {
  //  const accessToken = await oAuth2Client.getAccessToken();
    setCORSHeaders( res )
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'fairvinay@gmail.com',
        pass: process.env.GMAILPWD
      }
    }));
    
    const transport = nodemailer.createTransport({
      service: "gmail",
      /*auth: {
        ...CONSTANTS.auth,
        accessToken: accessToken,
      },*/
      auth: {
        type: 'OAuth2',
        user: 'fairvinay@gmail.com',
        //fairvinay
        serviceClient:process.env.GMAILSERVICECLIENT,
        //"39613  5579027-b4gvu1u72l9 lhhvov29eil d52emov1ak.apps.googleusercontent.com"
        privateKey: rt.privateKey,
        //vvanvekar
        //serviceClient: '396732087280-6b7n6c9u4egr6vqdhaed5i43drjn9klq.apps.googleusercontent.com',
        /*privateKey: rt.privateKey,
        accessToken: "ya29.a0ARW5m75UEyMWm9OPlVzj-Igsjn_242gcQ1B-iqDlfwGwX2LMD0gkwDSEQKB_mhw3uFAgXjUXVGdKofCBQToLiShViqKw-vSaGMZrlNlwT1LBGl_C6eMDB2Algv4QCbLAmpEOYLNdmI6RQ9eu23y7pv7oyBHVUKwhtvPqDeFaaCgYKAfISARMSFQHGX2MiE6QJtaSSO9SZP-W5CxQv6A0175",
        */
        // vvanvekar
        //clientSecret: "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",
        //refreshToken: "1//04mIe3u9LGWBKCgYIARAAGAQSNwF-L9IryeQg2CjkmRwnpmbJKoyNoR_9K7hOpzFdN80019XynRIBQ2VxozuN22XRo--HwWNIi3c",
        accessToken: process.env.GACCESSTOKEN, 

 
         expires: 1484314697598
      }
    });
    
    const mailOptions = {
      ...CONSTANTS.mailoptions,
      text: "The Gmail API with NodeJS works",
    };

    const result = await transporter.sendMail(mailOptions).then( (ar  ) => {
         console.log( "Sending mail started .....")
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
//curl http://localhost:8000/api/mail/user/fairvinay@gmail.com
async function getUser(req, res) {
  try {
    setCORSHeaders( res )
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
//curl http://localhost:8000/api/mail/drafts/fairvinay@gmail.com
async function getDrafts(req, res) {
  try {
    setCORSHeaders( res )
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    return error;
  }
}
// curl  http://localhost:8000/api/mail/read/192d9bbdbeb8e3eb
async function readMail(req, res) {
 try {
  setCORSHeaders( res )
    const url = `https://gmail.googleapis.com/gmail/v1/users/fairvinay@gmail.com/messages/${req.params.messageId}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);

    let data = await response.data;

    res.json(data);
  } catch (error) {
    res.send(error);
  }
}

module.exports =   {
  getUser,
  sendMail,
  getDrafts,
  readMail,
  writeEmail,
  writeEmailFromInput
};
