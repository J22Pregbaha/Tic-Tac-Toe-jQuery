var startGame = "X";
var playerScore = 0;
var computerScore = 0;
var b1 = $("#one");
var b2 = $("#two");
var b3 = $("#three");
var b4 = $("#four");
var b5 = $("#five");
var b6 = $("#six");
var b7 = $("#seven");
var b8 = $("#eight");
var b9 = $("#nine");

// Board instance
let board = [
	['one', 'two', 'three'],
	['four', 'five', 'six'],
	['seven', 'eight', 'nine']
];

$(".button").on("click", function() {
	var buttonId = this.id;

	if ($("#"+buttonId).html() === "") {
		$("#"+buttonId).html(startGame);
		$("#"+buttonId).addClass("pressedX");
		startGame = "O";

		// For the minimax board instance, show it has been filled by a human
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (board[i][j] == buttonId) {
					board[i][j] = "human";
				}
			}
		}

		// computerPlay();
		minimaxPlay();
	}

	animatePress(buttonId);
	checkWinner();

});

function minimaxPlay() {
	let bestScore = -Infinity;
	let bestMove;
	let bestMoveOnBoard;
	// Is spot available?
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] != 'human' && board[i][j] != 'ai') {
				let buttonId = board[i][j]; // saves the current Id
				board[i][j] = "ai";
				let score = minimax(board, 0, false); // It's minimizing because it's the second player
				console.log(i, j, score);
				board[i][j] = buttonId;
				if (score < 0 && score > bestScore) {
					bestScore = score;
					bestMove = buttonId;
					bestMoveOnBoard = {i,j};
				}
			}
		}
	}
	
	console.log(board);

	// For the minimax board instance, show it has been filled by the ai
	board[bestMoveOnBoard.i][bestMoveOnBoard.j] = "ai";

	// Play the spot with the bestScore
	$("#"+bestMove).html(startGame);
	$("#"+bestMove).addClass("pressedO");

	// Change back to human player
	startGame = "X";
}

let heuristicValues = {
	human: 10, // If the end result is X winning, return 100
	ai: -10, // If the end result is O winning, return -100
	draw: 0 // If the end result is a draw, return 0
};

function minimax(board, depth, isMaximizing) {
	let result = checkBoardResult();
	
	if (result !== null) {
		return heuristicValues[result]; // If there's a winner, check the heuristic value for that outcome and return it
	}

	if (isMaximizing) {
		let bestScore = -Infinity;
		// Is spot available?
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] != 'human' && board[i][j] != 'ai') {
					let buttonId = board[i][j]; // saves the current Id
					board[i][j] = "ai";
					let score = minimax(board, depth - 1, false);

					board[i][j] = buttonId;
					if (bestScore < score) {
						bestScore = score;
					}
				}
			}
		}
		return bestScore;
	} else {
		let bestScore = Infinity;
		// Is spot available?
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] != 'human' && board[i][j] != 'ai') {
					let buttonId = board[i][j]; // saves the current Id
					board[i][j] = "human";
					let score = minimax(board, depth - 1, true);

					board[i][j] = buttonId;
					if (bestScore > score) {
						bestScore = score;
					}
				}
			}
		}
		return bestScore;
	}
}

function animatePress(currentBox) {
	$("#" + currentBox).addClass("pressed");
	setTimeout(function() {
		$("#" + currentBox).removeClass("pressed");
	}, 100);
}

$("#reset").on("click", function() {
	resetGame();
});

function resetGame() {
	$(".button").html("");
	$(".button").removeClass("pressedO");
	$(".button").removeClass("pressedX");
	startGame = "X";

	board = [
		['one', 'two', 'three'],
		['four', 'five', 'six'],
		['seven', 'eight', 'nine']
	];
}

function equals3(a, b, c) {
	return a == b && b == c && a != "";
}

function checkBoardResult() {
	let winner = null;

	// horizontal
	for (let i = 0; i < 3; i++) {
		if (equals3(board[i][0], board[i][1], board[i][2])) {
			winner = board[i][0];
		}
	}

	// Vertical
	for (let i = 0; i < 3; i++) {
		if (equals3(board[0][i], board[1][i], board[2][i])) {
			winner = board[0][i];
		}
	}

	// Diagonal
	if (equals3(board[0][0], board[1][1], board[2][2])) {
		winner = board[0][0];
	}
	if (equals3(board[2][0], board[1][1], board[0][2])) {
		winner = board[2][0];
	}

	let openSpots = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] != 'human' && board[i][j] != 'api') {
				openSpots++;
			}
		}
	}

	if (winner == null && openSpots == 0) {
		winner = 'draw';
	}

	return winner;
}

function checkWinner() {
	let result = checkBoardResult();
	if (result == "human") {
		playerWins();
	} else if (result == "ai") {
		computerWins();
	} else if (result == "draw") {
		draw();
	}
}

function playerWins() {
	$(".winner").html("⛳You Win");
	playerScore++;
	startOver();
}

function computerWins() {
	$(".winner").html("Computer Wins⛳");
	computerScore++;
	startOver();
}

function draw() {
	$(".winner").html("Draw! Nobody wins");
	startOver();
}

function startOver() {
	$("#playerScore").html(playerScore);
	$("#computerScore").html(computerScore);
	setTimeout(function() {
		gameOver();
	}, 300);
}

function gameOver() {
	$("body").addClass("game-over");
	setTimeout(function() {
		$("body").removeClass("game-over");
	}, 200);
	resetGame();
}