describe("A Letterpress game", function() {
	var board, players;

	beforeEach(function() {
		board = new Board(5, 5);

		players = [];
		players.push(new Player("Tanner", "#F00"));
		players.push(new Player("Buzz", "#0F0"));
	});

	it("should throw an exception with less than two players", function() {
		function createGame() {
			var letterpress = new Letterpress(board, []);
		}

		expect(createGame).toThrow();
	});

	it("should not throw an exception with two players or more", function() {
		function createGame() {
			var letterpress = new Letterpress(board, players);
		}

		expect(createGame).not.toThrow();
	});
});