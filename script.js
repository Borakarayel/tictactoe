//eventlistener (submit) for form

//evetnlisteners (click) to each box


//2.initilize game

//3.check game mode

//4.set win conditions

//determine current player

//after each move, check win else set active other player

//human vs human, next easyAI, next hardAI 

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    
    [0,3,6],
    [1,4,7],
    [2,5,8],
    
    [6,4,2],
    [0,4,8]
]


const form = document.querySelector("#myForm");
const newGameBtn = document.querySelector('#restartBtn');
const resetGame = document.querySelector('#resetBtn');

newGameBtn.addEventListener('click', () => {
    window.location.reload()
})

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

const resetDOM = () => {
    document.querySelectorAll('.box').forEach(box => {
        box.className = "box";
        box.textContent = ""
         
    });
}
const addEventListenerToGameBoard = (data) => {
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', (event) => {
            playMove(event.target, data)
        });
         
    });
    resetGame.addEventListener('click', () => {
        initializeVariables(data);
        resetDOM();
        adjustDOM('displayTurn', `${data.player1Name}'s turn` )

    })
};

const initializeGame = (data) => {
    //initialize game variables
    adjustDOM('displayTurn', `${data.player1Name}'s turn` )
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
    console.log(box, data);

    //check end conditions
    if(endConditions(data)){
       return true;
    }

    //change current player
    //change the dom, and change data.currentplayer
    if(data.choice === 0){
        changePlayer(data);
    } else if(data.choice === 1){
    //easy AI
    easyAiMove(data);
    data.currentPlayer = "X";

    //Changeback to player1 

};
};

const endConditions = (data) => {
    //3 potential options,
    //winner
    //tie
    //not over
    if(checkWinner(data)){
        //adjust the DOM to win
        let winnerName = data.currentPlayer === "X" ? data.player1Name : data.player2Name;
        adjustDOM('displayTurn', winnerName + " has won the game!");
        return true;
    } else if (data.round === 9){
        //adjust the DOM to tie
        adjustDOM('displayTurn', "It's a Tie");
        gameOver = true;
        return true;
    }
    return false
};

const checkWinner = (data) => {
     let result = false;
     winningConditions.forEach((condition) => {
        if(
            data.board[condition[0]] === data.board[condition[1]] && data.board[condition[1]] === data.board[condition[2]]
            ){
        data.gameOver = true;
        result = true;
     }
     });
     return result;
};

const adjustDOM = (className, textContent) => {
    const elem = document.querySelector(`.${className}`)
    elem.setAttribute('display', 'block');
    elem.textContent = textContent;
};

const changePlayer = (data) => {
    data.currentPlayer = data.currentPlayer === "X" ? "O":"X"
    //adjust the DOM
    let displayTurnText = data.currentPlayer === "X" ? data.player1Name : data.player2Name
    adjustDOM('displayTurn', `${displayTurnText}'s turn` )
};

const easyAiMove = (data) => {
    changePlayer(data);
    data.round++;
    let availableSpaces = data.board.filter(
        (space) => space !== "X" && space !== "O");
    let move = 
    availableSpaces[Math.floor(Math.random()*availableSpaces.length)];
    console.log(move);
    data.board[move] = data.player2;

    setTimeout(() => { 
    let box = document.getElementById(`${move}`);
    box.textContent = data.player2;
    box.classList.add("player2");}, 20)
    if (endConditions(data)){
        return; 
    }
}; 




