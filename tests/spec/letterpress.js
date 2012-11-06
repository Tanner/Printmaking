describe("A Letterpress game", function() {
	var board, players;

	beforeEach(function() {
		board = new Board(5, 5);

		players = [];
		players.push(new Player("Tanner"));
		players.push(new Player("Buzz"));
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

	describe("should allow you to play", function() {
		it("a valid move", function() {
			var move = new Move([
				{row: 0, column: 0},
				{row: 1, column: 0}
			]);

			var letterpress = new Letterpress(board, players);

			expect(letterpress.play(move)).toBe(true);	
		});
	});

	describe("should not allow you to play", function() {
		it("an invalid move", function() {
			var move = new Move([
				{row: 0, column: 0}
			]);

			var letterpress = new Letterpress(board, players);

			expect(letterpress.play(move)).toBe(false);
		});

		it("the same move twice", function() {
			var move = new Move([
				{row: 0, column: 0},
				{row: 1, column: 0}
			]);

			var letterpress = new Letterpress(board, players);

			expect(letterpress.play(move)).toBe(true);
			expect(letterpress.play(move)).toBe(false);
		});

		it("a prefix of an existing word", function() {
			var move = new Move([
				{row: 0, column: 0},
				{row: 0, column: 1},
				{row: 1, column: 0},
				{row: 1, column: 1}
			]); // cats

			var letterpress = new Letterpress(new Board(2, 2, "cats"), players);

			expect(letterpress.play(move)).toBe(true);

			move = new Move([
				{row: 0, column: 0},
				{row: 0, column: 1},
				{row: 1, column: 0},
			]); // cat

			expect(letterpress.play(move)).toBe(false);
		});
	});

	describe("should update the player scores", function() {
		it("when one player plays", function() {
			var move = new Move([
				{row: 0, column: 0},
				{row: 0, column: 1},
				{row: 1, column: 0},
				{row: 1, column: 1}
			]); // cats

			var letterpress = new Letterpress(new Board(2, 2, "cats"), players);

			letterpress.play(move);

			expect(letterpress.players[0].score).toEqual(4);
		});
	});

	describe("should end the game", function() {
		it("when all the players have passed their turns", function() {
			var letterpress = new Letterpress(board, players);

			letterpress.play(null);
			letterpress.play(null);

			expect(letterpress.isGameOver()).toBe(true);
		});

		it("when all tiles have owners", function() {
			board = new Board(2, 2);
			var letterpress = new Letterpress(board, players);

			board.tiles[0][0].owner = 0;
			board.tiles[0][1].owner = 0;
			board.tiles[1][0].owner = 0;
			board.tiles[1][1].owner = 0;

			expect(letterpress.isGameOver()).toBe(true);
		});
	});
});