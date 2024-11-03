var playerRed = "R";
var playerGreen = "G";
// let player red go first
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var coloumns = 7;
//  when page loads we are going to call the function 
window.onload = function () {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < coloumns; c++) {
            row.push(' ');
            // <div id="0-0" class="tile"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}
function setPiece() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-");
    //  "0-0" ["0","0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerGreen;
    }
    else {
        tile.classList.add("green-piece");
        currPlayer = playerRed;
    }
    r -= 1;  //updating row height for coloumn
    currColumns[c] = r;

    checkWinner();
}
function checkWinner() {
    // check horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < coloumns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // vertialky
    for (let c = 0; c < coloumns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < coloumns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < coloumns; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let Winner = document.getElementById('winner');
    if (board[r][c] == playerRed) {
        Winner.innerHTML = "Red Wins";
    }
    else {
        Winner.innerHTML = "Green Wins";
    }
    gameOver = true;
}