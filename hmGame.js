'use strict';
//Parcel requires for me to import all of the images individually.
const imageUrl10 = new URL(
    './img/hm-10.png',
    import.meta.url
  ).href;
  const imageUrl9 = new URL(
    './img/hm-9.png',
    import.meta.url
  ).href;
  const imageUrl8 = new URL(
    './img/hm-8.png',
    import.meta.url
  ).href;
  const imageUrl7 = new URL(
    './img/hm-7.png',
    import.meta.url
  ).href;
  const imageUrl6 = new URL(
    './img/hm-6.png',
    import.meta.url
  ).href;
  const imageUrl5 = new URL(
    './img/hm-5.png',
    import.meta.url
  ).href;
  const imageUrl4 = new URL(
    './img/hm-4.png',
    import.meta.url
  ).href;
  const imageUrl3 = new URL(
    './img/hm-3.png',
    import.meta.url
  ).href;
  const imageUrl2 = new URL(
    './img/hm-2.png',
    import.meta.url
  ).href;
  const imageUrl1 = new URL(
    './img/hm-1.png',
    import.meta.url
  ).href;



const libraryWords = {

    wordsArray: ['happy', 'cat', 'dog', 'bear', 'gas','tags', 'give', 'mississippi', 'glass', 'garbage', 'play', 'baseball', 'fun', 'battle', 'fun'],

};

let randIndexVal;
let gameWord = '';
let guessCount = 10;
let guessWord;
let gameWordLength;
let solvedWord = '-'
let tries = 0;
let shownWord;
let foundIndex;


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
const gameImage = document.querySelector('.hangman'); 

//require the images
//image.src = require()

//hide the game options section initially

const init = function(){
    gameImage.classList.add('hidden');
    labelAsk.style.opacity = 0;
    inputLetter.focus();
    shownWord = '';
    guessCount = 10;
    labelNumTurnsLeft.textContent = 10;
    tries = 0;
    solvedWord = '-';
    labelGuessWord.textContent = '???';
    labelNumTries.textContent = 0;
    labelLettersPicked.textContent = 'Guessed letters: ';
    labelStatus.textContent = 'Enter a letter and press the button. Good Luck!';
};

init();


const pickWord = function (){

    //picks a random value from the length of the array
    randIndexVal = Math.floor(Math.trunc(Math.random()*libraryWords.wordsArray.length));
   
    return libraryWords.wordsArray[randIndexVal];

};

//picks the random word from the library.
gameWord = pickWord();



const matchTrue = function(letter, word){
      
    foundIndex = word.indexOf(letter);

    let interimGuessWord = word.replace(letter, '-');
    //This is where we want to update the guess word on the web page.
    updateShownWord(foundIndex,letter);

    return interimGuessWord;
    
};

//Defining replacement function to be used in updating the shownWord value.

String.prototype.replaceAt = function(index, replaceLetter) {
    return this.substring(0, index) + replaceLetter + this.substring(index + replaceLetter.length);
};



const updateShownWord = function(index,letter){
    //This is where we want to update the guess word on the web page.
    shownWord = shownWord.replaceAt(index,letter);
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
      return false;
      }
 };



const guessMatch = function (gWord){
    //if the guess count is not 0 do the following:
    if (guessCount > 0){


    let guessLetter = inputLetter.value.toLowerCase();      
    
    //reset the input box
    inputLetter.value = '';

    labelLettersPicked.textContent += guessLetter.toUpperCase()+' , ';

    //increment the number of tries
    tries = tries+1;
    labelNumTries.textContent = tries;

    //is it the initial try?
   
    //If it's the beginning of the game set the interim guessword to the initial game word. Get the length of the game word and then set the shown word to give the user a hint.
    if(guessCount == 10 && tries == 1){
        
        guessWord = gameWord;
        //get the length of the guess word.
        gameWordLength = guessWord.length;

        //set the solved word.
        solvedWord =  solvedWord.repeat(gameWordLength).concat();

        shownWord = solvedWord;
        labelStatus.textContent = 'Game started. Good Luck!';

    }else{

    guessWord = gWord;

    };
    
        //if the guessWord contains the letter the user entered, decrement the word count by replacing that letter with a '-' character.
     
     const keepChecking = function(){ 
        //check to see if the letter is in the word

            //match it to the index and then update the interim guess word.
            guessWord = matchTrue(guessLetter,guessWord);
            
            if (guessWord.includes(guessLetter)){

                keepChecking();  //recursion!  Woot!

            }else{


            return guessWord;

            }
        }
        if (guessWord.includes(guessLetter)){
            //If it is tell the user
            labelStatus.textContent =`Found letter ${guessLetter}! Keep going!`;
            
            keepChecking();

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
            
            //update the image to show the next one in the series.  If it's the first bad guess, unhide the image.
            //for some reason parcel doesn't like doing dynamic html page updates for images unless I use a switch statement. :(
           /*  if (guessCount==10) {
                
                gameImage.classList.remove('hidden');
                gameImage.src = imgUrlArray[guessCount];
                console.log(imgUrlArray[guessCount]);


            }else{

                gameImage.src = `./img/${imgUrlArray[guessCount]}`;
                console.log(`./img/${imgUrlArray[guessCount]}`);

            } */
            switch(guessCount){
                case 10:
                gameImage.classList.remove('hidden');
                gameImage.src = imageUrl10;
                break;
                case 9:
                gameImage.src = imageUrl9;  
                break;
                case 8:
                gameImage.src = imageUrl8;
                break;
                case 7:
                gameImage.src = imageUrl7;
                break;
                case 6:
                gameImage.src = imageUrl6;
                break;
                case 5:
                gameImage.src = imageUrl5;
                break;
                case 4:
                gameImage.src = imageUrl4;
                break;
                case 3:
                gameImage.src = imageUrl3;
                break;
                case 2:
                gameImage.src = imageUrl2;
                break;
                case 1:
                gameImage.src = imageUrl1;          
            }

            //Decrement the count
            guessCount = guessCount-1;

            labelNumTurnsLeft.textContent = guessCount;inputLetter.focus(); 

            //This is where I need to check to see if the turns left is 0.  If so, tell you user, they lost.
            if (guessCount == 0)  {
            //If the count is 0 the user has to pick if they want to either play again or quit.
            labelStatus.textContent=`You lost! The word was '${gameWord}'`;

            labelAsk.style.opacity = 100;

            };
        };    

    } else {  };
};


//start game

btnStartGame.addEventListener('click',function(e) {
    e.preventDefault();
    //validate that the user has entered in only letters
    
    const isValidInput = checkForLettersOnly(inputLetter.value);
    
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

    init();
    gameWord = pickWord();
    guessWord =  gameWord;


});

btnNo.addEventListener('click', function(e){
    labelStatus.textContent = 'Please come back and play again another time!';
});