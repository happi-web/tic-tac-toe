const gameboard = document.querySelector(".gameboard");

//Computers Functions
//Players Functions
//Scores
let grid = 3;
let currentPlayer = "X";
let board = Array(grid).fill(null).map(() => Array(grid).fill(null));
let gameActive = true; 


//Create a function to make squares on the gameboard
for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {    
        let innerDiv = document.createElement("div");
        innerDiv.setAttribute("style", "display:inline-block;position:static; align-items:center; margin:15px; background-color:white; width: 150px; height:150px; align-items:center");
        gameboard.appendChild(innerDiv);        
        innerDiv.addEventListener("click", () => {
            if (gameActive && !innerDiv.textContent) {
                innerDiv.textContent = currentPlayer;
                board[i][j] = currentPlayer;
                let winner = checkWinner(board);
                if (winner) {
                    alert(`Player ${winner} wins!`);
                    gameActive = false;  // Stop the game  // Announce the winner
                    return;
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
            
        })
        
    }
}

function checkWinner(board) {
    // Check rows
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0]; // Return the winner ("X" or "O")
        }
    }

    // Check columns
    for (let j = 0; j < board.length; j++) {
        if (board[0][j] && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return board[0][j];
        }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    // No winner
    return null;
}



