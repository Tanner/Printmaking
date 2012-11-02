describe("A Letterpress game", function() {
	var board, players;

	beforeEach(function() {
		board = new Board(5, 5);
		players = [];
	});

	it("should throw an exception with less than two players", function() {
		function createGame() {
			var letterpress = new Letterpress(board, players);
		}

		expect(createGame).toThrow();
	});

	it("should not throw an exception with two players or more", function() {
		players.push(new Player("Buzz", "#000"));
		players.push(new Player("Buzz", "#000"));

		function createGame() {
			var letterpress = new Letterpress(board, players);
		}

		expect(createGame).not.toThrow();
	});
});