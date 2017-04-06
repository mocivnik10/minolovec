var gameFieldArray = [ [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ],
                       [ [], [], [], [], [], [], [], [] ] ];

var gameFieldVisited = [ [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ] ];

var gameFieldFlaged = [ [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ],
                      [ [], [], [], [], [], [], [], [] ] ];


var debugMode = false;
var gameStarted = false;

for (var i = 0; i < gameFieldVisited.length; i++) {
  for (var y = 0; y < gameFieldVisited[i].length; y++) {
    gameFieldVisited[i][y] = false;
  }
}
for (var i = 0; i < gameFieldFlaged.length; i++) {
  for (var y = 0; y < gameFieldFlaged[i].length; y++) {
    gameFieldFlaged[i][y] = false;
  }
}

$(document).ready(function () {
  $("#start_game, #start_game_from_modal").click(function () {
      if (!gameStarted) {
        gameStarted = true;
        $("#seconds").timer();
        createHTMLTable();
        if (!debugMode) {
          randomBombs();
        } else {
          debugModeBombs();
        }
        numberOfBombs();
      } else {
        location.reload();
      }
  });
});

function createHTMLTable() {
  // Ustvari Html tabelo 8x8
  var body = document.getElementById('tableWrapper');
  var table = document.createElement('table');
  table.className = "text-center";
  var tbdy = document.createElement('tbody');
  tbdy.className = "minesweeper_field_table";
  for (var x = 0; x < 8; x++) {
      var tr = document.createElement('tr');
      for (var y = 0; y < 8; y++) {
          var td = document.createElement('td');
          var span = document.createElement('span');
          // Dodaj class(za css styling) ter ID da bomo kasneje glede na id
          // vedeli na kateri celici smo oz katero celico je uporabnik kliknil
          td.className = "table-background";
          td.id = x + "_" + y;
          // Dodaj event click ki bo sprozil klic funkcije gameLogic() na td
          td.addEventListener("click", gameLogic);
          td.addEventListener("contextmenu", setTheFlag);
          span.className = "table-element";
          tr.appendChild(td);
          td.appendChild(span);
      }
      tbdy.appendChild(tr);
  }
  table.appendChild(tbdy);
  body.appendChild(table);
}

function isIndexInArray(x, y) {
  // Metoda oz funkcija ki preverja ce obstajajo podani parametri x,y v arrayu
  if (((x >= 0) && (x < gameFieldArray.length)) && ((y >= 0) && (y < gameFieldArray.length))) {
    return true;
  } else {
    return false;
  }
}

function debugModeBombs() {
  x = 0;
  y = 3;
  gameFieldArray[x][y] = "bomb";
  row = x + 1;
  col = y + 1;
  var tmpBombField = $("#" + (x) + "_" + (y));
  tmpBombField.prepend('<i class="fa fa-bomb bomb" aria-hidden="true"></i>');
  x = 3;
  y = 4;
  gameFieldArray[x][y] = "bomb";
  row = x + 1;
  col = y + 1;
  var tmpBombField = $("#" + (x) + "_" + (y));
  tmpBombField.prepend('<i class="fa fa-bomb bomb" aria-hidden="true"></i>');
  x = 2;
  y = 6;
  gameFieldArray[x][y] = "bomb";
  row = x + 1;
  col = y + 1;
  var tmpBombField = $("#" + (x) + "_" + (y));
  tmpBombField.prepend('<i class="fa fa-bomb bomb" aria-hidden="true"></i>');
  x = 4;
  y = 0;
  gameFieldArray[x][y] = "bomb";
  row = x + 1;
  col = y + 1;
  var tmpBombField = $("#" + (x) + "_" + (y));
  tmpBombField.prepend('<i class="fa fa-bomb bomb" aria-hidden="true"></i>');
  x = 1;
  y = 5;
  gameFieldArray[x][y] = "bomb";
  row = x + 1;
  col = y + 1;
  var tmpBombField = $("#" + (x) + "_" + (y));
  tmpBombField.prepend('<i class="fa fa-bomb bomb" aria-hidden="true"></i>');
  x = 6;
  y = 3;
  gameFieldArray[x][y] = "bomb";
  row = x + 1;
  col = y + 1;
  var tmpBombField = $("#" + (x) + "_" + (y));
  tmpBombField.prepend('<i class="fa fa-bomb bomb" aria-hidden="true"></i>');
  x = 4;
  y = 2;
  gameFieldArray[x][y] = "bomb";
  row = x + 1;
  col = y + 1;
  var tmpBombField = $("#" + (x) + "_" + (y));
  tmpBombField.prepend('<i class="fa fa-bomb bomb" aria-hidden="true"></i>');
}

