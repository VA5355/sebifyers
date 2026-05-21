const Imap = require('imap');

//inspect = require('util').inspect;

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
let mailServer1 = new Imap(config)

mailServer1.once('error', function (err) {
    console.log('Source Server Error:- ', err);
  });
const messageId = '017f8fd9-7269-c83e-b4ec-3567569d1d97@gmail.com'
const getInbox = () => {
    return new Promise((resolve, reject) => {
        let i = 0 ;
        while( i < 1) { 
        if ( mailServer1 !=undefined && mailServer1 !==null){
        mailServer1.connect(config);
        Promise.resolve(45).then(function (connection) {
            return mailServer1.openBox('INBOX').then(function () {
                var searchCriteria = [['HEADER','IN-REPLY-TO',messageId]];
                var fetchOptions = {
                    bodies: ['HEADER', 'TEXT', ''],
                };
                return mailServer1.search(searchCriteria, fetchOptions).then(async function (messages) {
                    let promises = messages.map(item=>{
                        return new Promise((resolve,reject)=>{
                            var all = _.find(item.parts, { "which": "" })
                            var id = item.attributes.uid;
                            var idHeader = "Imap-Id: " + id + "\r\n";
                            simpleParser(idHeader + all.body, (err, mail) => {
                                resolve(mail);
                            });
                        });
                    });
                    Promise.all(promises).then(data=>{
                        let d = data.filter(obj=>obj.me).map(obj=>{
                            return {
                                from:obj.from.value.map(obj=>obj.address).join(','),
                                to:obj.to.value.map(obj=>obj.address).join(','),
                                subject:obj.subject,
                                attachments:obj.attachments,
                                message_id:obj.messageId,
                                date:obj.date

                            }
                        });
                        resolve(d);
                    })
                });
            });
        });
       }
       else {
        mailServer1 = new Imap(config)
       }
       i++;
       }
    }); }

    mailServer1.once('ready', function () {
        mailServer1.openBox('INBOX', true, function (err, box) {
          if (err) throw err;
          console.log('message', 'server1 ready');
        });
      
        // mail operation
        //getMailBoxLabels(mailServer1);
       // getInbox(mailServer1)
        //createLabel(mailServer1, "demo-label1");
        //deleteLabel(mailServer1, "demo-label1");
        //getMailboxStatusByName(mailServer1, "INBOX");
      })
      
      getInbox().then(rt => {
        console.log(" Starting Imap .... ")

      })