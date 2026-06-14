const store  = require( "store2"); 
import { BASEREF } from '@/libs/client';
// 
  const welcomeEmailTemplate  = require("./welcomeonedinaarsendgrid");
  const strWelcome = welcomeEmailTemplate.welcomeEmailTemplate;
/**  THIS NEEDS to the INITIALISED AT GLOBAL LEVEL  I.E. AT the controller LEVEL or netlifyproxyemailer function and placed in store2  */
 // const store  = require( "store2");
 //        store.set('welcomeEmailTemplate', strWelcome);
// Create a JSDOM instance from the HTML string
 
function  getInjected (iser)  { 
   
  let html  = strWelcome;
     // CHECK TEMPLATE is Onedinaar
      if(html.indexOf('Onedinaar') >-1){
            html = html.replace("{{username}}", iser.username );
            html = html.replace("{{virtualId}}", iser.virtualId );
            html = html.replace("{{{unsubscribe}}}", BASEREF); //"https://onedinaar.com"
            html = html.replace("{{{unsubscribe_preferences}}}", BASEREF); // "https://onedinaar.com"
            html = html.replace("{{resetUrl}}", `${BASEREF}/?invite=virtual-account`); //"https://onedinaar.com/?invite=virtual-account"

      }

    return html
}
// Access the document object
//const document = dom.window.document;

// Now you can use standard DOM methods to work with the HTML
//const h1Element = document.querySelector(".wrapper");
//console.log(h1Element.textContent); // Output: Hello World!

//const contentDiv = document.getElementById(".wrapper")
/**  THIS NEEDS to the INITIALISED AT GLOBAL LEVEL  */
 const mailOptions = { 
    
    html: "Welcome (StoreUser),  \n \n"+

 
    strWelcome+

    "Regards \n"+
    "StoreNotify  \n"+
    "admin-sales@storenotify.in \n"

}

module.exports = {
    mailOptions ,
    getInjected
};
