'use strict';


const libraryWords = {

    wordsArray: ['happy', 'cat', 'dog', 'bear'],

};

let randIndexVal;
let gameWord = '';
let guessCount = 10;
let guessWord;
let gameWordLength;
let solvedWord = '-'
let tries = 0;


///////////////////////
//
//  Elements
//  
//////////////////////

const btnStartGame = document.querySelector('.start_game_btn');
const btnYes = document.querySelector('.play_again');
const btnNo = document.querySelector('.dont_play_again');
const labelNumTurnsLeft = document.querySelector('.num_turns_left');
const labelNumTries = document.querySelector('.num_tries');
const labelGuessWord = document.querySelector('.guess_word');
const inputLetter = document.querySelector('.start_form');




const pickWord = function (){

    //picks a random value from the length of the array
    randIndexVal = Math.floor(Math.trunc(Math.random()*libraryWords.wordsArray.length));
    //console.log(randIndexVal);

   
    return libraryWords.wordsArray[randIndexVal];


};

//picks the random word from the library.
gameWord = pickWord();
//console.log(gameWord);

//end game function

const endGame = function(){
    let answer = prompt('Do you want to play again? Y/N');
    if (answer == 'y'){
        guessCount = 10;
        gameWord = pickWord();
        guessMatch(gameWord);
    }else{
        console.log('Thank you for playing!')
    };

    console.log(answer);
};

const matchTrue = function(letter, word){

    let foundIndex = word.indexOf(letter);
    console.log(foundIndex);
    let interimGuessWord = word.replace(letter, '-');

    console.log(interimGuessWord);
    return interimGuessWord;

};




const guessMatch = function (gWord){
    //if the guess count is not 0 do the following:
    if (guessCount > 0){




    let guessLetter = ;

    tries = tries+1;
    console.log(`The number of tries is ${tries}`);

    //is it the initial try?
    if(guessCount == 10 && tries == 1){
        
        guessWord = gameWord;
        //get the length of the guess word.
        gameWordLength = guessWord.length;
        console.log('game word length is '+ gameWordLength);
        //set the solved word.
        solvedWord =  solvedWord.repeat(gameWordLength).concat();
        console.log('Solved word is: '+ solvedWord);

    }else{

    guessWord = gWord;
    };
    console.log(guessWord);
    console.log(guessLetter);

    



        //if the guessWord contains the letter the user entered, decrement the word count by replacing that letter with a '-' character.
     
      

        if (guessWord.includes(guessLetter)){
            console.trace('start trace here');
            console.log('Found letter');
            guessWord = matchTrue(guessLetter,guessWord);
            console.log('The new guess word is '+ guessWord);

            //This is where we want to update the guess word on the web page.



            //decide if the entire word has been guessed.  If they have let the know and then ask them if they want to play again.
            //If the guessWord matches the solved word, tell the user they've won.
 

            if(guessWord==solvedWord){
                console.log(`You won! The word was ${gameWord}`);
                //call the endGame function here
                endGame();
                
    
            }else{


            guessMatch(guessWord);
            
            
            };

  

            

        } else {

            console.log('Bad guess!  Try again!');

            //Decrement the count
            guessCount = guessCount-1;
            console.log(guessCount);
            guessMatch(guessWord);
            
        };    

    } else {
    
        //If the count is 0 the user has to pick if they want to either play again or quit.

        console.log(`You've run out of turns! The word was ${gameWord}`);
        endGame();
        

        
        };
    };


//start game
//guessMatch(gameWord);

inputLetter.addEventListener('submit',function(e) {
    e.preventDefault();

    guessMatch(gameWord);
});