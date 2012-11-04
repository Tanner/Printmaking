describe("A move", function() {
	it("should be valid with a play of length two", function() {
		var move = new Move([0, 0]);

		expect(move.valid()).toBe(true);
	});

	it("should be valid with a play with a length greater than two", function() {
		var move = new Move([0, 0, 0]);

		expect(move.valid()).toBe(true);
	});

	it("should be invalid with a play of length less than two", function() {
		var move = new Move([0]);

		expect(move.valid()).toBe(false);
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