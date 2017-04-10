;(function() {
console.log("starting up");
$( "#ChessBoard" ).css( "border", "3px solid white" );



var rows = "8";
var columns = "8";
var board = $( "#ChessBoard" );

var i =0;
for(var r = 0; r < rows; r++) {
  for(var c = 0; c < columns; c++) {

    if(c%2 == 0 )
      col = -1
    else
      col = 1

    if(r%2 == 0)
        col = col *-1

  col  = (col == 1) ? 'white' : 'black';


  board.append('<div id="grid' + i + '" class="grid ' +col +'" />');
  i++;
}
}

//   $('#divsholder').html(container);


})();
