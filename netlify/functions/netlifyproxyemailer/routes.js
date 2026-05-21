const express = require('express');

 

const controllers=require('./controllers') 
/*const router1 = function (params) {  if(params!==undefined) { let app =  express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    ; return express.Router()  }else  {  return express.Router() } } ;
    let app =  express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); */
 const router  = express.Router()
router.get('/mail/user/:email',controllers.getUser)
router.get('/mail/send',controllers.sendMail);
router.get('/mail/drafts/:email', controllers.getDrafts);
router.get('/mail/read/:messageId', controllers.readMail);
router.post('/mail/write/', controllers.writeEmail);
router.post('/mail/write/compose', controllers.writeEmailFromInput);
module.exports = router;