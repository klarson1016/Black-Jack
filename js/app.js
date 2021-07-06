
// Declare deck variables
 
  const suitFace = ['Club', 'Heart', 'Spade', 'Diamond']
  const cardRank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
  const deck1 = []
  for (let suitCounter = 0; suitCounter < 4; suitCounter++) {
    for (let rankCounter = 0; rankCounter < 13; rankCounter++) {
      deck1.push(cardRank[rankCounter] + suitFace[suitCounter])
    }
  }

  let deck2 = []
  let dealer=[], player=[], winner
  let value = []
  // Cached element references
  let deck1El = document.getElementById('deck1')
  let deck2El = document.getElementById('deck2')
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
        //let dealerCards = parseInt(dealer)
        console.log("dealer card values", dealer)
        // Pass card picked to render function to display
        getWinner()
        turn = turn === 'dealer' ? 'player' : 'dealer'
        render(cardPicked)
      }
    }
     console.log('dealer hand', dealer)
     console.log('player hand', player)
     console.log(deck2)
  } 

  function getWinner() {
    let handDeck = turn === 'dealer'? dealer : player
    console.log('deck ', handDeck)
    let value = 0 
    let aceNum
    handDeck.forEach(card => {
      if(card.includes('Jack') || card.includes('Queen') || card.includes('King')) {
        value += 10
      } else if (card.includes('Ace')) {
      aceNum ++
        value += 11
      } else {
        value += parseInt(card.substring('0', '2'))
      }
    })
    console.log('value ', value)
    if (value === 21) {
      gameStatusDisplayLoc.innerHTML = `Black Jack, ${turn === 'dealer' ? 'Dealer' : 'You' } Wins`
    } else if (value > 21){
      gameStatusDisplayLoc.innerHTML = `Bust! ${turn === 'dealer' ? 'Dealer' : 'You' } Wins`

    }

  }
  // Function to render deck state
  function render(cardPicked){
    //Remove outline class when first card is picked
    // if (deck2.length === 1) {
    //   deck2El.classList.remove('outline')
    // }
    // // Removes previous picked card from deck 2 class list
    // if (deck2.length > 1) {
    //   deck2El.classList.remove(cardToRemove)
    // }
  	// // Set card to be removed on next click
    // cardToRemove = cardPicked
    // // Add current card picked to deck 2 element
    // deck2El.classList.add(cardPicked)
    // // Adjust shadow when deck gets above/below halfway full
    // if (deck2.length === 26) {
    //   deck1El.classList.remove('shadow')
    //   deck2El.classList.add('shadow')
    // }
    // // Remove card back color and add outline when last card is picked
    // if (deck1.length === 0) {
    //   deck1El.classList.add('outline')
    //   deck1El.classList.remove('back-blue')
    // }
  }
  function hitHandle(){
    //console.log('inside hit')
    turn = 'player'
      if (deck1.length > 0) {
        //console.log('inside if')
        // Randomly select number from total cards remaining
        let randIdx = Math.floor(Math.random() * deck1.length)
        //console.log('new card ', randIdx)
        // Assign card with the random index to a variable
        cardPicked = deck1.splice(randIdx, 1)
        // Add card picked to deck 2
        //console.log(cardPicked)
        deck2.push(cardPicked[0])
        if (turn === 'player') {
          player.push(cardPicked[0])
        } 
      }
      console.log(player)
      //console.log('Player hand new value ', value)
      getWinner()
  }  
  function stayHandle(){
    turn = 'player'
    // if (  ){

    // }
  }
