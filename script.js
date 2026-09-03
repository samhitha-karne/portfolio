const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const introText =
  "Hi, I'm Karne Samhitha Reddy. I'm currently pursuing BSc Cloud Computing at Loyola Academy. " +
  "I'm interested in Cloud Computing, DevOps and Cloud Security. " +
  "I'm developing practical skills in AWS, Linux, networking, Docker, Terraform and CI CD. " +
  "My goal is to grow into a skilled cloud and DevOps professional.";

const speakBtn = document.getElementById("speakBtn");
let availableVoices = [];

function loadVoices() {
  availableVoices = window.speechSynthesis.getVoices();
}

loadVoices();
if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
}

speakBtn.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    alert("Sorry, your browser does not support text to speech.");
    return;
  }

  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(introText);

  // Prefer a female English voice when the browser/device provides one.
  const femaleVoice = availableVoices.find(voice =>
    /female|heera|zira|samantha|susan|google uk english female|google us english/i.test(voice.name)
  ) || availableVoices.find(voice => /en-IN|en-GB|en-US/i.test(voice.lang));

  if (femaleVoice) {
    speech.voice = femaleVoice;
    speech.lang = femaleVoice.lang;
  } else {
    speech.lang = "en-IN";
  }

  speech.rate = 0.95;
  speech.pitch = 1.05;

  speech.onstart = () => speakBtn.textContent = "■ Stop Introduction";
  speech.onend = () => speakBtn.textContent = "▶ Listen to My Intro";

  window.speechSynthesis.speak(speech);
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
