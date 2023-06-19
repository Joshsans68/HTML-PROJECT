  var players = [
    { name: "DeGea", position: "goalkeeper", image: "degea.png" },
    { name: "Alisson", position: "goalkeeper", image: "alisson.png" },
    { name: "Ederson", position: "goalkeeper", image: "ederson.png" },
    { name: "Van-Dijk", position: "defender", image: "van dijk.png" },
    { name: "Ruben-Diaz", position: "defender", image: "ruben.png" },
    { name: "Marquinhos", position: "defender", image: "marqui.png" },
    { name: "Anotnio Rüdiger", position: "defender", image: "rudiger.png" },
    { name: "Cancelo", position: "defender", image: "jc.png" },
    { name: "Varane", position: "defender", image: "varane.png" },
    { name: "Kroos", position: "midfielder", image: "kroos.png" },
    { name: "Llorente", position: "midfielder", image: "llorente.png "},
    { name: "Jude", position: "midfielder", image: "jude.png" },
    { name: "Dr-Bruyne", position: "midfielder", image: "debruyne.png" },
    { name: "Modric", position: "midfielder", image: "modric.png" },
    { name: "Bruno-Fernandes", position: "midfielder", image: "bruno.png" },
    { name: "Son", position: "forward", image: "son.png" },
    { name: "Neymar", position: "forward", image: "neymar.png" },
    { name: "Messi", position: "forward", image: "messitransfer.png" },
    { name: "Salah", position: "forward", image: "salah.png" },
    { name: "Ronaldo", position: "forward", image: "CR7.png" },
    { name: "Mbappe", position: "forward", image: "mbappe.png" },
    { name: "Haaland", position: "forward", image: "haaland.png" },
  ];
  
  var selectedPlayers = [];

function createPlayerCard(player) {
  var playerCard = document.createElement("div");
  playerCard.classList.add("player-card");

  var playerImageElem = document.createElement("img");
  playerImageElem.src = player.image;
  playerImageElem.alt = player.name;

  var playerNameElem = document.createElement("div");
  playerNameElem.classList.add("player-name");
  playerNameElem.textContent = player.name;

  var playerPositionElem = document.createElement("div");
  playerPositionElem.classList.add("player-position");
  playerPositionElem.textContent = player.position;

  playerCard.appendChild(playerImageElem);
  playerCard.appendChild(playerNameElem);
  playerCard.appendChild(playerPositionElem);

  playerCard.draggable = true;
  playerCard.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text/plain", player.name);
  });

  return playerCard;
}

function renderPlayerPool() {
  var playerList = document.getElementById("player-list");
  playerList.innerHTML = "";

  for (var i = 0; i < players.length; i++) {
    var playerCard = createPlayerCard(players[i]);
    playerList.appendChild(playerCard);
  }
}

function renderSelectedPlayers() {
  var selectedPlayerContainer = document.getElementById("selected-players");
  selectedPlayerContainer.innerHTML = "";

  for (var i = 0; i < selectedPlayers.length; i++) {
    var playerCard = createPlayerCard(selectedPlayers[i]);
    selectedPlayerContainer.appendChild(playerCard);
  }

  updateFormation();
}

function updateFormation() {
  var formationContainer = document.getElementById("formation-container");
  formationContainer.innerHTML = "";

  var positions = ["goalkeeper", "defender", "midfielder", "forward"];
  var positionCount = [1, 4, 3, 3];
  var playerCount = 0;

  for (var i = 0; i < positions.length; i++) {
    var playerPosition = document.createElement("div");
    playerPosition.classList.add("player-position");
    playerPosition.classList.add(positions[i]);

    for (var j = 0; j < selectedPlayers.length; j++) {
      if (selectedPlayers[j].position.toLowerCase() === positions[i]) {
        var playerNameElem = document.createElement("div");
        playerNameElem.textContent = selectedPlayers[j].name;

        playerPosition.appendChild(playerNameElem);
        playerCount++;

        if (playerCount === positionCount[i]) {
          break;
        }
      }
    }

    formationContainer.appendChild(playerPosition);
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var playerName = event.dataTransfer.getData("text/plain");

  var player = players.find(function(p) {
    return p.name === playerName;
  });

  if (player) {
    if (selectedPlayers.length < 11) {
      var existingPlayer = selectedPlayers.find(function(p) {
        return p.name === player.name;
      });

      if (!existingPlayer) {
        selectedPlayers.push(player);
        renderSelectedPlayers();
      } else {
        alert("Player already selected!");
      }
    } else {
      alert("You can select only 11 players!");
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  renderPlayerPool();

  var teamRoster = document.getElementById("team-roster");
  teamRoster.addEventListener("dragover", allowDrop);
  teamRoster.addEventListener("drop", drop);
});