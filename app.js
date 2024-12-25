const gameboard = document.querySelector(".gameboard");

//Computers Functions
//Players Functions
//Scores
let grid = 3;
let currentPlayer = "X";

//Create a function to make squares on the gameboard
for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {    
        let innerDiv = document.createElement("div");
        innerDiv.setAttribute("style", "display:inline-block; margin:15px; background-color:white; width: 150px; height:150px; align-items:center");
        gameboard.appendChild(innerDiv);        
        innerDiv.addEventListener("click", () => {
            if (!innerDiv.textContent) {
                innerDiv.textContent = currentPlayer;
                currentPlayer = currentPlayer === "X" ? "O" : "X";  
            }
        })
    }
}



