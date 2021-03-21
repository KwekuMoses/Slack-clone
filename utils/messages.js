//* Används för timestamps på meddelanden som skickas
const moment = require("moment");
//* Används i server.js för att formattera meddelanden som skickas
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format(" h:mm a: "),
  };
}

module.exports = formatMessage;
