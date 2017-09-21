$(document).ready(function(){
	console.log('Document is ready');

	let moveCount = 0; // count turn number
	let boardDimension = 3;

	gameState = initialGameState(boardDimension);

	// --- Table Cell Click Listener --- //
	//   players move is marked on gameboard and cell is removed from play
	$('.cell').click(markCell);

	function markCell(event){
		// remove the click listener for this element
		$(this).off();

		// mark board with cat or pig depending on turn
		$(this).addClass((moveCount % 2) ? 'em em-cat' : 'em em-pig');

		// next move
		$('.player').toggleClass('current-player');
		moveCount += 1;

		
		
	}


	// --- Reset Button Click Listener --- //
	$('.reset-game').click(resetGame);

	function resetGame(event){
		console.log('reset');
		moveCount = 0;
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

});

function initialGameState(dimension){
	// dimension is the size of the board ie 3 => 3x3
	let arr = [];
	for (let i=0; i < dimension; i++){
		arr.push([]);
		for (let j=0; j < dimension; j++){
			arr[i].push("");
		}
	}
	return arr;
}



// The game can curently be broken by clicking really fast sometimes...
