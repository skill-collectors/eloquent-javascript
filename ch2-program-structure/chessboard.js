const chessboard = (size) => {
  for (let row = 1; row <= size; row++) {
    var hashRemainder = row % 2;
    var rowString = "";
    for (let col = 0; col < size; col++) {
      if (col % 2 === hashRemainder) {
        rowString += "#";
      } else {
        rowString += " ";
      }
    }
    console.log(rowString);
  }
};

chessboard(16);
