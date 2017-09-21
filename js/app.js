$(document).ready(function(){
	console.log('Document is ready');

	let moveCount = 0; // count turn number

	// Track win condition tallies 
	// This could be refactored into a tidy object
	const dimension = 3;
	let col_x;
	let col_o;
	let row_x;
	let row_o;
	let diag_x;
	let diag_o;
	initializeTallies(dimension);
	console.log(col_x);


	// --- Table Cell Click Listener --- //
	//   players move is marked on gameboard and cell is removed from play
	$('.cell').click(markCell);

	function markCell(event){
		// remove the click listener for this element
		$(this).off();

		// mark board with cat or pig depending on turn
		$(this).addClass((moveCount % 2) ? 'em em-cat' : 'em em-pig');

		// update gamestate talley
		let didWin = modifyGameState(dimension, Number($(this).attr('index')), (moveCount % 2) ? "o" : "x");
		if (didWin) {
			console.log(didWin + " won");
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
		initializeTallies();
		$('.player').removeClass('current-player');
		$('#player-x').addClass('current-player');
		$('.cell').removeClass('em em-cat em-pig');
		$('.cell').click(markCell);
	}


	// --- Check for a win condition --- //

	/*
		Keep track of game state in a 2d matrix/array:
		[[cell1, cell2, cell3], [cell4, cell5, cell6], [cell7, cell8, cell9]]
		each cell can have 3 states, empty, "x", or "o"

	*/

	/*
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
			col_x[column] += 1;
			row_x[row] += 1;
			diag_x[0] += diagonal1;
			diag_x[1] += diagonal2;
		} else {
			col_o[column] += 1;
			row_o[row] += 1;
			diag_o[0] += diagonal1;
			diag_o[1] += diagonal2;
		}
		
		if (col_x[column] == dimension || row_x[row] == dimension || diag_x[0] == dimension || diag_x[1] == dimension){
			return "x";
		} else if (col_o[column] == dimension || row_o[row] == dimension || diag_o[0] == dimension || diag_o[1] == dimension){
			return "o";
		} else {
			return false;
		}
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
		col_x = arrayOfLength(dimension);
		col_o = arrayOfLength(dimension);
		row_x = arrayOfLength(dimension);
		row_o = arrayOfLength(dimension);
		diag_x = arrayOfLength(2);
		diag_o = arrayOfLength(2);
	}


});





// The game can curently be broken by clicking really fast sometimes...
