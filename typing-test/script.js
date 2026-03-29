const paragraphs = [
    "Typing fast is a useful skill that improves productivity and focus.",
    "JavaScript allows you to create interactive web applications easily.",
    "Practice daily to improve your typing speed and accuracy.",
    "Web development combines creativity with logical thinking."
];

const paragraphEl = document.getElementById("paragraph");
const inputField = document.getElementById("inputField");
const timeEl = document.getElementById("time");
const mistakesEl = document.getElementById("mistakes");
const wpmEl = document.getElementById("wpm");
const cpmEl = document.getElementById("cpm");
const accuracyEl = document.getElementById("accuracy");

let timer = 60;
let mistakes = 0;
let charIndex = 0;
let isTyping = false;
let interval;

function loadParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphEl.innerHTML = "";
    paragraphs[randomIndex].split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        paragraphEl.appendChild(span);
    });
}

function startTimer() {
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timeEl.innerText = timer;
        } else {
            endTest("Time's up! ⏰");
        }
    }, 1000);
}

function endTest(message) {
    clearInterval(interval);
    inputField.disabled = true;

    const totalTyped = charIndex;
    const correctChars = totalTyped - mistakes;
    const accuracy = totalTyped === 0 ? 0 : Math.round((correctChars / totalTyped) * 100);
    const wpm = Math.round((correctChars / 5));
    const cpm = correctChars;

    alert(
        `${message}\n\n` +
        `WPM: ${wpm}\n` +
        `CPM: ${cpm}\n` +
        `Mistakes: ${mistakes}\n` +
        `Accuracy: ${accuracy}%`
    );
}

inputField.addEventListener("input", () => {
    if (!isTyping) {
        startTimer();
        isTyping = true;
    }

    const characters = paragraphEl.querySelectorAll("span");
    const typedChar = inputField.value.charAt(charIndex);

    if (typedChar == null) return;

    if (typedChar === characters[charIndex].innerText) {
        characters[charIndex].classList.add("correct");
    } else {
        characters[charIndex].classList.add("incorrect");
        mistakes++;
        mistakesEl.innerText = mistakes;
    }

    charIndex++;

    const correctChars = charIndex - mistakes;
    const timeSpent = 60 - timer;

    const wpm = Math.round(((correctChars / 5) / timeSpent) * 60) || 0;
    const cpm = correctChars;
    const accuracy = Math.round((correctChars / charIndex) * 100) || 100;

    wpmEl.innerText = wpm;
    cpmEl.innerText = cpm;
    accuracyEl.innerText = accuracy;

    // ✅ Paragraph completed before time
    if (charIndex === characters.length) {
        endTest("Paragraph Completed 🎉");
    }
});

function resetTest() {
    clearInterval(interval);
    timer = 60;
    mistakes = 0;
    charIndex = 0;
    isTyping = false;

    timeEl.innerText = timer;
    mistakesEl.innerText = 0;
    wpmEl.innerText = 0;
    cpmEl.innerText = 0;
    accuracyEl.innerText = 100;

    inputField.value = "";
    inputField.disabled = false;

    loadParagraph();
}

loadParagraph();
const modal = document.getElementById("resultModal");
const resultTitle = document.getElementById("resultTitle");
const finalWpm = document.getElementById("finalWpm");
const finalCpm = document.getElementById("finalCpm");
const finalMistakes = document.getElementById("finalMistakes");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalTime = document.getElementById("finalTime");

function endTest(title) {
    clearInterval(interval);
    inputField.disabled = true;

    const timeTaken = 60 - timer;
    const correctChars = charIndex - mistakes;
    const accuracy = charIndex === 0 ? 0 : Math.round((correctChars / charIndex) * 100);
    const wpm = Math.round(((correctChars / 5) / timeTaken) * 60) || 0;
    const cpm = correctChars;

    resultTitle.innerText = title;
    finalWpm.innerText = wpm;
    finalCpm.innerText = cpm;
    finalMistakes.innerText = mistakes;
    finalAccuracy.innerText = accuracy;
    finalTime.innerText = timeTaken;

    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    resetTest();
}
