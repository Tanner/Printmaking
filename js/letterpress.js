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
		} else if (row >= this.rows || column >= this.columns) {
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

	this.isDefended = function() {
		var neighbors = this.getAdjacentTiles();

		if (neighbors.length == 4) {
			// Ensure all neighbors are the same owner as this tile
			for (var i in neighbors) {
				if (neighbors[i].owner != this.owner) {
					return false;
				}
			}

			return true;
		} else {
			return false;
		}
	}

	this.getAdjacentTiles = function() {
		var neighbors = [];

		function addNeighbor(row, column) {
			var tile = board.getTileAtPosition(row, column);

			if (tile != null) {
				neighbors.push(tile);
			}
		}

		addNeighbor(this.row - 1, this.column);
		addNeighbor(this.row, this.column - 1);
		addNeighbor(this.row, this.column + 1);
		addNeighbor(this.row + 1, this.column);

		return neighbors;
	}
};