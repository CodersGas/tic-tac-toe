/* form functionality*/

/***************************************** ALL QUERY SELECTORS ************************************************/
const computer_form = document.querySelector(".computer-play-style");
const methodBtnsDiv = document.querySelector(".method-buttons");
const friend_form = document.querySelector(".friend-form");
const computerBtn = document.querySelector(".computer-btn");
const playerBtn = document.querySelector(".player-btn");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const mainMenuBtn = document.querySelector(".menu");
const grid_selector = document.querySelector(".tic-tac-toe-grid");
const easyBtn = document.querySelector(".easy");
const hardBtn = document.querySelector(".hard");
const easyStart = document.querySelector(".comp-easy");
const hardStart = document.querySelector(".comp-hard");
const easyCompForm = document.querySelector(".easy-computer-form");
const hardCompForm = document.querySelector(".hard-computer-form");

/*****************************************  Players details ****************************************************/
var player1 = {
    name: "",
    marker: "",
}

var player2 = {
    name: "",
    marker: "",
}

/*********************************** ATTRIBUTES HAVING NONE DISPLAY PROPERTY AT START ****************************/
computer_form.style.display = "none";
friend_form.style.display = "none";
resetBtn.style.display = "none";
mainMenuBtn.style.display = "none";
easyCompForm.style.display = "none";
hardCompForm.style.display = "none";


/************************************** ALL EVENT LISTENER UTILITIES ********************************************/

computerBtn.addEventListener('click', (e) =>{
    if(computer_form.style.display == "none"){
        computer_form.style.display = "block";
    }
    else{
        computer_form.style.display = "none";
    }
});

playerBtn.addEventListener('click', () =>{    
    if(friend_form.style.display == "none"){
        friend_form.style.display = "block";
    }
    else{
        friend_form.style.display = "none";   
    }
});

easyBtn.addEventListener("click", () =>{
    if(easyCompForm.style.display == "none"){
        easyCompForm.style.display = "block";
    }
    else{
        easyCompForm.style.display = "none";   
    }
});

hardBtn.addEventListener("click", () =>{
    if(hardCompForm.style.display == "none"){
        hardCompForm.style.display = "block";
    }
    else{
        hardCompForm.style.display = "none";   
    }
});

startBtn.addEventListener('click', () =>{
    if(document.querySelector(".player1-name").value === "" || 
       (document.querySelector(".player1-mark").value !== "x" && document.querySelector(".player1-mark").value !== "o") ||
       document.querySelector(".player2-name").value === "" || 
       (document.querySelector(".player2-mark").value !== "x" && document.querySelector(".player2-mark").value !== "o")){
           
        alert("Enter valid names or marker values!");
    }

    else{

        friend_form.style.display = "none";
        computer_form.style.display = "none";
        playerBtn.style.display = "none";
        computerBtn.style.display = "none";
        
        player1.name = document.querySelector(".player1-name").value;
        player1.marker = document.querySelector(".player1-mark").value;
        player2.name = document.querySelector(".player2-name").value;
        player2.marker = document.querySelector(".player2-mark").value;

        grid_selector.appendChild(boardCreationAndMarkerSetting.createBoard());
        document.querySelector("h1").innerHTML = "Let's Begin";
        boardCreationAndMarkerSetting.set();
    }
});

easyStart.addEventListener("click", () =>{
    if(document.querySelector(".easy-player1-name").value === "" || 
       (document.querySelector(".easy-player1-mark").value !== "x" && document.querySelector(".easy-player1-mark").value !== "o")){

        alert("Enter valid name or marker value!");
    }

    else{
        easyCompForm.style.display = "none";
        methodBtnsDiv.style.display = "none";

        player1.name = document.querySelector(".easy-player1-name").value;
        player1.marker = document.querySelector(".easy-player1-mark").value;


        player2.name = "computer";
        if(player1.marker == "x"){
            player2.marker = "o";
        }
        else{
            player2.marker = "x";
        }

        grid_selector.appendChild(boardCreationAndMarkerSetting.createBoard());
        computer_form.style.display = "none";
        document.querySelector("h1").innerHTML = "Let's Begin";

        let compDataArray = Array(3).fill().map(() => Array(3).fill(0));
        againstComputer.setEasy(compDataArray);
    }
});

