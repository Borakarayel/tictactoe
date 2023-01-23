//eventlistener (submit) for form

//evetnlisteners (click) to each box


//2.initilize game

//3.check game mode

//4.set win conditions

//determine current player

//after each move, check win else set active other player

//human vs human, next easyAI, next hardAI 

const form = document.querySelector("#myForm");

form.addEventListener('submit', (event) => {
    //prevvent page refresh
    event.preventDefault();

    //initialize user form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    document.querySelector(".modal-wrapper").setAttribute("hidden", true);
    initializeGame(data);
})

const initializeVariables = (data) => {
    data.choice = +data.choice;
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
}
const addEventListenerToGameBoard = (data) => {
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', (event) => {
            playMove(event.target, data)
        })
         
    })
}

const initializeGame = (data) => {
    //initialize game variables
    initializeVariables(data);

    //add event listeners to the gameboard
    addEventListenerToGameBoard(data)
};

playMove=(box, data) =>{
    //is Game over? if over, dont play
    if (data.gameOver || data.round > 8 ){
        return;
    }
    //check if game box has a letter in it, if so, dont return
    if (data.board[box.id] === "X" || data.board[box.id] === "O"){
        return;
    }
    //Adjust the DOM for player move, and then check win conditions
    data.board[box.id] = data.currentPlayer;
    box.textContent = data.currentPlayer;
    box.classList.add(data.currentPlayer === "X" ? "player1" : "player2");

    //increase the round
    data.round++;
    
};