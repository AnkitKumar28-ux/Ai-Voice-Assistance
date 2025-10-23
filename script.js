const btn = document.getElementById("talk");
const content = document.getElementById("content");
const circle = document.getElementById("circle");

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1;
  speech.volume = 1;
  speech.pitch = 1;
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

function wishMe() {
  const hour = new Date().getHours();
  if (hour < 12) speak("Good morning!");
  else if (hour < 18) speak("Good afternoon!");
  else speak("Good evening!");
}

window.addEventListener("load", () => {
  speak("Initializing AI Assistant...");
  wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
  circle.classList.add("listening");
  content.innerText = "Listening...";
};

recognition.onend = () => {
  circle.classList.remove("listening");
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  content.innerText = `You said: "${transcript}"`;
  takeCommand(transcript);
};

btn.addEventListener("click", () => {
  recognition.start();
});

function takeCommand(message) {
  if (message.includes("hello") || message.includes("hi")) {
    speak("Hello there! How can I help you?");
  } else if (message.includes("time")) {
    const time = new Date().toLocaleTimeString();
    speak(`The time is ${time}`);
  } else if (message.includes("date")) {
    const date = new Date().toDateString();
    speak(`Today is ${date}`);
  } else if (message.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com", "_blank");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com", "_blank");
  } else if (message.includes("your name")) {
    speak("I am your AI voice assistant, built using JavaScript!");
  } else {
    speak("Sorry, I didn't understand that. Please try again.");
  }
}
