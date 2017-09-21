$(document).ready(function(){
	console.log('Document is ready');

	let moveCount = 0; // count turn number

	// Track win condition tallies 
	// This could be refactored into a tidy object constructor
	const dimension = 3;

	let gameState = {
		col_x: arrayOfLength(dimension),
		col_o: arrayOfLength(dimension),
		row_x: arrayOfLength(dimension),
		row_o: arrayOfLength(dimension),
		diag_x: arrayOfLength(2),
		diag_o: arrayOfLength(2),
	};

	initializeTallies(dimension);
	console.log(gameState);


	// --- Table Cell Click Listener --- //
	//   players move is marked on gameboard and cell is removed from play
	//$('.cell').click(markCell);
	$('table').on('click', '.cell.notClicked', markCell);

	function markCell(event){
		// remove the click listener for this element
		// event.preventDefault();
		// $(this).off();

		console.log(event);
		console.log(this);

		$(this).removeClass('notClicked');

		console.log(moveCount);

		// mark board with cat or pig depending on turn
		$(this).addClass((moveCount % 2) ? 'em em-cat' : 'em em-pig');

		// update gamestate talley
		let didWin = modifyGameState(dimension, Number($(this).attr('index')), (moveCount % 2) ? "o" : "x");
		if (didWin) {
			console.log(didWin + " won");
			showWinner(didWin);
		}

		// next move
		$('.player').toggleClass('current-player');
		moveCount += 1;
		
	}


	// --- Reset Button Click Listener --- //
	$('.reset-game').click(resetGame);

	function resetGame(event){
		console.log('reset');
		moveCount = 0;
		console.log(moveCount);
		initializeTallies();
		$('.cell').show();
		$('.player').removeClass('current-player');
		$('#player-x').addClass('current-player');
		$('.cell').removeClass('em em-cat em-pig');
		$('.cell').addClass('notClicked');
		$('table').removeClass('em em-cat em-pig');
		$('.cell').fadeTo(1, 1);


	}


	// --- Check for a win condition --- //

	/*
		(this didnt work)
		Keep track of game state in a 2d matrix/array:
		[[cell1, cell2, cell3], [cell4, cell5, cell6], [cell7, cell8, cell9]]
		each cell can have 3 states, empty, "x", or "o"

	*/

	/*
		(this method works but I borrowed the algorithm from stack overflow)
		For each player, keep a talley of how many moves they have made in
		each row, collumn diagonal. This is the game state. If the tally in
		any of these reaches the dimension of the board, the game is over.
		columns-x = [n-elemnts]
		rows-x = [n-elements]
		diagonals-x = [0, 0] -theres only two diagonals possible
		
		So... determine the row and column of each click and add that to the talley
		if row and collumn are equal(?) this is a diagonal 1 -- HOW to determine diagonal two?? - if row + column = dimension - 1
		

	*/
	// Add to talley for each move
	function modifyGameState(dimension, cellNumber, modifier){
		let row = Math.floor(cellNumber / dimension);
		let column = cellNumber % dimension;
		// is it diagonal
		let diagonal1 = 0;
		let diagonal2 = 0;
		if (row === column){
			console.log('diagonal1');
			diagonal1 += 1;
		} 
		if (row + column === dimension - 1) {
			console.log('diagonal2');
			diagonal2 += 1;
		}
		// Add to talley
		// This should be cleaner with an object
		if (modifier == "x"){
			gameState.col_x[column] += 1;
			gameState.row_x[row] += 1;
			gameState.diag_x[0] += diagonal1;
			gameState.diag_x[1] += diagonal2;
		} else {
			gameState.col_o[column] += 1;
			gameState.row_o[row] += 1;
			gameState.diag_o[0] += diagonal1;
			gameState.diag_o[1] += diagonal2;
		}

		console.log(gameState);
		
		// check if any of the tallies has reached a win point
		if (col_x[column] == dimension || row_x[row] == dimension || diag_x[0] == dimension || diag_x[1] == dimension){
			return "x";
		} else if (col_o[column] == dimension || row_o[row] == dimension || diag_o[0] == dimension || diag_o[1] == dimension){
			return "o";
		} else {
			return false;
		}
	}

	// Display the winner
	function showWinner(winner){
		// hide all the cells
		$('.cell').fadeTo(1, .1);
		// change background of table to winner
		$('table').addClass((winner === "o") ? 'em em-cat' : 'em em-pig')
	}

	// Functions for initializing the game state

	function arrayOfLength(dimension){
		let arr = [];
		for (let i=0; i<dimension; i++){
			arr.push(0);
		}
		return arr;
	}

	function initializeTallies(dimension){
		// Could use for loop to loop through keys
		gameState.col_x = arrayOfLength(dimension);
		gameState.col_o = arrayOfLength(dimension);
		gameState.row_x = arrayOfLength(dimension);
		gameState.row_o = arrayOfLength(dimension);
		gameState.diag_x = arrayOfLength(2);
		gameState.diag_o = arrayOfLength(2);
	}


});





// The game can curently be broken by clicking really fast sometimes...
