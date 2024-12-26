document.addEventListener("DOMContentLoaded", () => {
    const gameboard = document.querySelector(".gameboard");
    const startButton = document.querySelector("#startGame");
    const restartButton = document.querySelector("#restartButton");
    const playerDisplay = document.querySelector(".player-display");
    const scoreDisplay = document.querySelector(".score-display");

    const GRID = 3; // Grid size
    let currentPlayer = "X";
    let gameActive = true;
    let gameMode;
    let playerX, playerO;
    let scores = { X: 0, O: 0 }; // Scoring system

    // Factory Function
    function Player(name, symbol) {
        return { name, symbol };
    }

    // Start the game
    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", resetGame);

    function startGame() {
        const playerXInput = document.querySelector("#playerXName").value;
        const playerOInput = document.querySelector("#playerOName").value;
        gameMode = document.querySelector("#gameMode").value;

        if (!playerXInput || !playerOInput) {
            alert("Enter the name of the players");
            return;
        }
        playerX = Player(playerXInput, "X");
        playerO = gameMode === "PvC" ? Player("Computer", "O") : Player(playerOInput, "O");

        resetGame();
        initializeBoard();
        updateScores();
    }

    function initializeBoard() {
        gameboard.innerHTML = "";
        board = Array(GRID).fill(null).map(() => Array(GRID).fill(null));

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.addEventListener("click", () => handlePlayerMove(square, i, j));
                gameboard.appendChild(square);
            }
        }
        gameActive = true;
        currentPlayer = "X";
        updatePlayerDisplay();
    }

    function handlePlayerMove(square, row, col) {
        if (!gameActive || square.textContent) {
            return;
        }

        square.textContent = currentPlayer;
        board[row][col] = currentPlayer;

        if (checkWinner()) {
            scores[currentPlayer]++;
            alert(`${getCurrentPlayerName()} wins!`);
            gameActive = false;
            updateScores();
            return;
        }

        if (checkDraw()) {
            alert(`It's a draw!`);
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        // If it's the computer's turn, make a move
        if (gameMode === "PvC" && currentPlayer === "O") {
            makeComputerMove();
        }

        updatePlayerDisplay();
    }

    function makeComputerMove() {
        // Function to check for a winning or blocking move
        function findBestMove(symbol) {
            for (const line of [
                // Rows
                [[0, 0], [0, 1], [0, 2]],
                [[1, 0], [1, 1], [1, 2]],
                [[2, 0], [2, 1], [2, 2]],
                // Columns
                [[0, 0], [1, 0], [2, 0]],
                [[0, 1], [1, 1], [2, 1]],
                [[0, 2], [1, 2], [2, 2]],
                // Diagonals
                [[0, 0], [1, 1], [2, 2]],
                [[0, 2], [1, 1], [2, 0]]
            ]) {
                const [a, b, c] = line;
                const values = [board[a[0]][a[1]], board[b[0]][b[1]], board[c[0]][c[1]]];
                if (values.filter(v => v === symbol).length === 2 && values.includes(null)) {
                    const emptyIndex = values.indexOf(null);
                    return line[emptyIndex]; // Return the empty square
                }
            }
            return null;
        }

        // Check for a winning move first
        let bestMove = findBestMove("O");

        // If no winning move, check for a blocking move
        if (!bestMove) {
            bestMove = findBestMove("X");
        }

        // If no blocking move, pick a random empty square
        if (!bestMove) {
            const emptySquares = [];
            for (let i = 0; i < GRID; i++) {
                for (let j = 0; j < GRID; j++) {
                    if (!board[i][j]) emptySquares.push({ row: i, col: j });
                }
            }
            if (emptySquares.length > 0) {
                const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
                bestMove = [randomMove.row, randomMove.col];
            }
        }

        // Make the move
        if (bestMove) {
            const [row, col] = bestMove;
            const squareIndex = row * GRID + col;
            const square = document.querySelectorAll(".square")[squareIndex];

            square.textContent = currentPlayer;
            board[row][col] = currentPlayer;

            if (checkWinner()) {
                scores[currentPlayer]++;
                alert(`${getCurrentPlayerName()} wins!`);
                gameActive = false;
                updateScores();
                return;
            }

            if (checkDraw()) {
                alert(`It's a draw!`);
                gameActive = false;
                return;
            }

            currentPlayer = "X";
            updatePlayerDisplay();
        }
    }

    function updatePlayerDisplay() {
        if (!playerDisplay) return;
        playerDisplay.textContent = gameActive
            ? `${getCurrentPlayerName()}'s turn (${currentPlayer})`
            : "Game Over";
    }

    function updateScores() {
        if (!scoreDisplay) return;
        scoreDisplay.innerHTML = `Scores: ${playerX.name} (X)  [   ${scores.X}  ]  vs  ${playerO.name} (O)  [  ${scores.O}  ]`;
    }

    function getCurrentPlayerName() {
        return currentPlayer === "X" ? playerX.name : playerO.name;
    }

    function checkWinner() {
        const lines = [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (const line of lines) {
            const [a, b, c] = line;
            if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        return board.flat().every(cell => cell);
    }

    function resetGame() {
        board = Array(GRID).fill(null).map(() => Array(GRID).fill(null));
        gameActive = true;
        currentPlayer = "X";
        initializeBoard();
    }
});
