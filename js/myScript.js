const cardImages = ["angler-fish.png", "diamonds-smile.png", "missile-swarm.png", 
                    "rogue.png", "ship-wheel.png", "sword-spade.png", "triton-head.png", 
                    "unlit-bomb.png", "angler-fish.png", "diamonds-smile.png", 
                    "missile-swarm.png", "rogue.png", "ship-wheel.png", "sword-spade.png", 
                    "triton-head.png", "unlit-bomb.png"]
;
let cardElements = document.getElementsByClassName("card");
let openedCards = [];
let matchedCards = [];

let btn = document.getElementById("btn");
btn.addEventListener("click", start);

function start(e) {
    let eventTarget = e.target;
    if(eventTarget.className == "play-btn") {
        eventTarget.className = "reset-btn";
        shuffle();
        setTimeout(hideAll, 800);
        showAll();
        
        for(let i = 0; i < cardElements.length; i++) {
            cardElements[i].addEventListener("click", openCard);
        }

    }
    else if(eventTarget.className == "reset-btn") {
        resetGame();
        eventTarget.className = "play-btn";
    }
}

// to show card on click
function openCard(e) {
    console.log(openedCards);
    console.log(matchedCards);
    let id = e.target.id;
    e.target.src = "images/" + cardImages[id-1];
    openedCards.push(e.target);
    if(openedCards.length >= 2) {
        disableAllCards();
        setTimeout(check, 1500);
    }
}

// to check condition
function check() {
    if(openedCards.length == 2 && openedCards[0].src != openedCards[1].src) {
        hideCard();
    }
    else if(openedCards.length == 2 && openedCards[0].src == openedCards[1].src) {
        disableCard();
    }
    else if(openedCards.length > 2) {
        for(let i = 0; i < openedCards.length; i++) {
            openedCards.pop();
        }
    }
}

// to hide opened cards
function hideCard(e) {
    let card = document.getElementById(openedCards[0].id);
    card.src = "images/blank.png";
    card = document.getElementById(openedCards[1].id);
    card.src = "images/blank.png";
    openedCards.pop();
    openedCards.pop();
    enableAllCards();
}

// disable card after it's matched
function disableCard() {
    for(let i = 0; i < openedCards.length; i++) {
        let card = document.getElementById(openedCards[i].id);
        card.removeEventListener("click", openCard);
        matchedCards.push(openedCards[i]);
    }
    openedCards.pop();
    openedCards.pop();
    enableAllCards();
}

// disable all cards
function disableAllCards() {
    for(let i = 0; i < cardElements.length; i++) {
        cardElements[i].removeEventListener("click", openCard);
    }
    console.warn("all cards disabled");
}

// enable all cards
function enableAllCards() {
    for(let i = 0; i < cardElements.length; i++) {
        cardElements[i].addEventListener("click", openCard);
    }
    console.warn("all cards enabled");
}

// to show all cards
function showAll() {
    for(let i = 0; i < cardElements.length; i++) {
        cardElements[i].src = "images/" + cardImages[i];
    }
}

// to hide all cards
function hideAll() {
    for(let i = 0; i < cardElements.length; i++) {
        cardElements[i].src = "images/blank.png";
    }
}

// Fisher-Yates Shuffle
function shuffle() {
    for(let i = cardImages.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [cardImages[i], cardImages[j]] = [cardImages[j], cardImages[i]];
    }
}