function randomBombs() {
  var numberOfrandomBombs = 10;
  var i = 0;
  while (i<numberOfrandomBombs) {
    // Nastavi dve random stevili - pozicijo x in y v igralnem polju (gameFieldArray)
    tmpIndexNumber1 = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
    tmpIndexNumber2 = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
    // Ce na tej poziciji se ni bombe potem naredi slednje:
    if (gameFieldArray[tmpIndexNumber1][tmpIndexNumber2] !== "bomb") {
      // v array gameFieldArray dodaj na generirano pozicijo "bombo"
      gameFieldArray[tmpIndexNumber1][tmpIndexNumber2] = "bomb";
      // nastavi si vrstico in stolpec (za HTMl tabelo)
      row = tmpIndexNumber1 + 1;
      col = tmpIndexNumber2 + 1;
      // inicializacija polja z bombo
      tmpBombField = $(".minesweeper_field_table > tr:nth-child("+row+") > td:nth-child("+col+")").children();
      // polju pripni bombo vizualno kot ikono
      tmpBombField.prepend('<i class="fa fa-bomb bomb" aria-hidden="true"></i>');
      i++;
    }
  }
}

function numberOfBombs() {
  // Logicno dodajanje stevil ki se pojavljajo okoli bomb
  try {
    // z dvojno for zanko pojdi cez 2D igralno polje - gameFieldArray
    for (var x = 0; x < gameFieldArray.length; x++) {
      for (var y = 0; y < gameFieldArray.length; y++) {
        // Prvo preveri da na trenutni poziciji/polju ni bombe
        if (gameFieldArray[x][y] !== "bomb") {
          // inicializacija za st bomb v okolici polja
          tmpCountBombs = 0;
          // okoli polja na katerem smo trenutno v for zanki preveri se 8 sosednih polj
          // ce vsebujejo bombo - v primeru da vsebujejo to pristej k tmpCountBombs
          // z metodo isIndexInArray pogojujemo da je preverjeno polje v nasem igralnem polju
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
          // inicializacija polja s stevilko
          tmpNumberField = $(".minesweeper_field_table > tr:nth-child("+row+") > td:nth-child("+col+")").children();
          // v polja, ki imajo na sosednjih poljih bombe pripni st bomb ter dodaj class "number"
          // Ostalim pa samo dodaj class "empty"
          if (tmpCountBombs !== 0) {
            // V array na polje iz for zanke vstavimo stevilo bomb na sosednjih poljih
            gameFieldArray[x][y] = "number";
            tmpNumberField.prepend(tmpCountBombs);
            tmpNumberField.addClass("number");
          } else {
            gameFieldArray[x][y] = "empty";
            tmpNumberField.addClass("empty");
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function gameLogic() {
  console.log($(this).attr("id").split("_"));
  clickedPositionArr = $(this).attr("id").split("_");
  x = clickedPositionArr[0];
  y = clickedPositionArr[1];
  if (gameFieldFlaged[x][y] == true) {
    return;
  } else {
    gameFieldVisited[x][y] = true;
    row = x + 1;
    col = y + 1;
    if (gameFieldArray[x][y] == "bomb") {
      $(this).removeClass('table-background');
      $(this).find("span").removeClass('table-element');
      $(this).css('background-color', 'red');
      $("#seconds").timer("pause");
      $('#gameOverModal').modal('show');
      console.log("game over");
    } else if (gameFieldArray[x][y] == "number") {
      $(this).removeClass('table-background');
      $(this).find("span").removeClass('table-element');
      console.log("number clicked");
    } else {
      console.log("clicked: " + x + " " + y);
      $(this).removeClass('table-background');
      $(this).find("span").removeClass('table-element');
      clearEmptyFields(Number(x), Number(y));
    }
  }
  checkWin();
}

function clearEmptyFields(i, j) {
  var rowLimit = gameFieldArray.length-1;
  var columnLimit = gameFieldArray[0].length-1;
  if (!isIndexInArray(i, j)) {
    return;
  }
  gameFieldVisited[i][j] = true;
  for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
    for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
      if(x !== i || y !== j) {
        if (gameFieldVisited[x][y] != true) {
          var tmpField = $("#" + (x) + "_" + (y));
          if (gameFieldArray[x][y] == "number" && gameFieldFlaged[x][y] !== true) {
            gameFieldVisited[x][y] = true;
            tmpField.removeClass('table-background');
            tmpField.find("span").removeClass('table-element');
          } else if (gameFieldArray[x][y] == "empty" && gameFieldFlaged[x][y] !== true) {
            tmpField.removeClass('table-background');
            tmpField.find("span").removeClass('table-element');
            clearEmptyFields(x, y);
          }
        }
      }
    }
  }
}

var flagCounter = 10;
function setTheFlag() {
  clickedPositionArr = $(this).attr("id").split("_");
  x = clickedPositionArr[0];
  y = clickedPositionArr[1];
  var flagField = $("#" + (x) + "_" + (y));
  if (gameFieldVisited[x][y] !== true) {
    if (gameFieldFlaged[x][y] == true) {
      gameFieldFlaged[x][y] = false;
      flagCounter++;
      $(".flags_counter").children().text(flagCounter);
      flagField.find('.flag-field-selector').remove();
    } else {
      gameFieldFlaged[x][y] = true;
      flagCounter--;
      $(".flags_counter").children().text(flagCounter);
      flagField.click(function(){return false;});
      flagField.prepend('<span class="flag-field-selector"><i class="fa fa-flag" aria-hidden="true"></i></span>');
    }
  }
  checkWin();
}

function checkWin() {
  var numberOfBombs = 0;
  var numberOfEmptyFields = 0;
  var countFlagedBombs = 0;
  var countRevealedFields = 0;
  for (var i = 0; i < gameFieldArray.length; i++) {
    for (var j = 0; j < gameFieldArray[i].length; j++) {
      if (gameFieldArray[i][j] == "bomb") {
        numberOfBombs++;
      }
      if (gameFieldArray[i][j] == "empty" || gameFieldArray[i][j] == "number") {
        numberOfEmptyFields++;
      }
    }
  }
  for (var i = 0; i < gameFieldFlaged.length; i++) {
    for (var j = 0; j < gameFieldFlaged[i].length; j++) {
      if (gameFieldFlaged[i][j] == true && gameFieldArray[i][j] == "bomb") {
        countFlagedBombs++;
      }
    }
  }
  for (var i = 0; i < gameFieldVisited.length; i++) {
    for (var j = 0; j < gameFieldVisited[i].length; j++) {
      if (gameFieldVisited[i][j] == true) {
        countRevealedFields++;
      }
    }
  }
  console.log("Bombs: " + numberOfBombs);
  console.log("Empty fields: " + numberOfEmptyFields);
  console.log("Flaged: " + countFlagedBombs);
  console.log("Revealed: " + countRevealedFields);
  if (numberOfBombs == countFlagedBombs && numberOfEmptyFields == countRevealedFields) {
    $("#seconds").timer("pause");
    $('#gameWinModal').modal('show');
  }
}

function revealGame() {
  for (var i = 0; i < gameFieldArray.length; i++) {
    for (var j = 0; j < gameFieldArray.length; j++) {
      var tmpField = $("#" + (i) + "_" + (j));
      tmpField.removeClass('table-background');
      tmpField.find("span").removeClass('table-element');
    }
  }
}