hardStart.addEventListener("click", () =>{
    if(document.querySelector(".hard-player1-name").value === "" || 
       (document.querySelector(".hard-player1-mark").value !== "x" && document.querySelector(".hard-player1-mark").value !== "o")){

        alert("Enter valid name or marker value!");
    }

    else{
        hardCompForm.style.display = "none";
        methodBtnsDiv.style.display = "none";

        player1.name = document.querySelector(".hard-player1-name").value;
        player1.marker = document.querySelector(".hard-player1-mark").value;


        player2.name = "computer";
        player2.marker = "x";

        grid_selector.appendChild(boardCreationAndMarkerSetting.createBoard());
        computer_form.style.display = "none";
        document.querySelector("h1").innerHTML = "Let's Begin";

        let hardCompDataArray = Array(3).fill().map(() => Array(3).fill(0));
        againstComputer.setHard(hardCompDataArray);
    }
});


resetBtn.addEventListener("click", () =>{

    if(player2.name !== "computer"){
        document.querySelector(".tic-tac-toe-grid").innerHTML = "";
        document.querySelector(".alert-message").innerHTML = "";
        document.querySelector("h1").innerHTML = "let's begin";
        document.querySelector(".tic-tac-toe-grid").appendChild(boardCreationAndMarkerSetting.createBoard());
        boardCreationAndMarkerSetting.set();
    }

    else{
        document.querySelector(".tic-tac-toe-grid").innerHTML = "";
        document.querySelector(".alert-message").innerHTML = "";
        document.querySelector("h1").innerHTML = "let's begin";
        document.querySelector(".tic-tac-toe-grid").appendChild(boardCreationAndMarkerSetting.createBoard());
        let compDataArray = Array(3).fill().map(() => Array(3).fill(0));    
        againstComputer.setEasy(compDataArray);
    }
});

mainMenuBtn.addEventListener("click", () =>{
    
    document.querySelector(".player1-name").value = "";
    document.querySelector(".player1-mark").value = "";
    document.querySelector(".player2-name").value = "";
    document.querySelector(".player2-mark").value = "";
    document.querySelector(".easy-player1-name").value = "";
    document.querySelector(".easy-player1-mark").value = "";
    document.querySelector(".hard-player1-name").value = "";
    location.reload();
});

/*********************************** BOARD CREATION AND MARKER SETTING UTILITY ***********************************/

let boardCreationAndMarkerSetting = {
    createBoard : () =>{
        let N_size = 3;
        let board = document.createElement("table");
    
        for(var i = 0; i < N_size; i++){
          var row = document.createElement("tr");
          row.classList.add(i);
          board.appendChild(row);
        
          for(var j = 0; j < N_size; j++){
            var cell = document.createElement("td");
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.classList.add('cell');
            cell.id = j;
            cell.nodeValue = i;
    
            if(i == j){
                cell.classList.add("diagonal0");
            }
    
            if(j == N_size - i - 1){
                cell.classList.add("diagonal1");
            }
            row.appendChild(cell);
          }
        }
        return board;
    },

    set : () => { 
        let DataArray = Array(3).fill().map(() => Array(3).fill(0));

        let count = 0;

        document.querySelectorAll(".cell").forEach(e => 
            e.addEventListener("click", ()=>{
            
            count = count + 1;
            
            if(document.querySelector(".alert-message").innerHTML === "It's " + player2.name + "'s turn"){
                if(e.innerHTML === ""){
                    e.innerHTML = player2.marker;
                    DataArray[e.parentElement.className][e.id] = player2.marker;

                    if(forWinOrDraw.winCheck(DataArray, player2.marker) === true){
                        forWinOrDraw.winner(player2.marker);
                        return;
                    }

                    if(forWinOrDraw.checkDrawCondition(count)) return;
                    document.querySelector(".alert-message").innerHTML = "It's " + player1.name + "'s turn";
                }
            }

            else if(document.querySelector(".alert-message").innerHTML === "It's " + player1.name + "'s turn" || document.querySelector(".alert-message").innerHTML === ""){
                if(e.innerHTML === ""){
                    e.innerHTML = player1.marker;
                    DataArray[e.parentElement.className][e.id] = player1.marker;

                    if(forWinOrDraw.winCheck(DataArray, player1.marker) === true){
                        forWinOrDraw.winner(player1.marker);
                        return;
                    }
                    
                    if(forWinOrDraw.checkDrawCondition(count)) return;
                    document.querySelector(".alert-message").innerHTML = "It's " + player2.name + "'s turn";
                }
            }
        }));
    },
}

