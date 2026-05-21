const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const { JSONClient } = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const store  = require( "store2");
const axios = require("axios");
const { generateConfig } = require("./utils");
const nodemailer = require("nodemailer");
 const smtpTransport  = require('nodemailer-smtp-transport');
const CONSTANTS = require("./constants");
const Imap = require('imap');
const { ImapFlow } = require("imapflow");
const {simpleParser} = require('mailparser');
const rt = require("./provate");
const mailboxemails = require("./mail-box-emails")
const { response } = require('express');
const { isStringObject } = require('util/types');
const { Worker } = require("worker_threads");
const  supportMailOptions =require('./mailworker/AppreciateSupportTemplate.js')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly',
             'https://www.googleapis.com/auth/userinfo.email',
              'https://mail.google.com/'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
let   ouathClient  = {} 
let nDeliveryDate = '' 
let nDeliveryDateUS =  '';
let pingGmailTimeOutInterval = ''
let readGmailTimeOutInterval = ''
var  stopVerificationCallback = null;
var processing = false;
const imapConfig = {
    user: 'fairvinay@gmail.com',
    password: 'nvac dkkd eqjn nesk',
   // host: 'smtp.gmail.com',
   // port: 465,
   authTimeout:300000, // increased to 5 mins
   host: 'imap.gmail.com',
   port: 993,
    tls: false,
  };
  const client = new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: {
      user:'fairvinay@gmail.com',
      pass:  'nvac dkkd eqjn nesk', //'River5idelift@' , //'nvac dkkd eqjn nesk',
    },
    logger: false, // set to true if you want to see IMAP transaction logs
  });
  let isMailSendToValid= false;
  let awaitForConnection = 0;
  sentVerifyMessageId=undefined;
  snetMessageEnvelope=undefined
console.log("credentials path  " + CREDENTIALS_PATH )
console.log("TOKEN_PATH path  " + TOKEN_PATH)
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
    
  if(client !==undefined && client !== null){
         console.log("  " , JSON.stringify( client.client_id) );
     }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
   ouathClient =   new google.auth.OAuth2(
        client.client_id ,
        client.client_secret,
       client.re
    );
    await saveCredentials(client);
  }
  return client;
}


/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  const res = await gmail.users.labels.list({
    userId: 'me',
  });
 
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log('No labels found.');
    return;
  }
  console.log('Labels:');
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
 await writeEmail();
 const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});

console.log(nDate);
  console.log('Read email to start ... ');
  setTimeout( () => {
    try {
    const task_script = path.join(__dirname, "./mailworker/readworker.js")
    const obj =  sentVerifyMessageId!==undefined ? sentVerifyMessageId : {messageIdgmail:"data" , messageId :""}
    console.log(' WORKER DATA ', JSON.stringify(obj));
    try { 
        const worker = new Worker(task_script, {
                      workerData: JSON.stringify(obj)
                    })
        worker.on("message", (data) => {
         console.log(`result is ${data}`);
        });
        worker.on("error", (msg) => {
          console.log(`An error occurred: ${msg}`);
        });
    } 
    catch(eree){ 
      console.log(' WORKER CONSTRUCTION FAILED ', JSON.stringify(obj));
    }  
   }catch(ers){
     console.log(' WORKER INITIALISATION ERROR ', JSON.stringify(ers));
   }
    // readEmail();
  }, 10000)
}

