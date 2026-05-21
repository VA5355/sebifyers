const store  = require( "store2"); 
 const welcomeEmailTemplate  = require("./welcomesendgrid");
 const mailOptionsOne = { 
    
    text: "Invitation (StoreUser),  \n \n"+

    "Good Day (StoreUser),  \n \n"+ "Wish to see you soon at (store_name). \n"+
    "Happy to invite you and be connected with (store_name) \n\n "+
    " \n"+
    "Try the invitation (store_link), or register @storenotify.in/register \n\n"+ "We would be grateful , this is a free service  \n"+
    "  \n\n"+ 
    "Regards \n"+
    "StoreNotify  \n"
   // "admin-sales@storenotify.in \n"

}
 const mailOptions = { 
    
    text: "Invitation (StoreUser),  \n \n"+

    "Good Day (StoreUser),  \n \n"+ "Wish to see you soon at (store_name). \n"+
    "Happy to invite you and be connected with (store_name) \n\n "+
    " \n"+
    "Try the invitation (store_link), or register @storenotify.in/register \n\n"+ "We would be grateful , this is a free service  \n"+
    "  \n\n"+ 
      welcomeEmailTemplate.welcomeEmailTemplate+





    "Regards \n"+
    "StoreNotify  \n"
   // "admin-sales@storenotify.in \n"

}

module.exports = {
    mailOptions ,
};
