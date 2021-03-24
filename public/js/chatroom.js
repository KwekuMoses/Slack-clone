const message_form = document.getElementById("message_form");
var input = document.getElementById("input");
//* Get username and roomname from URL
const { username, room } = Qs.parse(location.search, {
  //*ignore frågetecken etc i url
  ignoreQueryPrefix: true,
});
const socket = io();

socket.emit("joinRoom", { username, room });

//* Skicka meddelanden till DOM
message_form.addEventListener("submit", function (e) {
  e.preventDefault();
  //* Om det finns ett input value i form
  if (input.value) {
    //* Emit chat message eventet, med input.value som det data som skickas med
    //* chat message eventet tar formatMessage funktionen som parameter
    socket.emit("chat message", input.value);
    //* Clear input field
    input.value = "";
    //* Focus efter att ha skickat ett meddelande
    e.target.elements.input.focus();
  }
});

//* Hantera vår chat message emit
socket.on("chat message", function (message) {
  var item = document.createElement("li");
  item.textContent = `${message.time} ${message.username}: ${message.text}`;
  // item.textContent = `${message.time} ${message.username}`;
  messages.appendChild(item);

  //*Scroll down
  message_form.scrollTo(0, document.body.scrollHeight);
});

//* i server.js gör vi en av emit av "message", här använder vi "message"
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);
});

function outputMessage(message) {
  const div = document.createElement("div");
  //div.classList.add("message");
  div.innerHTML = `<p class="text"><span>${message.time}</span><span>${message.username}</span> </p>
  <p>${message.text}</p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
