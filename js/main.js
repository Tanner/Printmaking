var board, players, game;

$(document).ready(function() {
	init();
});

function init() {
	board = new Board(5, 5);

	players = [];
	players.push(new Player("Tanner", "#F00"));
	players.push(new Player("Buzz", "#0F0"));

	game = new Letterpress(board, players);

	$('#board').append(createBoard(board));
}

function createBoard(board) {
	var boardElement = $('<ul class="board">');

	for (var row = 0; row < board.rows; row++) {
		var rowElement = $('<ul class="row">');

		for (var column = 0; column < board.columns; column++) {
			rowElement.append(createTile(board.getTileAtPosition(row, column)));
		}

		rowElement.append('</ul>');

		boardElement.append(rowElement);
	}

	return boardElement;
}

function createTile(tile) {
	return $('<li class="tile" data-row='+tile.row+' data-column='+tile.column+'>'+tile.letter+'</li>');
}