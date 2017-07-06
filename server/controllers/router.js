// const pages = require('./pages');
const message = require('./message');

//  Map routes to controller functions
module.exports = function(app) {
  //  Twilio SMS webhook route
  app.post('/message', message.webhook);

  //  Render a page that will allow an admin to send out a message to subs
  // app.get('/', pages.showForm);

  //  Handle form submission and send messages to subscribers
  app.post('/message/send', message.sendMessages);
}
