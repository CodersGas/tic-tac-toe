/* form functionality*/

/************** ALL QUERY SELECTORS ***************/
const computer_form = document.querySelector(".computer-form");
const friend_form = document.querySelector(".friend-form");
const computerBtn = document.querySelector(".computer-btn");
const playerBtn = document.querySelector(".player-btn");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const mainMenuBtn = document.querySelector(".menu");
const grid_selector = document.querySelector(".tic-tac-toe-grid");

/***********  Players details *************/
var player1 = {
    name: "",
    marker: "",
}

var player2 = {
    name: "",
    marker: "",
}

/*********** ATTRIBUTES HAVING NONE DISPLAY PROPERTY AT START ***************/
computer_form.style.display = "none";
friend_form.style.display = "none";
resetBtn.style.display = "none";
mainMenuBtn.style.display = "none";


/*************** ALL EVENT LISTENER UTILITIES ***************/

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
startBtn.addEventListener('click', () =>{
    if(document.querySelector(".player1-name").value === "" || 
       (document.querySelector(".player1-mark").value !== "x" && document.querySelector(".player1-mark").value !== "o") ||
       document.querySelector(".player2-name").value === "" || 
       (document.querySelector(".player2-mark").value !== "x" && document.querySelector(".player2-mark").value !== "o")){
           
        alert("Enter valid names and marker values!");
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

resetBtn.addEventListener("click", () =>{
    document.querySelector(".tic-tac-toe-grid").innerHTML = "";
    document.querySelector(".alert-message").innerHTML = "";
    document.querySelector("h1").innerHTML = "let's begin";
    document.querySelector(".tic-tac-toe-grid").appendChild(boardCreationAndMarkerSetting.createBoard());
    boardCreationAndMarkerSetting.set();
});

mainMenuBtn.addEventListener("click", () =>{
    document.querySelector(".player1-name").value = "";
    document.querySelector(".player1-mark").value = "";
    document.querySelector(".player2-name").value = "";
    document.querySelector(".player2-mark").value = "";
    location.reload();
});

/*********** BOARD CREATION AND MARKER SETTING UTILITY ************/

let boardCreationAndMarkerSetting = {
    createBoard : () =>{
        var N_size = 3;
        var board = document.createElement("table");
    
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
        var count = 0;

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

/******** UTILITY FOR CHECKING WINNER AND DRAW **********/

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
        var gotWinner = false;

        if(array[0][0] === marker && array[1][1] === marker && array[2][2] === marker){
            gotWinner = true;
            return gotWinner;
        }
    
        if(array[0][2] === marker && array[1][1] === marker && array[2][0] === marker){
            gotWinner = true;
            return gotWinner;
        }
        
        for(var i = 0; i < 3; i++){
    
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