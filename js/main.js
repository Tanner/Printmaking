var board = new Board(5, 5);

var players = [];
players.push(new Player("Tanner", "#F00"));
players.push(new Player("Buzz", "#0F0"));

var game = new Letterpress(board, players);