function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

(function() {
  console.log("starting up");
  $( "#ChessBoard" ).css( "border", "3px solid white" );


  //=========================
  // Draw the chess grid.
  //=========================
  var rows = "8";
  var columns = "8";
  var board = $( "#ChessBoard" );

  var colToLetter = function(col){
    return ("abcdefgh")[col]
  }

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

      colLetter = colToLetter(c);

      board.append('<div id="grid' + '-' + colLetter + (8-r) + '" class="grid ' +col +'" ondrop="drop(event)" ondragover="allowDrop(event)" />');



      i++;
    }
  }

  drawPawns = function(row, colour) {

    for( i = 0 ; i<8 ; i++ ){
      //Find the grid div
      squareName = "#grid-" + colToLetter(i) + row;
      square = board.find( squareName );

      //add an image of the right colour
      name = colour + 'P';
      square.prepend('<img id="' + name + (i+1) + '" src="./pieces/' + name + '.png" class = "piece" draggable="true"  ondragstart="drag(event)" />');

    }

  }

  

  //Draw the white pieces
  drawPawns(2, "w");

  drawPawns(7, "b");

  //Draw the black pieces


  //Drag and drop code


})();
