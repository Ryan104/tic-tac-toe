$(document).ready(function(){
	console.log('Document is ready');

	// count turn number
	let moveCount = 0;

	// Set the click listener for player moves
	$('.cell').click(markCell);


	// Define the function to be used as a callback in the click listener
	function markCell(event){
		console.log(this);
		$(this).addClass((moveCount % 2) ? 'em em-cat' : 'em em-pig');

		// next move
		$('.player').toggleClass('current-player');
		moveCount += 1;
		// remove the click listener so the cell cant be clicked again
		$(this).off();
	}

});
