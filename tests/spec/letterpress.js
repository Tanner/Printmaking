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

	it("should start the game with the first player", function() {
		var letterpress = new Letterpress(board, players);

		expect(letterpress.getCurrentPlayer()).toEqual(players[0]);
	});

	describe("should move to the next player after a turn", function() {
		var letterpress;

		beforeEach(function() {
			letterpress = new Letterpress(board, players);
		});

		it("when the current player is the first player", function() {
			expect(letterpress.getCurrentPlayer()).toEqual(players[0]);

			letterpress.play(null);

			expect(letterpress.getCurrentPlayer()).toEqual(players[1]);
		});

		it("when the current player is the last player", function() {
			letterpress.currentPlayerIndex = 1;

			expect(letterpress.getCurrentPlayer()).toEqual(players[1]);

			letterpress.play(null);

			expect(letterpress.getCurrentPlayer()).toEqual(players[0]);
		});
	});

	it("should not allow you to play an invalid move", function() {
		var move = new Move([
			{row: 0, column: 0}
		]);

		var letterpress = new Letterpress(board, players);

		expect(letterpress.play(move)).toBe(false);
	});
});