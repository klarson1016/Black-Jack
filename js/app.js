
// Declare deck variables
const deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
 
let deck2 = []
let dealer=[], player=[], winner

  // Cached element references
let deck1El = document.getElementById('deck1')
let deck2El = document.getElementById('deck2')

let playerContainerEl = document.getElementById('playerCardsCont')
let dealerContainerEl = document.getElementById('dealerCardsCont')

document.getElementById('restartBtn').style.display = "none"
document.getElementById('restartBtn').addEventListener('click', handleReset)

const gameStatusDisplayLoc = document.getElementById('gameStatus')

// Event listeners
document.getElementById('dealButton').addEventListener('click', handleDeal)
document.getElementById('hitButton').addEventListener('click', hitHandle)
document.getElementById('stayBtn').addEventListener('click', stayHandle)
document.getElementById('stayBtn').disabled = true
document.getElementById('hitButton').disabled = true

init()
  // Functions
  // Initialize deck 1 with array of 52 cards 
function init() {
    
}

function handleReset() {
  window.location.reload() 
}
  // Function to handle a button click:
function handleDeal() {
    //Flag determining turn in hand being delt
  turn = 'player'
  // loop selecting 4 random index's
  for (let i = 0; i < 4; i++) { 
    if (deck1.length > 0) {
      // Randomly select number from total cards remaining
      let randIdx = Math.floor(Math.random() * deck1.length)
      // Assign card with the random index to a variable
      cardPicked = deck1.splice(randIdx, 1)
      // Add card picked to deck 2
      deck2.push(cardPicked[0])
      if (turn === 'player') {
        player.push(cardPicked[0])
      } else {
        dealer.push(cardPicked[0])
      }
       // Pass card picked to render function to display
      turn = turn === 'dealer' ? 'player' : 'dealer'
    }
  }
  document.getElementById('stayBtn').disabled = false
  document.getElementById('hitButton').disabled = false
  document.getElementById('dealButton').disabled = true
  renderCard(null, true)
} 
function getWinner() {
  let dealerVal = calValue(dealer)
  let playerVal = calValue(player)
  if (dealerVal === playerVal && dealerVal <= 21 && playerVal <= 21){
    gameStatusDisplayLoc.innerHTML = 'Push'
  } else if (dealerVal === 21){
    gameStatusDisplayLoc.innerHTML = 'Black Jack! Dealer Wins'
  } else if (playerVal === 21){
    gameStatusDisplayLoc.innerHTML = 'Black Jack! You Win!'
  } else if (dealerVal > playerVal && dealerVal <= 21 && playerVal <= 21){
    gameStatusDisplayLoc.innerHTML = 'Dealer Wins'
  } else if (dealerVal < playerVal && dealerVal <= 21 && playerVal <= 21) {
    gameStatusDisplayLoc.innerHTML = 'You Win'
  } else if (playerVal > 21){
    gameStatusDisplayLoc.innerHTML = 'You Bust! Dealer Wins'
  } else if (dealerVal > 21){
    gameStatusDisplayLoc.innerHTML = 'Dealer Bust! You Win'
  } 
  document.getElementById('stayBtn').disabled = true
  document.getElementById('hitButton').disabled = true
  document.getElementById('restartBtn').style.display = 'block'
}
function calValue(cardArray) {
  let value = 0
  let aceNum = 0
  cardArray.forEach(card => {
    if(card.includes('J') || card.includes('Q') || card.includes('K')) {
      value += 10
    } else if (card.includes('A')) {
      aceNum ++
      value += 11
    } else {
      value += parseInt(card.substring('1'))
    }
  })
  while(value > 21 && aceNum > 0){
    value -= 10
    aceNum --
  }
  return value
}
function renderCard(currentPlayer, isDeal) {
  let cardArray, elementCont;
  //grab the card array of whoever turn this is
    cardArray = currentPlayer === 'player' ? player : dealer
    elementCont = currentPlayer === 'player' ? playerContainerEl : dealerContainerEl
    let playerEls = playerContainerEl.children
    let dealerEls = dealerContainerEl.children
  if(isDeal) {
    player.forEach( (playerCardValue, index)  => {
      playerEls[index].classList.remove('outline')
      playerEls[index].classList.add(playerCardValue)})

      dealerEls[0].classList.remove('outline')
      dealerEls[0].classList.add(dealer[0])
  }else{
    if(currentPlayer === 'dealer') {
      dealerEls[1].classList.remove('outline')
      dealerEls[1].classList.add(dealer[1])
      for(let i = 2; i < dealer.length; i++ ){
        let newCardValue = dealer[i]
        let newCardEl = document.createElement("div")
        newCardEl.id = 'dealer card'
        newCardEl.className = 'card large ' + newCardValue;
        dealerContainerEl.appendChild(newCardEl);
      }
    } else {
      let newCardValue = cardArray[cardArray.length -1]
      let newCardEl = document.createElement("div")
      newCardEl.id = 'player card'
      newCardEl.className = 'card large ' + newCardValue;
      elementCont.appendChild(newCardEl);
    }  
  }
}
function hitHandle(){
  turn = 'player'
    if (deck1.length > 0) {  
      let randIdx = Math.floor(Math.random() * deck1.length) 
      // Assign card with the random index to a variable
      cardPicked = deck1.splice(randIdx, 1)
      // Add card picked to deck 2
       deck2.push(cardPicked[0])
      if (turn === 'player') {
         player.push(cardPicked[0])
      } 
    }
    renderCard(turn, false)
    let playerVal = calValue(player)
    if(playerVal > 21 ){
      gameStatusDisplayLoc.innerHTML = 'You Bust! Dealer Wins'
      document.getElementById('stayBtn').disabled = true
      document.getElementById('hitButton').disabled = true
      document.getElementById('restartBtn').style.display = 'block'
    }
}  
function stayHandle(){
 turn = 'dealer'
 dealerVal = calValue(dealer)
  while (dealerVal <= 16){ 
    let randIdx = Math.floor(Math.random() * deck1.length) 
    // Assign card with the random index to a variable
    cardPicked = deck1.splice(randIdx, 1)
    // Add card picked to deck 2
      deck2.push(cardPicked[0])
      dealer.push(cardPicked[0])
      dealerVal = calValue(dealer)
  }
  renderCard(turn, false)
  getWinner()
} 