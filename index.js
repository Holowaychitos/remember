var $alarms = document.getElementById('alarms');
$alarms.innerHTML = '';
var $submit = document.getElementById('submitBtn');
var $message = document.getElementById('message');
var $time = document.getElementById('time');

var messageCount = 0;

function speech (text) {
  var msg = window.SpeechSynthesisUtterance ? new SpeechSynthesisUtterance() : new webkitSpeechSynthesisUtterance;
  msg.text = text;
  msg.lang = 'es-MX';

  window.speechSynthesis.speak(msg);
}

function submit (event) {
  event.preventDefault();
  event.stopPropagation();

  var message = $message.value;
  var time = $time.value * 1000;

  messageCount++;

  scheduleSpeech(messageCount, message, time);
}

function scheduleSpeech (textId, text, time) {
  var date = new Date(new Date().getTime() + time);

  $alarms.innerHTML = $alarms.innerHTML + '<div id="message' + textId + '"><div class="message-text">' + text + '</div><div class="message-time">' + date + '</div></div>';

  window.setTimeout(function() {
    speech(text);
    document.getElementById('message' + textId).remove()
  }, time);
}