const getEmails =  async (basicConig) => {  //https://dev.to/akinmyde/reading-email-data-with-node-js-bjf
    try {
      isMailSendToValid = false;
      const imap = new Imap(basicConig);//imapConfig
    await   imap.once('ready', async () => {
      console.log(" Imap is ready .. ")
      await  imap.openBox('INBOX', true, async () => {   //['UNSEEN', ['X-GM-RAW', 'has:unread'],
          console.log("INBOX opened ")
      await    imap.search(['UNSEEN',                   //'aevev@gmail.com' ['SINCE', new Date()]
            ['FROM', 'mailer-daemon@googlemail.com'], ['TO', 'fairvinay@gmail.com']
            ], (err, results) => {
              console.log("Search for Failed message started ")
            const f = imap.fetch(results, {bodies: ''});
            f.on('message', msg => {
                  
                console.log(" Verification failed ")
                isMailSendToValid = false;
             /*  msg.on('body', stream => {
                simpleParser(stream, async (err, parsed) => {
                   const {from, subject, textAsHtml, text} = parsed;

                 
                  if( subject.indexOf("Mail Delivery Subsystem") > -1){
                    console.log(parsed);
                  }
                  else { 
                    console.log(" " + JSON.stringify(from));
                  }
                  // Make API call to save the data
                 //    Save the retrieved data into a database.
                 //    E.t.c
              
                });
              });
              msg.once('attributes', attrs => {
                const {uid} = attrs;
                imap.addFlags(uid, ['\\Seen'], () => {
                  // Mark the email as read after reading it
                  console.log('Marked as read!');
                });
              });*/
            });
            f.once('error', ex => {
              console.log("fetch error  ")
              return Promise.reject(ex);
            });
            f.once('end', () => {
              console.log('Done fetching all messages!');
              imap.end();
            });
          });
        });
      });
  
      imap.once('error', err => {
        console.log(" error " , err);
      });
  
      imap.once('end', () => {
       // console.log('Connection ended');
        let valid =  isMailSendToValid ? 'verified' : 'unverifed'
        console.log(`Email is ${valid} `)
        const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });
      });
  
      imap.connect();
    } catch (ex) {
      console.log('an error occurred');
    }
  };
  async function main() {
    // establish the connection and log in
    try {
      await client.connect();
      console.log('yay authenticated')
    } catch (err) {
      // connection failed for whatever reason
      console.log('connection failed');
      throw err;
    }
  
    // open INBOX folder
    let mailbox = await client.mailboxOpen("INBOX");
    const nDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Calcutta'
    });
    // list all unseen messages
    try { 
      let {meta, content} = await client.download(sentVerifyMessageId.messageId, '1.2')
                    .catch(err => async function () { 

                      let lastMsg = await client.fetchOne('*', {uid: true}).catch(ferr => {
                           console.log("could not fetch : ",JSON.stringify(ferr));
                          })
                       console.log('fetched '  , lastMsg.uid);
                

                    });
      content.pipe(fs.createWriteStream(meta.filename));
    } 
    catch( e){
      console.log("Either Download or Fetch could not retrieve " ,JSON.stringify(e));
      try{  
     /* let lastMsg = await client.fetch(  {
        // search query to filter messages
        // https://imapflow.com/global.html#SearchObject
        from : 'mailer-daemon@googlemail.com', subject:'Delivery Status Notification (Failure)',
        since :  nDeliveryDate,
        seen: false
      } , {uid: true}).catch(ferr => {
        console.log("could not fetch : ",JSON.stringify(ferr));
       })
       console.log('fetched '  , lastMsg.uid);*/ // subject:'Delivery Status Notification (Failure)',  nDeliveryDateUS
        //https://imapflow.com/module-imapflow-ImapFlow.html
      //https://imapflow.com/global.html#FetchQueryObject
      //https://imapflow.com/global.html#FetchQueryObject   
      //https://imap-mailbox.js.org/docs/documentation/parsed-mail
      //https://www.tempmail.us.com/en/sharepoint/resolving-power-automate-s-vcf-attachment-handling-issue-with-sharepoint-online
      //https://stackoverflow.com/questions/62404008/how-can-i-receive-incoming-mailsgmail-to-my-application-server-using-imap-nod
       for await (let msg of client.fetch ({from : 'mailer-daemon@googlemail.com',since : nDate,
               seen: false},
                 {uid: true,flags: true, internalDate: true ,envelope :true }
            )) {
                  let { seq, uid, flags, internalDate ,envelope  } = msg;
                 console.log("envelope ", JSON.stringify(envelope))
                 console.log("In REply To ", JSON.stringify(envelope.inReplyTo))
                 console.log(" messageId ", JSON.stringify(envelope.messageId))
                 let replTo =    JSON.stringify(envelope.inReplyTo)   ;
                  replTo  =  replTo. replace("<",'').replace(">",'').replace("\"",'').replace("\"",'')   
                 console.log("replTo ", replTo)
                 console.log("messageIdgmail ", sentVerifyMessageId.messageIdgmail)
                 if(replTo.equals(sentVerifyMessageId.messageIdgmail)){
                  isMailSendToValid = false;
                 }
                 if(replTo == sentVerifyMessageId.messageIdgmail){
                  isMailSendToValid = false;
                 }  
                
                 console.log(`#${seq} Attributes:`, { seq, uid, flags,  internalDate });
           }
       }catch(err){
        for await (let msg of client.fetch(
          {
            // search query to filter messages
            // https://imapflow.com/global.html#SearchObject
            from : 'mailer-daemon@googlemail.com',
            since :  nDeliveryDate,
            seen: false
          },
          {
            // attributes to request for
            // https://imapflow.com/global.html#FetchQueryObject
            uid: true,
            flags: true,
            internalDate: true
          }
        )) {
          // extract variables
          let { seq, uid, flags, internalDate   } = msg;
          // if ( subject.indexOf('Gmail API NodeJS')> -1){ 
           //   console.log('verfication ' , subject);
           //   console.log('from ' , from);
           // } 
           console.log("from "+from)
          isMailSendToValid = false;
         
          console.log(`#${seq} Attributes:`, { seq, uid, flags, internalDate });
        }
      }




    }
   /* for await (let msg of client.fetchOne(
      {
        // search query to filter messages
        // https://imapflow.com/global.html#SearchObject
        from : 'mailer-daemon@googlemail.com',
        after :  nDeliveryDate,
        seen: false
      },
      {
        // attributes to request for
        // https://imapflow.com/global.html#FetchQueryObject
        uid: true,
        flags: true,
        internalDate: true
      }
    )) {
      // extract variables
      let { seq, uid, flags, internalDate ,subject , from } = msg;
      // if ( subject.indexOf('Gmail API NodeJS')> -1){ 
       //   console.log('verfication ' , subject);
       //   console.log('from ' , from);
       // } 
       console.log("from "+from)
      isMailSendToValid = false;
     
      console.log(`#${seq} Attributes:`, { seq, uid, flags, from  ,subject, internalDate });
    }
    */
    // close the connection
    if(client !==null && client!== undefined && !client.isClosed)
        await client.logout();
  }
