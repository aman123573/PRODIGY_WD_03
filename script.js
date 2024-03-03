const X_CLASS = 'x';
const O_CLASS = 'o';
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let xTurn = true;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    xTurn = true;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setMessage('Player X\'s turn');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setMessage(xTurn ? 'Player X\'s turn' : 'Player O\'s turn');
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass === X_CLASS ? 'X' : 'O';
}


function swapTurns() {
    xTurn = !xTurn;
}

function setMessage(msg) {
    message.innerText = msg;
}

function checkWin(currentClass) {
    return winningCombos.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        setMessage('Draw!');
    } else {
        setMessage(`${xTurn ? "Player X" : "Player O"} wins!`);
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}
