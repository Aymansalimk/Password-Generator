const display = document.querySelector("[data-displayPassword]");
const copyToClipboardButton = document.querySelector("[data-copyToclipBoard]");
const passwordLengthDisplay = document.querySelector("[data-password_length]");
const slider = document.querySelector("[data-slider]");
const upperCaseCheckbox = document.querySelector("[data-upperCase]");
const lowerCaseCheckbox = document.querySelector("[data-lowerCase]");
const numbersCheckbox = document.querySelector("[data-numbers]");
const symbolsCheckbox = document.querySelector("[data-symbols]");
const signalColor = document.querySelector("[data-signalColor]");
const generateButton = document.querySelector("[data-generateButton]");
const copyImage = document.querySelector("[data-copyImage]");
const symbols = '!@#$%^&*()_+-=[]{}|';
const copied = document.querySelector("[data-copiedtext]");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// By default values
let length = 10;
let checkCount = 0;
let password = "";

// Set slider to display length
handleSlider();
function handleSlider() {
    passwordLengthDisplay.innerHTML = length;
}

// Set indicator color
function setColor(color) {
    signalColor.style.backgroundColor = color;
}

// Random generation functions
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function rndmInt() {
    return random(0, 10);
}

function rndmUppercase() {
    return String.fromCharCode(random(65, 91));
}

function rndmLowercase() {
    return String.fromCharCode(random(97, 123));
}

function rndmsymbol() {
    return symbols.charAt(random(0, symbols.length));
}

// Set color based on password strength
function calcStrength() {
    let hasUpper = upperCaseCheckbox.checked;
    let hasLower = lowerCaseCheckbox.checked;
    let hasNum = numbersCheckbox.checked;
    let hasSym = symbolsCheckbox.checked;

    if (hasUpper && hasLower && (hasNum || hasSym) && length >= 8) {
        setColor("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        length >= 6
    ) {
        setColor("#ff0");
    } else {
        setColor("#f00");
    }
}

// Copy to clipboard
async function copy_clipboard() {
    try {
        await navigator.clipboard.writeText(display.value);
        copied.innerText = "Copied";
    } catch (e) {
        copied.innerText = "Failed to Copy";
    }
    copied.classList.remove('hidden');
    
    setTimeout(() => {
        copied.classList.add('hidden');
    }, 2000);
    
}

// Slider event
slider.addEventListener('input', (e) => {
    length = e.target.value;
    handleSlider();
})

// Copy clipboard
copyToClipboardButton.addEventListener('click', () => {
    if (display.value) {
        copy_clipboard();
    }
})

// Handle checkbox changes
function handleChange() {
    checkCount = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) checkCount++;
    });
}

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleChange);
})

// Generate button event
generateButton.addEventListener('click', () => {
    if (checkCount == 0) return;
    if (checkCount > length) {
        length = checkCount;
        handleSlider();
    }
    password = "";

    let funcarr = [];
    if (upperCaseCheckbox.checked)
        funcarr.push(rndmUppercase);
    if (lowerCaseCheckbox.checked)
        funcarr.push(rndmLowercase);
    if (numbersCheckbox.checked)
        funcarr.push(rndmInt);
    if (symbolsCheckbox.checked)
        funcarr.push(rndmsymbol);

    for (let i = 0; i < funcarr.length; i++) {
        password += funcarr[i]();
    }

    for (let i = 0; i < length - funcarr.length; i++) {
        let rndm = random(0, funcarr.length);
        password += funcarr[rndm]();
    }
    display.value = password;
    calcStrength();
})
