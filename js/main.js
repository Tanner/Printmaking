var board, players, game;

$(document).ready(function() {
	init();
});

function init() {
	board = new Board(5, 5);

	players = [];
	players.push(new Player("Tanner"));
	players.push(new Player("Buzz"));

	game = new Letterpress(board, players);

	for (var i in players) {
		$('#players').append(createPlayer(players[i]));
	}

	$('#board').append(createBoard(board));

	$('#players').append($('<div id="current">'));

	changeCurrentArrowColor(players[game.currentPlayerIndex].color);
	moveCurrentArrowToPlayer(players[game.currentPlayerIndex]);

	game.play(new Move([
		{ row: 0, column: 0 },
		{ row: 1, column: 1 },
		{ row: 0, column: 1 },
		{ row: 1, column: 0 }
	]));

	update();
}

function update() {
	updateBoard();
	updatePlayerScores();
	updateCurrentArrow();
}

function updateBoard() {
	$('.tile').each(function (i) {
		var row = $(this).attr('data-row');
		var column = $(this).attr('data-column');

		var tile = board.getTileAtPosition(row, column);

		if (tile.owner != null) {
			var color = players[tile.owner].color;

			var alpha = tile.isDefended() ? 1.0 : 0.5;

			$(this).css('background', 'rgba('+color.red+', '+color.green+', '+color.blue+', '+alpha+')');
		}
	});
}

function updateCurrentArrow() {
	var currentPlayer = players[game.currentPlayerIndex];

	moveCurrentArrowToPlayer(currentPlayer);
	changeCurrentArrowColor(currentPlayer.color);
}

function updatePlayerScores() {
	for (var i in players) {
		$('.player#'+players[i].name+' span').text(players[i].score);
	}
}

function createBoard(board) {
	var boardElement = $('<table>');

	for (var row = 0; row < board.rows; row++) {
		var tableRow = $('<tr>');

		for (var column = 0; column < board.columns; column++) {
			var tile = createTile(board.getTileAtPosition(row, column));

			tableRow.append($('<td>').append(tile));
		}

		tableRow.append('</tr>');

		boardElement.append(tableRow);
	}

	return boardElement;
}

function createTile(tile) {
	return $('<div class="tile" data-row='+tile.row+' data-column='+tile.column+'>'+tile.letter+'</div>');
}

function createPlayer(player) {
	var element = $('<div class="player" id="'+player.name+'"></div>');
	var color = player.color;

	var bubble = $('<div>').css('border-color', 'rgba('+color.red+', '+color.green+', '+color.blue+', 1)');
	element.append(bubble);

	var score = $('<span>'+player.score+'</span>');
	element.append(score);

	return element;
}

function changeCurrentArrowColor(color) {
	$('#current').css('border-color', 'rgb('+color.red+', '+color.green+', '+color.blue+') transparent transparent transparent');
}

function moveCurrentArrowToPlayer(player) {
	var playerPosition = $('.player#'+player.name)[0].getBoundingClientRect();
	var currentPosition = $('#current')[0].getBoundingClientRect();

	var distanceToMove = ((playerPosition.width / 2) + playerPosition.left) - ((currentPosition.width / 2) + currentPosition.left);

	$('#current').transition({ x: distanceToMove+'px', duration: 500 });
}