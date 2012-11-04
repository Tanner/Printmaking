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
});