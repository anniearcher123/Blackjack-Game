const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
let = dealerSum = 0;
let playerSum = 0;
const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
dealerAceCount = 0;
playerAceCount = 0;

let hidden;
let deck;

canHit = true; //Allows player to draw while player sum is <= to 21

window.onload = function (){
  buildDeck();
  shuffleDeck();
}

dealButton.addEventListener('click', dealCards);
hitButton.addEventListener('click', hitCards);
standButton.addEventListener('click', stand);

function buildDeck() {
  const values = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
  const types = ["hearts", "spades", "clubs", "diamonds"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j< values.length; j++) {
      deck.push(values[j] + "_of_" + types[i])
    }
  }
  // console.log(deck);
}

function shuffleDeck() {
  for(let i = 0; i < deck.length; i++){
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j]; 
    deck[j] = temp;
  }
  console.log(deck);
}

function dealCards() {
  hidden = deck.pop();
  let hiddenCard = document.createElement('img');
  hiddenCard.src = "./images/" + hidden + ".png";
  let cardBack = document.createElement('img');
  cardBack.setAttribute('src', 'images/hidden.png');
  dealerHand.appendChild(cardBack);
  dealerHand.append();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);
  // console.log(hidden); 
  // console.log(dealerSum);

  while (dealerSum < 17) {
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    dealerHand.append(cardImg);
  }
  console.log(dealerSum);

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement('img');
    console.log(deck);
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    playerHand.append(cardImg);
}
  console.log(playerSum);
}

function hitCards() {
  if(!canHit) {
    return;
  }

  let cardImg = document.createElement('img');
    console.log(deck);
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    playerHand.append(cardImg);

    if(reduceAce(playerSum, playerAceCount) > 21) {
      canHit = false;
    }
}

function stand() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(playerSum, playerAceCount);

  canHit = false;

  document.hidden.src = "./images/" + hidden + ".png";

  let message = "";
  if(yourSum > 21) {
    message = "You lose!";
  }
  else if(dealerSum > 21) {
    message = "You win!";
  }
  else if(yourSum === dealerSum) {
    message = "Tie!";
  }
  else if(yourSum > dealerSum) {
    message = "You win!";
  }
  else if (yourSum < dealerSum) {
    message = "You lose!";
  }

  document.getElementById('dealer-points').innerText = dealerSum;
  document.getElementById('player-points').innerText = playerSum;
  document.getElementById('results').innerText = message;
}


function getValue(card) {
  let data = card.split("_of_") //Splits the type and value
  let value = data[0];

  if(isNaN(value)) {
    if(value === "ace") {
      return 11;
    }
    return 10;
  }

  return parseInt(value);
}

function checkAce(card) {
   if(card[0] === "ace") {
    return 1;
   }
   return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while(playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}