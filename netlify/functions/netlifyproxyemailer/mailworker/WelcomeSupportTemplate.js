const store  = require( "store2"); 
// 
  const welcomeEmailTemplate  = require("./welcomesendgrid");
  const strWelcome = welcomeEmailTemplate.welcomeEmailTemplate;
/**  THIS NEEDS to the INITIALISED AT GLOBAL LEVEL  I.E. AT the controller LEVEL or netlifyproxyemailer function and placed in store2  */
 // const store  = require( "store2");
 //        store.set('welcomeEmailTemplate', strWelcome);
// Create a JSDOM instance from the HTML string
 

// Access the document object
//const document = dom.window.document;

// Now you can use standard DOM methods to work with the HTML
//const h1Element = document.querySelector(".wrapper");
//console.log(h1Element.textContent); // Output: Hello World!

//const contentDiv = document.getElementById(".wrapper")
/**  THIS NEEDS to the INITIALISED AT GLOBAL LEVEL  */
 const mailOptions = { 
    
    html: "Welcome (StoreUser),  \n \n"+

    "Appreciate visit to storenotify.in. At present the profile is basic \n"+
    "Our endevour stays in keeping you connected with storenotify.in \n\n "+
    "Do checkout storenotify.in/music, and register @storenotify.in/register \n\n"+
    "We would be grateful , the free service is extended further \n"+
    "We request your assistance is building better connectivity \n\n"+ 

    strWelcome+

    "Regards \n"+
    "StoreNotify  \n"+
    "admin-sales@storenotify.in \n"

}

module.exports = {
    mailOptions ,
};
