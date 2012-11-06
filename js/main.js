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
	var boardElement = $('<table>');

	for (var row = 0; row < board.rows; row++) {
		var tableRow = $('<tr>');

		for (var column = 0; column < board.columns; column++) {
			tableRow.append(createTile(board.getTileAtPosition(row, column)));
		}

		tableRow.append('</tr>');

		boardElement.append(tableRow);
	}

	return boardElement;
}

function createTile(tile) {
	return $('<td><div class="tile" data-row='+tile.row+' data-column='+tile.column+'>'+tile.letter+'</div></td>');
}