describe("A player", function() {
	var player;

	beforeEach(function() {
		player = new Player("Tanner");
	});

	it("should have a name", function() {
		expect(player.name).not.toBe(null);
	});

	it("should have a color", function() {
		expect(player.color).not.toBe(null);
	});

	it("should start with a score of zero", function() {
		expect(player.score).toEqual(0);
	});
});