const cardImages = ["angler-fish.png", "diamonds-smile.png", "missile-swarm.png", 
                    "rogue.png", "ship-wheel.png", "sword-spade.png", "triton-head.png", 
                    "unlit-bomb.png", "angler-fish.png", "diamonds-smile.png", 
                    "missile-swarm.png", "rogue.png", "ship-wheel.png", "sword-spade.png", 
                    "triton-head.png", "unlit-bomb.png"]
;
let openedCards = [];
let matchedCards = [];

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
shuffle();
setTimeout(showAll, 3000);
setTimeout(hideAll, 8000);

let cardElements = document.getElementsByClassName("card");
for(let i = 0; i < cardElements.length; i++) {
    cardElements[i].addEventListener("click", openCard)
}

// to show card on click
function openCard(e) {
    openedCards.push(e.target.id);
    let id = e.target.id;
    e.target.src = "images/" + cardImages[id-1];
}

// to hide opened cards
function hideCard(e) {
    if(openedCards.length == 2 && openedCards[0] != openedCards[1]) {
        let card = document.getElementById(matchedCards[0]);
        card.src = "images/blank.png";
        card = document.getElementById(matchedCards[1]);
        card.src = "images/blank.png";
    }
}

// disable card after match
function disableCard() {
    if(openedCards.length == 2) {
        for(let i = 0; i < openedCards.length; i++) {
            let card = document.getElementById(openedCards[i]);
            card.removeEventListener("click", openCard);
        }
    }
}

// Fisher-Yates Shuffle
function shuffle() {
    for(let i = cardImages.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [cardImages[i], cardImages[j]] = [cardImages[j], cardImages[i]];
    }
}
