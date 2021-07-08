
// Declare deck variables
  const deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
 
  let deck2 = []
  let dealer=[], player=[], winner
  let value = 0
  // Cached element references
  let deck1El = document.getElementById('deck1')
  let deck2El = document.getElementById('deck2')

  let playerContainerEl = document.getElementById('playerCardsCont')
  let dealerContainerEl = document.getElementById('dealerCardsCont')

  const gameStatusDisplayLoc = document.getElementById('gameStatus')
  // Event listeners
  document.getElementById('dealButton').addEventListener('click', handleDeal)
  document.querySelector('#hitButton').addEventListener('click', hitHandle)
  document.getElementById('stayBtn').addEventListener('click', stayHandle)
  init()
  // Functions
  // Initialize deck 1 with array of 52 cards 
  function init() {
    
  }
  // Function to handle a button click:
  function handleDeal(){
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
        console.log("dealer card values", dealer)
        // Pass card picked to render function to display
        getWinner()
        turn = turn === 'dealer' ? 'player' : 'dealer'
      }
    }

    renderCard(null, true)
  } 

  function getWinner() {
    value = 0
    let handDeck = turn === 'dealer'? dealer : player
    console.log('deck ', handDeck)
    //let value = 0 
    let aceNum
    handDeck.forEach(card => {
      if(card.includes('J') || card.includes('Q') || card.includes('K')) {
        value += 10
      } else if (card.includes('A')) {
      aceNum ++
        value += 11
      } else {
        value += parseInt(card.substring('2', '3'))
      }
    })
    console.log('value ', value)
    if (value === 21) {
      gameStatusDisplayLoc.innerHTML = `Black Jack, ${turn === 'player' ? 'dealer' : 'You' } Wins`
    } else if (value > 21){
      gameStatusDisplayLoc.innerHTML = `Bust! ${turn === 'player' ? 'dealer' : 'You' } Wins`
    } 

  }

function renderCard(currentPlayer, isDeal) {
  let cardArray, elementCont;
  //grab the card array of whoever turn this is
    cardArray = currentPlayer === 'player' ? player : dealer
    elementCont = currentPlayer === 'player' ? playerContainerEl : dealerContainerEl
  console.log('deck in render ', cardArray)
  if(isDeal) {
    let playerEls = playerContainerEl.children
    let dealerEls = dealerContainerEl.children
    player.forEach( (playerCardValue, index)  => {
      playerEls[index].classList.remove('outline')
      playerEls[index].classList.add(playerCardValue)})

      dealer.forEach( (dealerCardValue, index)  => {
        dealerEls[index].classList.remove('outline')
        dealerEls[index].classList.add(dealerCardValue)})
  } else {
    let newCardValue = cardArray[cardArray.length -1]
    console.log('new card vlue ', newCardValue)
    let newCardEl = document.createElement("div")

    newCardEl.id = `${currentPlayer === 'player' ? 'player' : 'dealer'} card`
    newCardEl.className = 'card large ' + newCardValue;
    elementCont.appendChild(newCardEl);
  }
}

  function hitHandle(){
    //console.log('inside hit')
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
      console.log(player)
      renderCard(turn, false)
      getWinner()
  }  

  function stayHandle(){
    turn = 'dealer'
    getWinner()
    console.log('Inside stay handle ') 
    
    while (value <= 16){
     
      let randIdx = Math.floor(Math.random() * deck1.length) 
        // Assign card with the random index to a variable
        cardPicked = deck1.splice(randIdx, 1)
        // Add card picked to deck 2
        deck2.push(cardPicked[0])
        dealer.push(cardPicked[0])
        renderCard(turn, false)
        getWinner()
    }
} 