/************************************* PLAYER vs COMPUTER *****************************************************/

let againstComputer = {
    setEasy : (compDataArray) =>{
        
        let count = 0;
        

        if(document.querySelector(".alert-message").innerHTML === "It's " + player2.name + "'s turn"){

            count = count + 1;

            let compRandomRow = Math.round(Math.random() * 2);
            let compRandomColumn = Math.round(Math.random() * 2);

            if((document.querySelector("table").children[compRandomRow]).children[compRandomColumn].innerHTML === ""){
                
                (document.querySelector("table").children[compRandomRow]).children[compRandomColumn].click();
                (document.querySelector("table").children[compRandomRow]).children[compRandomColumn].innerHTML = player2.marker;
            
                compDataArray[compRandomRow][compRandomColumn] = player2.marker;

                if(forWinOrDraw.winCheck(compDataArray, player2.marker) === true){
                    forWinOrDraw.winner(player2.marker);
                    return;
                }

                if(forWinOrDraw.checkDrawCondition(count)) return;
                document.querySelector(".alert-message").innerHTML = "It's " + player1.name + "'s turn";
            }

            else{
                againstComputer.setEasy(compDataArray);
            }
        }

        document.querySelectorAll(".cell").forEach(e => 
            e.addEventListener("click", ()=>{
            
            count = count + 1;

            if(document.querySelector(".alert-message").innerHTML === "It's " + player1.name + "'s turn" || document.querySelector(".alert-message").innerHTML === ""){
                if(e.innerHTML === ""){
                    e.innerHTML = player1.marker;
                    compDataArray[e.parentElement.className][e.id] = player1.marker;

                    if(forWinOrDraw.winCheck(compDataArray, player1.marker) === true){
                        forWinOrDraw.winner(player1.marker);
                        return;
                    }
                    
                    if(forWinOrDraw.checkDrawCondition(count)) return;
                    document.querySelector(".alert-message").innerHTML = "It's " + player2.name + "'s turn";
                    againstComputer.setEasy(compDataArray);
                }
            }
        }));
    },

    setHard : (hardCompDataArray) => {
        let count = 0;
        

        if(document.querySelector(".alert-message").innerHTML === "It's " + player2.name + "'s turn"){

            count = count + 1;
            
            let indexes = bestMove(hardCompDataArray, player2.marker);
            console.log(indexes);

            if((document.querySelector("table").children[indexes.i]).children[indexes.j].innerHTML === ""){
                
                (document.querySelector("table").children[indexes.i]).children[indexes.j].click();
                (document.querySelector("table").children[indexes.i]).children[indexes.j].innerHTML = player2.marker;

                hardCompDataArray[indexes.i][indexes.j] = player2.marker;
                
                if(forWinOrDraw.winCheck(hardCompDataArray, player2.marker) === true){
                    forWinOrDraw.winner(player2.marker);
                    return;
                }

                if(forWinOrDraw.checkDrawCondition(count)) return;
                document.querySelector(".alert-message").innerHTML = "It's " + player1.name + "'s turn";
            }

            else{
                againstComputer.setHard(hardCompDataArray);
            }

        }

        document.querySelectorAll(".cell").forEach(e => 
            e.addEventListener("click", ()=>{
            
            count = count + 1;

            if(document.querySelector(".alert-message").innerHTML === "It's " + player1.name + "'s turn" || document.querySelector(".alert-message").innerHTML === ""){
                if(e.innerHTML === ""){
                    e.innerHTML = player1.marker;
                    hardCompDataArray[e.parentElement.className][e.id] = player1.marker;

                    if(forWinOrDraw.winCheck(hardCompDataArray, player1.marker) === true){
                        forWinOrDraw.winner(player1.marker);
                        return;
                    }
                    
                    if(forWinOrDraw.checkDrawCondition(count)) return;
                    document.querySelector(".alert-message").innerHTML = "It's " + player2.name + "'s turn";
                    againstComputer.setHard(hardCompDataArray);
                }
            }
        }));
        return hardCompDataArray;
    },
}


/************************** MINIMAX ALGORITH IMPLEMENTATION FOR TIC TAC TOE **************************************/
function bestMove(board, marker){
    //AI will make its move
    let bestScore = -Infinity;
    let move;

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            //is the spot available
            if(board[i][j] === 0){
                board[i][j] = marker;
                let score = minimax(board, 0, false);
                console.log("Score : " + score);
                board[i][j] = 0;

                if(score > bestScore){
                    bestScore = score;
                    move = {i, j};
                }
            }
        }
    }

    return move;
}

