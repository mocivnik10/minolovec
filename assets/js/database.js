function savePlayerToDatabase(name, score) {
  var userID = database.ref().child('users').push().key;
  database.ref('users/'+userID+'/name').set(name);
  database.ref('users/'+userID+'/score').set(parseInt(score));
}



$(document).ready(function() {
  var playersArr = [];
  database.ref("/users").orderByChild("score").limitToFirst(10).on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      playersArr.push([childData.name, childData.score]);
    });

    // Prikazi/Narisi HTML tabelo za scoreboard od najnizjega do najvisjega
    var tablerow = '';
    var playerCount = 1;
    for (var i = 0; i < playersArr.length; i++) {
      tablerow += '<tr>'
      tablerow += '<td>' + playerCount + '</td>';
      for (var j = 0; j < playersArr[i].length; j++) {
        tablerow += '<td>' + playersArr[i][j] + '</td>';
      }
      tablerow += '</tr>'
      playerCount++;
    }
    $("#score_table_body").prepend(tablerow);
  });
})
