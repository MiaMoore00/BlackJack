const deck = [];
const dealerCards = [];
const playerCards = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
let dealButton = document.getElementById("deal-button");
let hitButton = document.getElementById("hit-button");
let standButton = document.getElementById("stand-button");
let dealerPoints = 0;
let playerPoints = 0;
let playerAceCount = 0;


const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};


for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}
 for (let i = 0; i < deck.length; i++) {
  if (
    deck[i].pointValue == "king" ||
    deck[i].pointValue == "queen" ||
    deck[i].pointValue == "jack"
  ) {
    deck[i].pointValue = 10;
  } else if (deck[i].pointValue == "ace") {
    deck[i].pointValue = 1;
  }
}


window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
});


function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i );
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}shuffleDeck();
 //console.log(shuffleDeck);


function reduceAce(playerPoints, playerAceCount) {
  while (playerPoints > 21 && playerAceCount > 0) {
    playerPoints -= 10;
    playerAceCount -= 1;
  }
}reduceAce();



//deal functions
dealButton.addEventListener("click",  (e) => {
  for (let i = 1; i <= 4; i++) {
    if (i % 2 === 0) {
      let startCard = deck.pop();
      let img = document.createElement("img");
      img.src = "./images/" + startCard.rank + "_of_" + startCard.suit + ".png";
      let src = document.getElementById("dealer-hand");
      src.appendChild(img);
      dealerCards.push(startCard);

       function addDealerpoints() {
        dealerPoints = startCard.pointValue + dealerPoints;
        console.log(dealerPoints + " dealerPoints");
      } addDealerpoints();

      document.getElementById("dealer-points").innerHTML = dealerPoints;
    } else {
      let startCard = deck.pop();
      dealerCards.push(startCard);

      let img = document.createElement("img");
      img.src = "./images/" + startCard.rank + "_of_" + startCard.suit + ".png";
      let src = document.getElementById("player-hand");
      src.appendChild(img);

      function addPlayerpoints() {
        playerPoints = startCard.pointValue + playerPoints;
        console.log(playerPoints + " playerPoints");
      }
      addPlayerpoints();

      document.getElementById("player-points").innerHTML = playerPoints;   
    }
  }      endDeal();
});


//hit functions 
hitButton.addEventListener("click", (e) => {
  let startCard = deck.pop();
  let img = document.createElement("img");
  img.src = "./images/" + startCard.rank + "_of_" + startCard.suit + ".png";
  let src = document.getElementById("player-hand");
  src.appendChild(img);

  function addPlayerpoints() {
    playerPoints = startCard.pointValue + playerPoints;
  }
  addPlayerpoints();

  document.getElementById("player-points").innerHTML = playerPoints;
  
  endGame();
  
});


///stand functions 
standButton.addEventListener("click", (e) => {
  for (let i = dealerPoints; i <= 17; i = dealerPoints) {
    let startCard = deck.pop();
    let img = document.createElement("img");
    img.src = "./images/" + startCard.rank + "_of_" + startCard.suit + ".png";
    let src = document.getElementById("dealer-hand");
    src.appendChild(img);
    dealerCards.push(startCard);
    
    function addDealerpoints() {
      dealerPoints = startCard.pointValue + dealerPoints;
      console.log(dealerPoints + " dealerPoints");
    }
    addDealerpoints();
    document.getElementById("dealer-points").innerHTML = dealerPoints;
  }
      endGame();
    

});
  
/// game results 

function endDeal() {
  let results = "";
  if (playerPoints > 21 || dealerPoints > 21) {
    results = "Bust!";
}
document.getElementById("messages").innerText = results;
document.getElementById("dealer-points").innerText = dealerPoints;
document.getElementById("player-points").innerText = playerPoints;
};

function endGame() {
  let results = "";
if (playerPoints > dealerPoints && playerPoints <= 21) {
  results = "Player Wins!";
}
else if (playerPoints === dealerPoints) {
  results = "Tie!";
}
else if (dealerPoints > playerPoints && dealerPoints <= 21) {
  results = "Dealer Wins";
}
else if (playerPoints === 21) {
  results = "Player Wins!";
}
else if (dealerPoints > 21) {
    results = "Bust! Player Wins! ";
}
else if (playerPoints > 21) {
  results = "Bust! Dealer Wins! ";
}

document.getElementById("dealer-points").innerText = dealerPoints;
document.getElementById("player-points").innerText = playerPoints;
document.getElementById("messages").innerText = results;
};

 //reset game
 let resetButton = document.getElementById("reset-button");
 resetButton.addEventListener("click", (e) => {
    window.location.reload()} );