let score = {
    x : 1,
    o: -1,
    tie: 0,
}

function minimax(board, depth, isMaximizing){
    let result = checkWinner(board);
    
    if(result !== null){
        return score[result];
    }

    if(isMaximizing){
        let bestScore = -Infinity;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                //is spot available
                if(board[i][j] == 0){
                    board[i][j] = player2.marker;
                    let score = minimax(board, depth+1, false);
                    board[i][j] = 0;

                    bestScore = Math.max(score, bestScore);
                }  
            }
        }
        //console.log("bestScore for ai: " + bestScore);
        return bestScore;
    }

    else{
        let bestScore = Infinity;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                //is spot available
                if(board[i][j] == 0){
                    board[i][j] = player1.marker;
                    let score = minimax(board, depth+1, true);
                    board[i][j] = 0;

                    bestScore = Math.min(score, bestScore);
                }  
            }
        }
        //console.log("bestScore for human: " + bestScore);
        return bestScore;
    }
}
//winner checking for ai
function equals3(a, b, c){
    return a == b && b == c && a != 0;
}

function checkWinner(board){
    let winner = null;

    //horizontally
    for(let i = 0; i < 3; i++){
        if(equals3(board[i][0], board[i][1], board[i][2])){
            winner = board[i][0];
        }
    }

    //vertically
    for(let i = 0; i < 3; i++){
        if(equals3(board[0][i], board[1][i], board[2][i])){
            winner = board[0][i];
        }
    }

    //diagonals
    if(equals3(board[0][0], board[1][1], board[2][2])){
        winner = board[0][0];
    }

    if(equals3(board[2][0], board[1][1], board[0][2])){
        winner = board[2][0];
    }

    let openSpots = 0;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] == 0){
                openSpots++;
            }
        }
    }

    if(winner == null && openSpots == 0){
        return 'tie';
    }
    else{
        return winner;
    }
}

/******************************** UTILITY FOR CHECKING WINNER AND DRAW ***************************************/

let forWinOrDraw = {

    checkDrawCondition : (count) =>{
        if(count === 9){
            document.querySelector(".alert-message").innerHTML = "It's a draw. Try Again?";
            resetBtn.style.display = "block";  
            mainMenuBtn.style.display = "block";  
            return true;
        }
        return false;
    },

    winCheck : (array, marker) => {
        let gotWinner = false;

        if(array[0][0] === marker && array[1][1] === marker && array[2][2] === marker){
            gotWinner = true;
            return gotWinner;
        }
    
        if(array[0][2] === marker && array[1][1] === marker && array[2][0] === marker){
            gotWinner = true;
            return gotWinner;
        }
        
        for(let i = 0; i < 3; i++){
    
            //check for all rows
            if(array[i][0] === marker && array[i][1] === marker && array[i][2] === marker){
                gotWinner = true;
                return gotWinner;
            }
            
            //check for all columns
            if(array[0][i] === marker && array[1][i] === marker && array[2][i] === marker){
                gotWinner = true;
                return gotWinner;
            }
        }
    
        return gotWinner;
    }, 

    winner : (marker) => {
        if(marker === "x" && player1.marker === marker){
            document.querySelector(".alert-message").innerHTML = "Winner is " + player1.name + ". Do you want to play again?";
            resetBtn.style.display = "block";
            mainMenuBtn.style.display = "block";
            return;
        }
    
        if(marker === "o" && player1.marker === marker){
            document.querySelector(".alert-message").innerHTML = "Winner is " + player1.name + ". Do you want to play again?";
            resetBtn.style.display = "block";
            mainMenuBtn.style.display = "block";
            return;
        }
    
        if(marker === "x" && player2.marker === marker){
            document.querySelector(".alert-message").innerHTML = "Winner is " + player2.name + ". Do you want to play again?";
            resetBtn.style.display = "block";
            mainMenuBtn.style.display = "block";
            return;
        }
    
        if(marker === "o" && player2.marker === marker){
            document.querySelector(".alert-message").innerHTML = "Winner is " + player2.name + ". Do you want to play again?";
            resetBtn.style.display = "block";
            mainMenuBtn.style.display = "block";
            return;
        }
    }
}