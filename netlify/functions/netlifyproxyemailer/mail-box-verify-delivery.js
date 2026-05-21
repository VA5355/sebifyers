const Imap = require('imap')
const store  = require( "store2");

//inspect = require('util').inspect;
const {simpleParser} = require('mailparser');
 
const myMail = "admin-sales@storenotify.in"/*fairvinay@gmail.com*/;
const myPwd ='nvac dkkd eqjn nesk'
const config = {
    user: myMail,
    password: myPwd,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false
    },
    authTimeout: 30000
  }
let imap2 = new Imap(config)
let messageId = '017f8fd9-7269-c83e-b4ec-3567569d1d97@gmail.com'
async function getMailReader(msgId,isDelivered,  callback   ,req ,res  ) {
try {
  console.log("getMailReader:: ", JSON.stringify(arguments.length))
    let isMailSendToValid = false; 
    let jsonFailed = JSON.stringify({delivered: false});
    let messageId=msgId ; let callbackResult= null;
     let invoke = false;
    if(callback!==undefined && callback !== null){
        //callbackResult = callback(arguments[4], arguments[5]);
        callbackResult=callback
       // console.log( "callback typeof PRomise ", (typeof callback === Promise))
       // console.log( "callback typeof Function ", (typeof callback === 'function'))

       // console.log( "callback typeof Object ", (typeof callback === 'object'))
      //  console.log("calback   ",JSON.stringify(callback))
        // WHEN REQUEST RESPONSE dont do JSON STRINIGY this causes circular call reference 
        console.log("calback paramters   ",JSON.stringify(arguments.length))
     //   console.log("calback request   "+(JSON.stringify(typeof req ) ) + " response  "+(JSON.stringify(typeof res ) ))
        if (typeof(res.send) === "function") {
          console.log(" repsonse contains send function IT IS HTTP RESPONSE OBJECT ONLY     ")
          invoke = true;
         }
       // console.log("calback request   "+(JSON.stringify(typeof req ===Http2ServerRequest ) ) + " response  "+(JSON.stringify(typeof res ===Http2ServerResponse ) ))
        //console.log("calback paramters  2 ", JSON.stringify(arguments))
    }else {
      console.log("calback empty ", JSON.stringify(callback))
    }
  const imap = new Imap(config);//imapConfig
  if( imap === null || imap === undefined) { 
    console.log("could not initilisit IMAP  " )
        return {}
    }
  imap.once('ready', async () => {
    console.log(" Imap is ready .. ")

     imap.openBox('INBOX', true, async () => {   //['UNSEEN', ['X-GM-RAW', 'has:unread'],
        console.log("INBOX opened ")
        var searchCriteria = [['HEADER','IN-REPLY-TO',messageId]];
       imap.search(['UNSEEN',                   //'aevev@gmail.com' ['SINCE', new Date()]
                ['HEADER','IN-REPLY-TO',messageId],
          ['FROM', 'mailer-daemon@googlemail.com'], ['TO', 'fairvinay@gmail.com']
          ],  (err, results) => {
            console.log("Search for Failed message started ",messageId)
            console.log( " ")
            //console.log(" results ", JSON.stringify(results))
         try {  
          const f =   imap.fetch(results, {bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE SINCE)',
            from:'mailer-daemon@googlemail.com',
            struct: true,envelope:true
          });
          let mesgResult = '';
          f.on('message',   (msg, seqno) => {
          //  console.log("message  ",msg) 
           // console.log('Message #%d', seqno);
            let prefix="% "+seqno;
             
          msg.on('body', stream => {
              simpleParser(stream, async (err, parsed) => {
                 const {from, subject, textAsHtml, text} = parsed;

                // console.log("subject " + subject)
                 // Mail Delivery Subsystem will not work as in CONSTANTS. in quistart.js 
                 // there is the   dsn: {
                 // id: 'Registeration Failed for',  enrty so the subject changed to Delivery Status Notification (Failure)
                if( subject.indexOf("Delivery Status Notification (Failure)") > -1){ 
                 // console.log(JSON.parsed(parsed));
                  console.log(" Verification failed ")
                  isMailSendToValid = false;
                  isDelivered.delivered = false;
                  store.set('isDelivered', isDelivered);
                  if(callbackResult !== null && callbackResult  === 'function'){
                    callbackResult(arguments[4], arguments[5]);
                 }else if(invoke) { 
                   // res.send(isDelivered)
                   return  jsonFailed
                 }
                  mesgResult =  Promise.resolve(false) 
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
              ///  console.log('Marked as read!');
              });
            }); 
          });
          f.once('error', ex => {
            console.log("fetch error  ")
            if(callbackResult !== null && callbackResult  === 'function'){
              callbackResult.apply(arguments[4], arguments[5]);
            }else if(invoke) { 
             // res.send(jsonFailed)
             return  jsonFailed
           }
            mesgResult =  Promise.reject(ex);
          });
          f.once('end', () => {
            console.log('Done fetching all messages!');
            imap.end();
          });
            return mesgResult;
         }
         catch ( err){
            console.log("Fetch verified no reply to messageId "+messageId)
            console.log("Fetch considers valid delivery to  "+messageId)
            isDelivered.delivered = true;
            store.set('isDelivered', isDelivered);
            if(callbackResult !== null && callbackResult  === 'function'){
              callbackResult.apply(arguments[4], arguments[5]);
             }else if(invoke) { 
             // res.send(isDelivered)
             return  isDelivered
             }
            
         }
        });//.then( re=> re);
      });//.then(res => res);
    });//.then(rest => rest);

     imap.once('error', err => {
      console.log(" error " , err);
      if(callbackResult !== null && callbackResult  === 'function'){
        callbackResult.apply(arguments[4], arguments[5]);
     }else if(invoke) { 
          // res.send(jsonFailed)
          return  jsonFailed
     }
      return // Promise.reject(err);
    });//.then(rest1 => rest1);

   imap.once('end', () => {
      console.log('Connection ended');
     // let valid =  isMailSendToValid ? 'verified' : 'unverifed'
      //console.log(`Email is ${valid} `)
      const nDate = new Date().toLocaleString('en-US', {
           timeZone: 'Asia/Calcutta'
         });
         return    //Promise.resolve(0)
    });//.then(rest2 => rest2);
    
    imap.connect();
  } catch (ex) {
    console.log('an error occurred ', JSON.stringify(ex));
    if(callbackResult !== null && callbackResult  === 'function'){
      callbackResult.apply(arguments[4], arguments[5]);
     }else if(invoke) { 
     // res.send(jsonFailed)
     return  jsonFailed
    }
    return  //Promise.reject(ex);
  }

}
/*getMailReader().then(() => {

    console.log(" Reaiding emails ....")
})*/

export default {
    getMailReader 
};