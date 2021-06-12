var startGame = "X";
var playerOneScore = 0;
var playerTwoScore = 0;
var b1 = $("#one");
var b2 = $("#two");
var b3 = $("#three");
var b4 = $("#four");
var b5 = $("#five");
var b6 = $("#six");
var b7 = $("#seven");
var b8 = $("#eight");
var b9 = $("#nine");

$(".button").on("click", function() {
	var buttonId = this.id;

	if ($("#"+buttonId).html() === "") {
		if (startGame === "X") {
			$("#"+buttonId).html(startGame);
			$("#"+buttonId).addClass("pressedX");
			startGame = "O";
		} else {
			$("#"+buttonId).html(startGame);
			$("#"+buttonId).addClass("pressedO");
			startGame = "X";
		}
	}

	animatePress(buttonId);
	checkWinner();

});

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
}

function equals3(a, b, c) {
	return a == b && b == c && a != "";
}

function checkResult() {
	let winner = null;
	if (equals3(b1.html(), b2.html(), b3.html())) {
		winner = b1.html();
	}

	if (equals3(b4.html(), b5.html(), b6.html())) {
		winner = b4.html();
	}

	if (equals3(b7.html(), b8.html(), b9.html())) {
		winner = b7.html();
	}

	if (equals3(b1.html(), b5.html(), b9.html())) {
		winner = b1.html();
	}

	if (equals3(b3.html(), b5.html(), b7.html())) {
		winner = b3.html();
	}

	if (equals3(b1.html(), b4.html(), b7.html())) {
		winner = b1.html();
	}

	if (equals3(b2.html(), b5.html(), b8.html())) {
		winner = b2.html();
	}

	if (equals3(b3.html(), b6.html(), b9.html())) {
		winner = b3.html();
	}

	if (b1.html()!="" && b2.html()!="" && b3.html()!="" && b4.html()!="" && b5.html()!="" && b6.html()!="" && b7.html()!="" && b8.html()!="" && b9.html()!="") {
		if (winner == null) {
			winner = "Draw";
		}
	}

	return winner;
}

function checkWinner() {
	let result = checkResult();
	console.log(result);
	if (result == "X") {
		playerOneWins();
	} else if (result == "O") {
		playerTwoWins();
	} else if (result == "Draw") {
		draw();
	}
}

function playerOneWins() {
	$(".winner").html("⛳Player One Wins");
	playerOneScore++;
	startOver();
}

function playerTwoWins() {
	$(".winner").html("⛳Player Two Wins");
	playerTwoScore++;
	startOver();
}

function draw() {
	$(".winner").html("Draw! Nobody wins");
	startOver();
}

function startOver() {
	$("#playerOneScore").html(playerOneScore);
	$("#playerTwoScore").html(playerTwoScore);
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