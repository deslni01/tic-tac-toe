// Tic Tac Toe!

function players(name, marker) {
	const getPlayerName = () => name;
	const getPlayerMarker = () => marker;

	return {
		getPlayerName,
		getPlayerMarker,
	};
}

let player1 = players('player1', 'o');
let player2 = players('player2', 'x');
let activePlayer = player1;
let gameOver = 'false';

const board = document.querySelector('#board-area');
const gameStatus = document.querySelector('#game-status');
const startBtn = document.querySelector('#submit');
const player1Form = document.querySelector('#player-one');
const player2Form = document.querySelector('#player-two');

function nextPlayer() {
	activePlayer === player1 ? (activePlayer = player2) : (activePlayer = player1);
	gameStatus.innerText = `It's ${activePlayer.getPlayerName()}'s turn.`;
}

const gameBoard = (function () {
	let boardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	const getGameBoard = () => {
		return boardArray;
	};

	return {
		getGameBoard,
	};
})();

const displayController = (function () {
	const emptyGrid = (function () {
		for (let i = 0; i < 9; i++) {
			const cell = document.createElement('div');
			cell.classList.add('cells');
			cell.dataset.key = i;
			cell.innerText = `${gameBoard.getGameBoard()[i]}`;
			board.appendChild(cell);
		}
	})();

	const markPlay = (() => {
		const cells = document.querySelectorAll('.cells');
		let counter = 1;
		cells.forEach((cell) =>
			cell.addEventListener('click', () => {
				if (counter === 9) {
					cell.innerHTML = activePlayer.getPlayerMarker();
					gameStatus.innerText = `It's a tie!`;
					return;
				} else if (
					cell.innerHTML === player1.getPlayerMarker() ||
					cell.innerHTML === player2.getPlayerMarker()
				) {
					return;
				} else {
					cell.innerHTML = activePlayer.getPlayerMarker();
					console.log(`Turn: ${counter}`);
					counter++;
					gameBoard.getGameBoard()[`${cell.dataset.key}`] =
						activePlayer.getPlayerMarker();
					gameFlow._findOutcome();
					if (gameOver === 'false') {
						nextPlayer();
					}
					return;
				}
			})
		);

		const getCounter = () => {
			return counter;
		};

		return getCounter;
	})();

	return {
		emptyGrid,
		markPlay,
	};
})();

const gameFlow = (function () {
	const _findOutcome = () => {
		const winningSets = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],

			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],

			[0, 4, 8],
			[2, 4, 6],
		];

		if (displayController.markPlay() < 9) {
			winningSets.forEach((item, index) => {
				if (
					gameBoard.getGameBoard()[item[0]] === gameBoard.getGameBoard()[item[1]] &&
					gameBoard.getGameBoard()[item[1]] === gameBoard.getGameBoard()[item[2]]
				) {
					gameStatus.innerText = `Winner! ${activePlayer.getPlayerName()} takes it home!`;
					gameOver = 'true';
				}
			});
		}
		return `It's a tie!`;
	};

	return {
		_findOutcome,
	};
})();

startBtn.addEventListener('click', () => {
	if (startBtn.value === 'Start the Game!') {
		player1 = players(`${player1Form.value}`, 'o');
		player2 = players(`${player2Form.value}`, 'x');
		activePlayer = player1;
		gameStatus.innerText = `Alright, ${player1.getPlayerName()}, you're up!`;
		player1Form.value = '';
		player2Form.value = '';
		player1Form.remove();
		player2Form.remove();
		startBtn.value = 'Restart!';
	} else {
		location.reload();
	}
});

/* 
- for the _findOutcome portion, I tried using a for loop with no luck, it just wasn't working until trying the winningSets.forEach loop. Here was previous code:
```javascript
		// if (displayController.markPlay() < 9) {
		// 	for (let i = 0; i < 8; i++) {

		// 		winningSets[i][0] = gameBoard.getGameBoard()[`${winningSets[i][0]}`];
		// 		winningSets[i][1] = gameBoard.getGameBoard()[`${winningSets[i][1]}`];
		// 		winningSets[i][2] = gameBoard.getGameBoard()[`${winningSets[i][2]}`];

		// 		if (
		// 			winningSets[i][0] === winningSets[i][1] &&
		// 			winningSets[i][1] === winningSets[i][2]
		// 		) {
		// 			console.log(`Winner! ${this.activePlayer.getPlayerName()} takes it home!`);
		// 		} else {
		// 			return;
		// 		}
		// 	}
		// }
```
*/
