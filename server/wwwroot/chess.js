function colToLetter(col){
  return ("abcdefgh")[col]
}

var board = $( "#ChessBoard" );

//piece includes colour name eg wP2 or bK
//Row and column are of the form 1 and a, like the position a1 chess board.
//pawnNumber is optional unless the piece is a pawn.
function loadPiece(piece, row, column, pawnNumber=""){


  //Find the grid div
  squareName = "#grid-" + column + row;
  square = board.find( squareName );

  //add an image of the right colour
  square.prepend('<img id="' + piece + pawnNumber + '" src="./pieces/' + piece.substring(0,2) + '.png" class = "piece" draggable="true"  ondragstart="drag(event)" />');
}

function drawPawns (row, colour) {

  for( i = 0 ; i<8 ; i++ ){
    loadPiece(colour + "P",row, colToLetter(i) , i+1);
  }
};


function setTitle(gameNo){
  $("#ChessTitle").text("Chess - Game Number:" + gameNo);
}

function loadState(state, no){
  setTitle(no);


  for(var r = 0; r < 8; r++) {
    for(var c = 0; c < 8; c++) {

      gridCoOrd = colToLetter(c) + (8-r);

      console.log(state.grid[gridCoOrd]);
      piece = (state.grid[gridCoOrd]);

      if(piece != "")
        loadPiece(piece, 8-r, colToLetter(c), piece[3]);
      // square = $(gridName);
      //
      // //empty
      // if(gridContents.length == 0)
      // state.grid[gridName.substring(6)] = ""
      // //Has a piece in it so record it
      // else{
      //   state.grid[gridName.substring(6)] = gridContents[0].id;
      // }

    }
  }


}

function loadDefaultState(gameToLoad){

  //Draw the white pieces
  drawPawns(2, "w");

  //Draw the black pieces
  drawPawns(7, "b");
}


function saveState(){
  state = {};
  state.grid = {};

  for(var r = 0; r < 8; r++) {
    for(var c = 0; c < 8; c++) {

      colLetter = colToLetter(c);
      gridName = "#grid-" + colLetter + (8-r);

      gridContents = $(gridName).children();

      //empty
      if(gridContents.length == 0)
      state.grid[gridName.substring(6)] = ""
      //Has a piece in it so record it
      else{
        state.grid[gridName.substring(6)] = gridContents[0].id;
      }
    }
  }

  //Some other properties i would want to populate in a chess game. Populated with sample data here
  state.currentPlayer = "w";
  state.currentMove = "13";

  // Sending and receiving data in JSON format using POST mothod

  xhr = new XMLHttpRequest();
  var url = "http://localhost:5000/api/chess";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var gameNo = JSON.parse(xhr.responseText);
      setTitle(gameNo);
    }
  }

  var data = JSON.stringify(state);
  xhr.send(data);


}

function checkValidMove(piece, origin, destination){

  //Pawn rules
  if(piece[1] == "P"){
    if(origin[0] != destination[0])
    return false;


    o = parseInt(origin[1]);
    d = parseInt(destination[1]);

    colour = piece[0];

    if(colour == "w"){
      if(!(o+1 == d || o+2 == d))
      return false;
      if(o+2 == d && o != 2)
      return false;
    }

    if(colour == "b"){
      if(!(o-1 == d || o-2 == d))
      return false;
      if(o-2 == d && o != 7)
      return false;
    }
    return true;
  }
  piece = piece[1]; //If it's not a pawn can discard the colour data.


}

//Allow it to be dropped
function dragoverAllowDrop(ev) {
  ev.preventDefault();
}

//Begin dragging
function drag(ev) {
  ev.dataTransfer.setData("parent", ev.target.parentElement.id);
  ev.dataTransfer.setData("text", ev.target.id);
}

//Drop the piece
function drop(ev) {
  ev.preventDefault();
  var piece = ev.dataTransfer.getData("text"); //eg wP6
  var parent = ev.dataTransfer.getData("parent");


  origin = parent.substring(5);             //eg: f4
  destination = ev.target.id.substring(5);  //eg: f5

  if(checkValidMove(piece, origin, destination))
  ev.target.appendChild(document.getElementById(piece));

}

(function() {
  console.log("starting up");
  $( "#ChessBoard" ).css( "border", "3px solid white" );


  //=========================
  // Draw the chess grid.
  //=========================

  var i =0;
  for(var r = 0; r < 8; r++) {
    for(var c = 0; c < 8; c++) {

      if(c%2 == 0 )
      col = -1
      else
      col = 1

      if(r%2 == 0)
      col = col *-1

      col  = (col == 1) ? 'white' : 'black';

      colLetter = colToLetter(c);

      board.append('<div id="grid' + '-' + colLetter + (8-r) + '" class="grid ' +col +'" ondrop="drop(event)" ondragover="dragoverAllowDrop(event)" />');

      i++;
    }
  }


  gameNumb = function(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }("game");

  console.log("gameNumb");
  console.log(gameNumb);

  if(gameNumb === null)
  loadDefaultState();
  else{
    xhr = new XMLHttpRequest();
    var url = "http://localhost:5000/api/chess/" + gameNumb;
    xhr.open( "GET", url, true );
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4){
      if( xhr.status == 200){
        var gameState = JSON.parse(xhr.responseText);
        loadState(gameState, gameNumb);
      }
      else{
        loadDefaultState();
      }
    }
  };

  xhr.send(null);

}



})();
