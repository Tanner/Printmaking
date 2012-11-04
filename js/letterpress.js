var Letterpress = function(board, players) {
	this.board = board;
	this.players = players;

	this.playedWords = [];

	this.currentPlayerIndex = 0;

	if (players.length < 2) {
		throw new Error("Must have at least 2 players.");
	}

	this.play = function(move) {
		if (move) {
			// Make sure that the move is valid first
			if (move.valid(this.board) == false) {
				return false;
			}

			// Check to ensure that the move is not a duplicate word or a prefix
			var word = move.word(board);

			for (var i = 0; i < this.playedWords.length; i++) {
				var otherWord = this.playedWords[i];

				if (word == otherWord) {
					// Word is a duplicate
					return false;
				} else {
					// Check to see if the word is a prefix
					for (var j = 1; j <= otherWord.length; j++) {
						if (word == otherWord.substring(0, j)) {
							// Word is a prefix of an already played word
							return false;
						}
					}
				}
			}

			// Word passes all tests, so we can play it
			this.playedWords.push(word);

			this.board.play(this.currentPlayerIndex, move);
		}

		this.currentPlayerIndex++;
		this.currentPlayerIndex = this.currentPlayerIndex % this.players.length;

		return true;
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

var Move = function(tiles) {
	this.tiles = tiles;

	this.valid = function(board) {
		if (this.tiles.length < 2) {
			return false;
		}

		for (var i = 0; i < this.tiles.length; i++) {
			var tile = this.tiles[i];

			if (board.getTileAtPosition(tile.row, tile.column) == null) {
				return false;
			}

			// Search for duplicates (long way)
			for (var j = i + 1; j < this.tiles.length; j++) {
				var otherTile = this.tiles[j];
				if (tile.row == otherTile.row && tile.column == otherTile.column) {
					return false;
				}
			}
		}

		return true;
	}

	this.word = function(board) {
		if (this.valid(board) != true) {
			return null;
		}

		var word = "";

		for (var i in this.tiles) {
			var tile = this.tiles[i];

			word += board.getTileAtPosition(tile.row, tile.column).letter;
		}

		return word;
	}
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
	}

	this.getScoreChangesForMove = function(playerIndex, move) {
		var changes = {};

		var moveTiles = move.tiles;

		for (var i = 0; i < moveTiles.length; i++) {
			var row = moveTiles[i].row;
			var column = moveTiles[i].column;

			var boardTile = this.tiles[row][column];
			var boardOwner = boardTile.owner;

			if (boardTile.owner != null) {
				// Tile is owned
				if (boardTile.isDefended() == true) {
					// Tile is defended, so owner loses no points
				} else {
					// Tile is not defended, so owner loses points
					if (changes[boardOwner] == undefined) {
						changes[boardOwner] = {};
						changes[boardOwner].changed = 0;
					}
					
					changes[boardOwner].changed--;
				}
			} else {
				// Tile is not owned
				if (changes[playerIndex] == undefined) {
					changes[playerIndex] = {};
					changes[playerIndex].changed = 0;
				}

				changes[playerIndex].changed++;
			}
		}

		return changes;
	}

	this.play = function(playerIndex, move) {
		var moveTiles = move.tiles;

		for (var i = 0; i < moveTiles.length; i++) {
			var row = moveTiles[i].row;
			var column = moveTiles[i].column;

			var boardTile = this.tiles[row][column];
			var boardOwner = boardTile.owner;

			if (boardTile.owner != null) {
				// Tile is owned
				if (boardTile.isDefended() == true) {
					// Tile is defended, so owner loses no points
				} else {
					// Tile is not defended, so owner loses points
					boardTile.owner = playerIndex;
				}
			} else {
				// Tile is not owned
				boardTile.owner = playerIndex;
			}
		}
	}
};

var Tile = function(letter, row, column, board) {
	this.board = board;

	this.row = row;
	this.column = column;

	this.letter = letter;
	this.owner = null;

	this.isDefended = function() {
		var neighbors = this.getAdjacentTiles();

		function onEdge(row, column) {
			if (row == 0 || column == 0) {
				return true;
			}

			if (row == board.rows - 1 || column == board.columns - 1) {
				return true;
			}

			return false;
		}

		function onCorner(row, column) {
			if (row == 0 && column == 0) {
				return true;
			} else if (row == 0 && column == board.columns - 1) {
				return true;
			} else if (row == board.rows - 1 && columns == 0) {
				return true;
			} else if (row == board.rows - 1 && columns == board.columns - 1) {
				return true;
			}

			return false;
		}

		var neighborsRequired = 4;

		if (onCorner(this.row, this.column) == true) {
			neighborsRequired = 2;
		} else if (onEdge(this.row, this.column) == true) {
			neighborsRequired = 3;
		}

		if (neighbors.length == neighborsRequired) {
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