async function writeEmail() { 
    if (ouathClient){
        console.log("google.auth.Oauth2Client created ")
        try {
               var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com', 
                auth:  {    // https://myaccount.google.com/apppasswords
                    user: 'fairvinay@gmail.com',
                    pass: 'nvac dkkd eqjn nesk'
                  }
              })); 
             
              CONSTANTS.mailoptions.to= 'eiuaeuiauerff@gmail.com' //'admin-sales@storenotify.in'  // 'admin-sales@storenotify.in'
              console.log("supportMailOptions.text "+ supportMailOptions.text)
              console.log("supportMailOptions  "+ JSON.stringify(supportMailOptions))
              console.log("supportMailOptions  "+  supportMailOptions.mailOptions.text)
              //process.exit(0)
              let txt = supportMailOptions.mailOptions.text !==undefined ?  supportMailOptions.mailOptions.text: "Hello Team,  \n \n"+

                        "Appreciate the support from Yash \n"+
                        "dns4.p02.nsone.net, dns1.p02.nsone.net, dns2.p02.nsone.net, dns3.p02.nsone.net \n "+
                        "Domain servers have been updated with the \n"+
                        " TXT , MX Records \n"+
                        "We would be grateful , the free service is extended further \n "+
                        "We request your assistance is building our https://storenotify.in under construction \n\n"+ 
                        "Regards \n"+
                        "StoreNotify  \n"+
                        "admin-sales@storenotify.in \n"

              const mailOptions = {
                ...CONSTANTS.mailoptions,
                text:  txt,
              };
              console.log("mail text ", mailOptions.text)
             /*
              Email Verification in process ...
            ...  {"accepted":["aevev@gmail.com"],"rejected":[],"response":"250 2.0.0 OK  1736295499 d9443c01a7336-219dc9cdec1sm316090235ad.136 - gsmtp",
                 "envelope":{"from":"admin-sales@storenotify.in","to":["aevev@gmail.com"]},
                 "messageId":"54ac58b1-8e18-e61a-94d4-3954247bc1d0@gmail.com"}
             */
              /*
                  SEND MAIL CALLBACK not WORKS 
                  
                  ,() => {
                    let sendreply   =arguments;
                    if(sendreply !==null && sendreply !== undefined){
                      console.log(" ", JSON.stringify(sendreply))
                    }

              }
              */
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
                            }
                           
                        }
                     
                     }
                     

              }); 
                nDeliveryDateUS = new Date().toISOString() //new Date().toLocaleString('en-US'  );
               nDeliveryDate = new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Calcutta'
              });
              console.log("gmail result  ",result); 
              console.log("US Date  ",nDeliveryDateUS);
              console.log("LOCAL Date  ",nDeliveryDate);
              isMailSendToValid=true;
            } catch (error) {
              console.log(error);
               console.log(" error  ", error)
            }
    }
}


async function getSent(searchCriteria , callBack ) { // searchCriteria: string[], callBack: any
  const imap = new Imap(basicConig);//imapConfig
  imap.connect(this.imapConfig).then(function (connection) {

      /*
        Replace connection.openBox('SENT') with
         connection.openBox('INBOX.Sent') OR connection.openBox('INBOX/Sent').   
         '[Gmail]/Sent Mail'
      */

      return connection.openBox('INBOX.Sent').then(function () {
          var fetchOptions = {
              bodies: ['HEADER', 'TEXT', ''],
              markSeen: false
          };

          return connection.search(searchCriteria, fetchOptions).then(function (results) {

              let mails = results.map(res => {
                  return {
                      part: res.parts.find(part => part.which === ''),
                      attributes: res.attributes
                  };
              });

              mails = [].concat(...mails);

              mails = mails.map(mail => {
                  return new Promise((resolve, reject) => {

                      var id = mail.attributes.uid;
                      var idHeader = "Imap-Id: " + id + "\r\n";

                      simpleParser(idHeader + mail.part.body, (error, mail) => {
                          if (error)
                              reject(error);
                          else {
                              resolve(new Email({
                                  sentDate: mail.date,
                                  from: mail.from.text,
                                  to: mail.to.text,
                                  messageId: mail.messageId,
                                  body: mail.html,
                                  subject: mail.subject
                              }));
                          }
                      });
                  })
              });

              Promise.all(mails).then(response => {
                  callBack({
                      success: true,
                      emails: response,
                      error: undefined
                  });
              }, error => {
                  callBack({
                      success: false,
                      emails: [],
                      error: error
                  });
              });

          }, function (error) {
              callBack({
                  success: false,
                  emails: [],
                  error: error
              });
          });
      }, function (error) {
          callBack({
              success: false,
              emails: [],
              error: error
          });
      });
  }, function (error) {
      callBack({
          success: false,
          emails: [],
          error: error
      });
  });
}


authorize().then(listLabels).catch(console.error);
