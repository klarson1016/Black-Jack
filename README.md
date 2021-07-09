# BlackJack
## Instructions
 Once deal is clicked both player and dealer are dealt 2 cards. 
 Player then evaluates the cards dealt to decied to hit or stay. 
   if palyer chooses to hit, another card will be dealt to player. 
  if player is satisfied with cards in hand, player then clicks stay to end turn. 
Dealers hand is then revealed and if dealers hand is equal to or less than 16 dealer, will be dealt cards until card values are greater than 17.
Player and dealer cards are then compared to each other and a winner is determined.

### ### Play Game Here! (http://black-jack.surge.sh/)

Why I chose Black Jack:
Black Jack was a game my soilders and I enjoyed that helped us bond while we were deployed to Afghanistan. It was a healthy way for us pass the time while waiting for our next mission.

## PseudoCode 
#### 1. Define required veiriables:
      Define empty Player and Deaaler array to store cards
      Declare a value variable to zero 
#### 2. Store Cached Elements
      Create variable to store player and dealer container 
      Declare game status varible to display the current game status.
#### 3. Event Listeners
     Create button to perform deal function and begin the game.
     Create button to perform hit function to deal 1 additional card to player each time it is clicked until desiered hand value is reached or until player hand is greater then 1.
     Create button to perform stay function which ends player turns.
#### 4. Functions
      Handle deal function starts the game and deals 4 cards, 2 to player and 2 to dealer.
      Get Winner function check to see if a winner condition has been meet. Call get winner function inside handleDeal, stayHandle, and hitHandle functions to determin winner based off cards in both dealer and player hands.
      Render Card funtion displays the cards from the CSS file that holds the card images and assigns them to the appropriate divs.
      Hit handle function deals 1 additional card to player hand each time the player clicks it. Get winner function is called here each time the player clicks hit to check if winning conditions have been meet.
      Stay handle function ends players turn. Call getWinner function to see if winning coditions have been meet if not dealer will be dealt cards until a condition is meet to end the game.
## Screenshots:
![Black Jack](https://i.imgur.com/3EVqet8.png)

Before deal button clicked.

![Black Jack](https://i.imgur.com/aj3v0XA.png)

Game Over player bust.
## Technologies Used:
  Javascript, HTML, CSS

## Things To Add In The Future:
  Animations to cards when being dealt.
  
  Include audio
  
  Split card feature

