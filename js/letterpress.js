var Letterpress = function(board, players) {
	this.board = board;
	this.players = players;

	this.currentPlayerIndex = 0;

	if (players.length < 2) {
		throw new Error("Must have at least 2 players.");
	}

	this.play = function(move) {
		this.currentPlayerIndex++;
		this.currentPlayerIndex = this.currentPlayerIndex % this.players.length;
	};

	this.getCurrentPlayer = function() {
		return this.players[this.currentPlayerIndex];
	};
};

var Player = function(name, color) {
	this.name = name;
	this.color = color;
	this.score = 0;
}

var Board = function(rows, columns, letters) {
	this.rows = rows;
	this.columns = columns;

	this.tiles = [];

	if (letters && letters.length != rows * columns) {
		throw new Error("Letters does not match the number of tiles specified.");
	} else if (letters) {
		letters = letters.toUpperCase();
	}

	var letter = null;

	for (var r = 0; r < rows; r++) {
		this.tiles[r] = [];

		for (var c = 0; c < columns; c++) {
			if (letters) {
				letter = letters.substring((r * columns) + c, (r * columns) + c + 1);
			} else {
				letter = String.fromCharCode(Math.random() * (90 - 65) + 65);
			}

			this.tiles[r][c] = new Tile(letter, r, c, this);
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