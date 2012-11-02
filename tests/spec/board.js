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
});