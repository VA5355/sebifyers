require("dotenv").config();

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});

 
const auth = {
  type: "OAuth2",
  user: "sid.cd.varma@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailonedinaaroptions = {
  from: "admin-sales@storenotify.in",
  to: "viraatmailbo321@gmail.com",
  // cc: "support@neo.space",
  subject: `Onedinaar Onboard ${nDate}` ,
  dsn: {
    id: 'Registeration Failed for',
    return: 'headers',
    notify: ['failure', 'delay'],
    recipient: 'fairvinay@gmail.com'
}
};
const mailoptions = {
  from: "admin-sales@storenotify.in",
  to: "viraatmailbo321@gmail.com",
  // cc: "support@neo.space",
  subject: `StoreNotify Welcome ${nDate}` ,
  dsn: {
    id: 'Registeration Failed for',
    return: 'headers',
    notify: ['failure', 'delay'],
    recipient: 'fairvinay@gmail.com'
}
};

const mailinviteoptions = {
  from: "sales-man@storenotify.in",
  to: "viraatmailbo321@gmail.com",
  // cc: "support@neo.space",
  subject: `StoreNotify Invite` ,  //${nDate}
  dsn: {
    id: 'Registeration Failed for',
    return: 'headers',
    notify: ['failure', 'delay'],
    recipient: 'fairvinay@gmail.com'
}
};

module.exports = {
  auth,
  mailoptions,
  mailonedinaaroptions,
  mailinviteoptions
};

// follow this for DSN 
// https://stackoverflow.com/questions/71924157/how-does-users-watch-in-gmail-google-api-listen-for-notifications
