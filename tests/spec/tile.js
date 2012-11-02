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
});