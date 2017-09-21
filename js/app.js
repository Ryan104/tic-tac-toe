$(document).ready(function(){
	console.log('Document is ready');

	let moveCount = 0; // count turn number

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

});



// The game can curently be broken by clicking really fast sometimes...
