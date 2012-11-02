describe("A tile", function() {
	it("should have a row and a column", function() {
		var tile = new Tile('a', 2, 3, null);

		expect(tile.row).toBe(2);
		expect(tile.column).toBe(3);
	});

	it("should have a letter", function() {
		var tile = new Tile('a', 2, 3, null);

		expect(tile.letter).toEqual('a');
	});

	it("should have no owner after creation", function() {
		var tile = new Tile('a', 2, 3, null);

		expect(tile.owner).toBe(null);
	});

	it("should be defended with 4 tiles around it of the same owner", function() {
		var board = new Board(3, 3);

		board.tiles[1][1].owner = 0;

		board.tiles[0][1].owner = 0;
		board.tiles[2][1].owner = 0;
		board.tiles[1][0].owner = 0;
		board.tiles[1][2].owner = 0;

		expect(board.tiles[1][1].isDefended()).toBe(true);
	});

	it("should not be defended with 4 tiles around it of different owners", function() {
		var board = new Board(3, 3);

		board.tiles[1][1].owner = 0;

		board.tiles[0][1].owner = 1;
		board.tiles[2][1].owner = 2;
		board.tiles[1][0].owner = 3;
		board.tiles[1][2].owner = 4;

		expect(board.tiles[1][1].isDefended()).toBe(false);
	});

	describe("should be able to get its adjacent tiles", function() {
		var board;

		it("when there are no adjacent tiles", function() {
			board = new Board(1, 1);

			var neighbors = board.tiles[0][0].getAdjacentTiles();

			expect(neighbors).not.toBe(null);
			expect(neighbors.length).toBe(0);
		});

		it("when the tile is in the corner", function() {
			board = new Board(2, 2);

			var neighbors = board.tiles[0][0].getAdjacentTiles();

			expect(neighbors).not.toBe(null);
			expect(neighbors.length).toEqual(2);

			expect(neighbors).toContain(board.getTileAtPosition(0, 1));
			expect(neighbors).toContain(board.getTileAtPosition(1, 0));

			board.tiles[1][1].getAdjacentTiles();

			expect(neighbors).not.toBe(null);
			expect(neighbors.length).toEqual(2);

			expect(neighbors).toContain(board.getTileAtPosition(0, 1));
			expect(neighbors).toContain(board.getTileAtPosition(1, 0));
		});

		it("when the tile is in the center", function() {
			board = new Board(3, 3);

			var neighbors = board.tiles[1][1].getAdjacentTiles();

			expect(neighbors).not.toBe(null);
			expect(neighbors.length).toEqual(4);

			expect(neighbors).toContain(board.getTileAtPosition(0, 1));
			expect(neighbors).toContain(board.getTileAtPosition(2, 1));
			expect(neighbors).toContain(board.getTileAtPosition(1, 0));
			expect(neighbors).toContain(board.getTileAtPosition(1, 2));
		});
	});
});