var gameFieldArray = [ [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ] ];

$(document).ready(function () {

  $("#start_game").click(function () {
      var clicks = $(this).data('clicks');
      span = document.getElementById('seconds');
      var counter = 0;
      // Zazeni igro
      if (!clicks) {
          countingInterval = setInterval(function() {
          counter++;
          span.innerHTML = counter;
        },1000);
        randomBombs();
        randomNumberOfBombs();
      // Ustavi/Prekini igro
      } else {
        // clearInterval(countingInterval);
        // span.innerHTML = "00";
        location.reload();
      }
      $(this).data("clicks", !clicks);
  });


});

function isIndexInArray(x, y) {
  if (((x >= 0) && (x < gameFieldArray.length)) && ((y >= 0) && (y < gameFieldArray.length))) {
    return true;
  } else {
    return false;
  }
}

function randomBombs() {
  var numberOfRandomIndexes = 10;
  var i = 0;
  while (i<numberOfRandomIndexes) {
    tmpIndexNumber1 = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
    tmpIndexNumber2 = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
    if (gameFieldArray[tmpIndexNumber1][tmpIndexNumber2] !== "bomb") {
      gameFieldArray[tmpIndexNumber1][tmpIndexNumber2] = "bomb";
      row = tmpIndexNumber1 + 1;
      col = tmpIndexNumber2 + 1;
      $(".minesweeper_field_table > tr:nth-child("+row+") > td:nth-child("+col+")").children().prepend('<i class="fa fa-bomb" aria-hidden="true"></i>');
      i++;
    }
  }
}

function randomNumberOfBombs() {
  try {
    for (var x = 0; x < gameFieldArray.length; x++) {
      for (var y = 0; y < gameFieldArray.length; y++) {
        if (gameFieldArray[x][y] !== "bomb") {
          tmpCountBombs = 0;
          if ((isIndexInArray(x-1, y-1)) && (gameFieldArray[x-1][y-1] == "bomb")) {
            tmpCountBombs ++;
          }
          if ((isIndexInArray(x-1, y)) && (gameFieldArray[x-1][y] == "bomb")) {
            tmpCountBombs ++;
          }
          if ((isIndexInArray(x-1, y+1)) && (gameFieldArray[x-1][y+1] == "bomb")) {
            tmpCountBombs ++;
          }
          if ((isIndexInArray(x, y+1)) && (gameFieldArray[x][y+1] == "bomb")) {
            tmpCountBombs ++;
          }
          if ((isIndexInArray(x+1, y+1)) && (gameFieldArray[x+1][y+1] == "bomb")) {
            tmpCountBombs ++;
          }
          if ((isIndexInArray(x+1, y)) && (gameFieldArray[x+1][y] == "bomb")) {
            tmpCountBombs ++;
          }
          if ((isIndexInArray(x+1, y-1)) && (gameFieldArray[x+1][y-1] == "bomb")) {
            tmpCountBombs ++;
          }
          if ((isIndexInArray(x, y-1)) && (gameFieldArray[x][y-1] == "bomb")) {
            tmpCountBombs ++;
          }
          row = x + 1;
          col = y + 1;
          $(".minesweeper_field_table > tr:nth-child("+row+") > td:nth-child("+col+")").children().prepend(tmpCountBombs);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}
