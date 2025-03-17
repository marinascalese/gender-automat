// Sicherheitsfunktion: Entfernt gefährlichen HTML-Code
function sanitizeText(text) {
    let div = document.createElement("div");
    div.innerText = text;
    return div.innerHTML;
}

// Wörterbuch für Gendering
const ersetzungen = {
    "Bewerber": "Bewerber*in",
    "Patient": "Patient*in",
    "Arzt": "Arzt/Ärztin",
    "Mitarbeiter": "Mitarbeiter*in",
    "Kollege": "Kolleg*in",
    "Chef": "Chef*in",
    "Lehrer": "Lehrer*in",
    "Teilnehmer": "Teilnehmer*in",
    "Besucher": "Besucher*in",
    "Kunde": "Kund*in",
    "Student": "Student*in",
    "Professor": "Professor*in"
};

// Holt den gewählten Gender-Stil (*, :, _)
function getGenderStyle() {
    return document.getElementById("gender-style").value;
}

// Gendern eines einzelnen Textes
function gendern(button) {
    let textElement = button.previousElementSibling;
    if (textElement) toggleGender(textElement);
}

// Gendern aller Texte
function gendernAlle() {
    document.querySelectorAll(".gender-text").forEach(toggleGender);
}

// Umschalten zwischen Original & Gender-Form
function toggleGender(textElement) {
    if (!textElement.dataset.original) {
        textElement.dataset.original = textElement.innerText;
    }

    if (textElement.innerText !== textElement.dataset.original) {
        textElement.innerText = textElement.dataset.original;
    } else {
        let text = textElement.dataset.original;
        let genderStyle = getGenderStyle();

        for (let original in ersetzungen) {
            let regex = new RegExp(`(?<!\\w)${original}(?!\\w)`, "g");
            let replacement = ersetzungen[original].replace("*", genderStyle);
            text = text.replace(regex, replacement);
        }

        textElement.innerText = sanitizeText(text);
    }
}
function toggleMenu(x) {
    x.classList.toggle("change"); // Menü-Icon Animation

    let menu = document.querySelector(".nav-container"); // Navigation holen
    if (menu.style.display === "block") {
        menu.style.display = "none"; // Menü ausblenden
    } else {
        menu.style.display = "block"; // Menü einblenden
    }
}
