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
	$('#letterpress').css('width', $('#board').width() + 'px');
}

function createBoard(board) {
	var boardElement = $('<ul class="board">');

	for (var row = 0; row < board.rows; row++) {
		var rowElement = $('<li>');
		var rowList = $('<ul class="row">');

		for (var column = 0; column < board.columns; column++) {
			rowList.append(createTile(board.getTileAtPosition(row, column)));
		}

		rowList.append('</ul>');

		rowElement.append(rowList);
		rowElement.append('</li>');

		boardElement.append(rowElement);
	}

	return boardElement;
}

function createTile(tile) {
	return $('<li class="tile" data-row='+tile.row+' data-column='+tile.column+'>'+tile.letter+'</li>');
}