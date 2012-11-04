describe("A move", function() {
	it("should be valid with a play of length two", function() {
		var move = new Move([
			{row: 0, column: 0},
			{row: 0, column: 1}
		]);
		var board = new Board(2, 2, "cats");

		expect(move.valid(board)).toBe(true);
	});

	it("should be valid with a play with a length greater than two", function() {
		var move = new Move([
			{row: 0, column: 0},
			{row: 0, column: 1},
			{row: 1, column: 0},
			{row: 1, column: 1}
		]);
		var board = new Board(2, 2, "cats");

		expect(move.valid(board)).toBe(true);
	});

	it("should be invalid with a play of length less than two", function() {
		var move = new Move([
			{row: 0, column: 0}
		]);
		var board = new Board(2, 2, "cats");

		expect(move.valid(board)).toBe(false);
	});

	describe("should be invalid when the move contains", function() {
		it("duplicate tiles", function() {
			var move = new Move([
				{row: 0, column: 0},
				{row: 0, column: 0}
			]);
			var board = new Board(2, 2, "cats");

			expect(move.valid(board)).toBe(false);
		});

		it("non-existent tiles", function() {
			var move = new Move([
				{row: 0, column: 0},
				{row: -1, column: 0}
			]);
			var board = new Board(2, 2, "cats");

			var board = new Board(2, 2, "cats");

			expect(move.valid(board)).toBe(false);
		});
	});

	it("should extract the word correctly from the board", function() {
		var move = new Move([
			{row: 0, column: 0},
			{row: 0, column: 1},
			{row: 1, column: 0},
			{row: 1, column: 1}
		]);

		var board = new Board(2, 2, "cats");

		expect(move.word(board)).toEqual("CATS");
	});
});