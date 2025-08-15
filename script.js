const tasks = [
    { question: "ein·kaufen", answer: "Kaufst du gern ein?" },
    { question: "kochen", answer: "Kochst du gern?" },
    { question: "spazieren gehen", answer: "Gehst du gern spazieren?" },
    { question: "Schokolade essen", answer: "Isst du gern Schokolade?" },
    { question: "früh auf·stehen", answer: "Stehst du gern früh auf?" },
    { question: "das Bad putzen", answer: "Putzt du gern das Bad?" },
    { question: "die Küche auf·räumen", answer: "Räumst du gern die Küche auf?" },
    { question: "lesen", answer: "Liest du gern?" },
    { question: "Gemüse essen", answer: "Isst du gern Gemüse?" },
    { question: "Deutsch sprechen", answer: "Sprichst du gern Deutsch?" },
    { question: "Saft trinken", answer: "Trinkst du gern Saft?" },
    { question: "arbeiten", answer: "Arbeitest du gern?" },
    { question: "Hausaufgaben machen", answer: "Machst du gern Hausaufgaben?" },
    { question: "ins Kino gehen", answer: "Gehst du gern ins Kino?" },
    { question: "Fußball spielen", answer: "Spielst du gern Fußball?" },
    { question: "zum Deutschkurs gehen", answer: "Gehst du gern zum Deutschkurs?" },
    { question: "Musik hören", answer: "Hörst du gern Musik?" },
    { question: "fern·sehen", answer: "Siehst du gern fern?" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
