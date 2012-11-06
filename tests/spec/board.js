describe("A board", function() {
	var board;

	beforeEach(function() {
		board = new Board(5, 6);
	});

	it("should have rows and columns", function() {
		expect(board.rows).toEqual(5);
		expect(board.columns).toEqual(6);
	});

	describe("should populate a board with tiles", function() {
		it("when no letters are specified", function() {
			expect(board.tiles.length).toEqual(5);

			for (var r = 0; r < board.tiles; r++) {
				expect(board.tiles[r].length).toEqual(6);

				for (var c = 0; c < board.tiles; c++) {
					expect(board.tiles[r][c]).not.toBe(null);
				}
			}
		});

		it("when letters are specified", function() {
			board = new Board(2, 2, "abcd");

			expect(board.tiles[0][0].letter).toEqual('A');
			expect(board.tiles[0][1].letter).toEqual('B');
			expect(board.tiles[1][0].letter).toEqual('C');
			expect(board.tiles[1][1].letter).toEqual('D');
		});
	});

	describe("when letters are specified", function() {
		it("should convert the letters to uppercase", function() {
			board = new Board(2, 2, "abcd");

			expect(board.tiles[0][0].letter).toEqual('A');
			expect(board.tiles[0][1].letter).toEqual('B');
			expect(board.tiles[1][0].letter).toEqual('C');
			expect(board.tiles[1][1].letter).toEqual('D');
		});

		it("should throw an exception when letters do not match board size", function() {
			var creationSmall = function() {
				board = new Board(2, 2, "abc");
			};

			var creationBig = function() {
				board = new Board(2, 2, "abcde");
			};

			expect(creationSmall).toThrow();
			expect(creationBig).toThrow();
		});
	});

	describe("should get the tile", function() {
		it("for a valid row and invalid column", function() {
			expect(board.getTileAtPosition(0, -1)).toBe(null);
			expect(board.getTileAtPosition(0, 6)).toBe(null);
		});

		it("for a invalid row and valid column", function() {
			expect(board.getTileAtPosition(-1, 0)).toBe(null);
			expect(board.getTileAtPosition(5, 0)).toBe(null);
		});

		it("for a invalid row and invalid column", function() {
			expect(board.getTileAtPosition(-1, -1)).toBe(null);
			expect(board.getTileAtPosition(5, 6)).toBe(null);
		});

		it("for a valid row and valid column", function() {
			expect(board.getTileAtPosition(0, 0)).not.toBe(null);
			expect(board.getTileAtPosition(0, 0)).toEqual(board.tiles[0][0]);

			expect(board.getTileAtPosition(3, 2)).not.toBe(null);
			expect(board.getTileAtPosition(3, 2)).toEqual(board.tiles[3][2]);

			expect(board.getTileAtPosition(4, 5)).not.toBe(null);
			expect(board.getTileAtPosition(4, 5)).toEqual(board.tiles[4][5]);
		});
	});

	describe("should calculate the score", function() {
		beforeEach(function() {
			board = new Board(2, 2, "cats");
		});

		it("when no players own any tiles", function() {
			var move = new Move([
				{row: 0, column: 0},
				{row: 0, column: 1},
				{row: 1, column: 0},
			]); // cat

			var playerIndex = 0;

			var scoreChanges = board.getScoreChangesForMove(playerIndex, move);

			expect(scoreChanges).toEqual({
				0: { changed: 3 }
			});
		});
	});

	describe("should update the board from a move", function() {
		beforeEach(function() {
			board = new Board(2, 2, "cats");
		});

		it("that will cause just owner changes", function() {
			var move = new Move([
				{row: 0, column: 0},
				{row: 0, column: 1},
				{row: 1, column: 0},
				{row: 1, column: 1}
			]); // cats

			var player = 0;

			board.play(player, move);

			for (var row = 0; row < board.rows; row++) {
				for (var column = 0; column < board.columns; column++) {
					expect(board.tiles[row][column].owner).toEqual(player);
				}
			}
		});

		it("that will cause a tile to become defended", function() {
			var move = new Move([
				{row: 0, column: 0},
				{row: 0, column: 1},
				{row: 1, column: 0}
			]); // cat

			var player = 0;

			board.play(player, move);

			var defendedTile = board.getTileAtPosition(0, 0); // c

			expect(defendedTile.isDefended()).toEqual(true);
		});

		it("that will cause a defended tile's owner to not change", function() {
			var move = new Move([
				{row: 0, column: 0},
				{row: 0, column: 1},
				{row: 1, column: 0}
			]); // cat

			board.play(0, move);

			move = new Move([
				{row: 0, column: 0},
				{row: 0, column: 1},
				{row: 1, column: 0},
				{row: 1, column: 1}
			]); // cats

			board.play(1, move);

			var defendedTile = board.getTileAtPosition(0, 0); // c

			expect(defendedTile.isDefended()).toEqual(false);
			expect(defendedTile.owner).toEqual(0);
		});
	});
});