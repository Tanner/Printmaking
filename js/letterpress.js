var Letterpress = function() {
	var board = new Board(5, 5);
};

var Board = function(rows, columns) {
	this.rows = rows;
	this.columns = columns;

	this.tiles = [];

	for (var r = 0; r < rows; r++) {
		this.tiles[r] = [];

		for (var c = 0; c < columns; c++) {
			this.tiles[r][c] = new Tile(null, r, c, this);
		}
	}



	this.getTileAtPosition = function(row, column) {
		if (row < 0 || column < 0) {
			return null;
		} else if (row > this.rows || column > this.columns) {
			return null;
		}

		return this.tiles[row][column];
	};
};

var Tile = function(letter, row, column, board) {
	this.board = board;

	this.row = row;
	this.column = column;

	this.letter = letter;
	this.owner = null;

	function getAdjacentTiles() {
		var neighbors = [];

		neighbors.append(getTileAtPosition(this.row - 1, this.column));
		neighbors.append(getTileAtPosition(this.row, this.column - 1));
		neighbors.append(getTileAtPosition(this.row, this.column + 1));
		neighbors.append(getTileAtPosition(this.row + 1, this.column));

		return neighbors;
	}
};