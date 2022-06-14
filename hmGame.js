'use strict';



const libraryWords = {

    wordsArray: ['happy', 'cat', 'dog', 'bear', 'gas','tags', 'give'],

};

let randIndexVal;
let gameWord = '';
let guessCount = 10;
let guessWord;
let gameWordLength;
let solvedWord = '-'
let tries = 0;
let shownWord;


///////////////////////
//
//  Elements
//  
//////////////////////

const btnStartGame = document.querySelector('.start_form');
const btnYes = document.querySelector('.play_again');
const btnNo = document.querySelector('.dont_play_again');
const labelNumTurnsLeft = document.querySelector('.num_turns_left');
const labelNumTries = document.querySelector('.num_tries');
const labelGuessWord = document.querySelector('.guess_word');
const inputLetter = document.querySelector('.letter_input');
const labelStatus = document.querySelector('.status');
const labelAsk = document.querySelector('.game_options');
const labelLettersPicked = document.querySelector('.letters_guessed');
//hide the game options section initially

labelAsk.style.opacity = 0;



const pickWord = function (){

    //picks a random value from the length of the array
    randIndexVal = Math.floor(Math.trunc(Math.random()*libraryWords.wordsArray.length));
    //console.log(randIndexVal);

   
    return libraryWords.wordsArray[randIndexVal];


};

//picks the random word from the library.
gameWord = pickWord();
console.log(gameWord);

//end game function

// const endGame = function(){
//     let answer = prompt('Do you want to play again? Y/N');
//     if (answer == 'y'){
//         guessCount = 10;
//         gameWord = pickWord();
//         guessMatch(gameWord);
//     }else{
//         console.log('Thank you for playing!')
//     };

//     console.log(answer);
// };

const matchTrue = function(letter, word){

    let foundIndex = word.indexOf(letter);
    //console.log(foundIndex);
    let interimGuessWord = word.replace(letter, '-');
    //This is where we want to update the guess word on the web page.
    updateShownWord(foundIndex,letter);
    //labelGuessWord.textContent = solvedWord;    
    //console.log(interimGuessWord);
    return interimGuessWord;

};

//Defining replacement function to be used in updating the shownWord value.

String.prototype.replaceAt = function(index, replaceLetter) {
    return this.substring(0, index) + replaceLetter + this.substring(index + replaceLetter.length);
};



const updateShownWord = function(index,letter){
    //This is where we want to update the guess word on the web page.

    //console.log('Index is at '+index+' and the letter is'+letter);

    shownWord = shownWord.replaceAt(index,letter);
    //console.log('The shown word is '+shownWord);
    
    labelGuessWord.textContent = shownWord;

}

const checkForLettersOnly = function(inputVal){
    var regEx = /^[A-Za-z]+$/;
    if(regEx.test(inputVal))
      {
       return true;
      }
    else
      {
      //alert("Please enter letters only.");
      return false;
      }
 };



const guessMatch = function (gWord){
    //if the guess count is not 0 do the following:
    if (guessCount > 0){




    let guessLetter = inputLetter.value.toLowerCase();
    //console.log('The GL is '+guessLetter);
        
    
    //reset the input box
    inputLetter.value = '';

    labelLettersPicked.textContent += guessLetter+', ';

    //increment the number of tries
    tries = tries+1;
    //console.log(`The number of tries is ${tries}`);
    labelNumTries.textContent = tries;

    //is it the initial try?
   
    //If it's the beginning of the game set the interim guessword to the initial game word. Get the length of the game word and then set the shown word to give the user a hint.
    if(guessCount == 10 && tries == 1){
        
        guessWord = gameWord;
        //get the length of the guess word.
        gameWordLength = guessWord.length;
        //console.log('game word length is '+ gameWordLength);
        //set the solved word.
        solvedWord =  solvedWord.repeat(gameWordLength).concat();
        //console.log('Solved word is: '+ solvedWord);
        shownWord = solvedWord;
        labelStatus.textContent = 'Game started. Good Luck!';

    }else{

    guessWord = gWord;
    };
    //console.log(guessWord);
    //console.log(guessLetter);

    



        //if the guessWord contains the letter the user entered, decrement the word count by replacing that letter with a '-' character.
     
      
        //check to see if the letter is in the word
        if (guessWord.includes(guessLetter)){
            //If it is tell the user
            labelStatus.textContent =`Found letter ${guessLetter}! Keep going!`;
            console.log('Found letter');
            //match it to the index and then update the interim guess word.
            guessWord = matchTrue(guessLetter,guessWord);
            
            //console.log('The new guess word is '+ guessWord);
            inputLetter.focus();



            //decide if the entire word has been guessed.  If they have let the know and then ask them if they want to play again.
            //If the guessWord matches the solved word, tell the user they've won.
 

            if(shownWord==gameWord){


                //Tell the user they won and show the game word.
                labelStatus.textContent=`You won! The word was '${gameWord}'`;
                labelAsk.style.opacity = 100;
    
            };


  

        } else {

            labelStatus.textContent = "Bad guess! Try again!"
            

            //Decrement the count
            guessCount = guessCount-1;
            //console.log(guessCount);
            labelNumTurnsLeft.textContent = guessCount;inputLetter.focus(); 

            //This is where I need to check to see if the turns left is 0.  If so, tell you user, they lost.
            if (guessCount == 0)  {
            //If the count is 0 the user has to pick if they want to either play again or quit.
            labelStatus.textContent=`You lost! The word was '${gameWord}'`;
            //console.log(`You've run out of turns! The word was ${gameWord}`);
            labelAsk.style.opacity = 100;
            //endGame();
            };
        };    

    } else {  };
};


//start game
//guessMatch(gameWord);

btnStartGame.addEventListener('click',function(e) {
    e.preventDefault();
    //validate that the user has entered in only letters
    
    const isValidInput = checkForLettersOnly(inputLetter.value);
    console.log('Checking for letters only is '+isValidInput);
    
    try {
    if (inputLetter.value=="") throw "You didn't enter a letter. Please try again.";
    if (isValidInput == false) throw "Invalid input. Please enter a letter.";
    guessMatch(guessWord);
    }
    catch(e){
        labelStatus.textContent=e;
    };
    

    
    


});

btnYes.addEventListener('click', function(e){
    //resets for a new game
    labelNumTurnsLeft.textContent = 10;
    labelNumTries.textContent = 0;
    labelGuessWord.textContent = '???';
    labelStatus.textContent = 'Enter a letter and press the button. Good Luck!';
    gameWord = pickWord();
    guessWord =  gameWord;
    solvedWord = '-';
    shownWord = '';
    guessCount = 10;
    tries = 0;
    labelAsk.style.opacity = 0;

});

btnNo.addEventListener('click', function(e){
    labelStatus.textContent = 'Please come back and play again another time!';
});