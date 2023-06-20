const positions = document.querySelectorAll('.position');
const positionsGK = document.querySelectorAll('.position-GK');
const players = document.querySelectorAll('.player');

let draggedPlayer = null;

players.forEach(player => {
  player.addEventListener('dragstart', dragStart);
  player.addEventListener('dragend', dragEnd);
});

positions.forEach(position => {
  position.addEventListener('dragover', dragOver);
  position.addEventListener('dragenter', dragEnter);
  position.addEventListener('dragleave', dragLeave);
  position.addEventListener('drop', drop);
});
positionsGK.forEach(position => {
    position.addEventListener('dragover', dragOver);
    position.addEventListener('dragenter', dragEnter);
    position.addEventListener('dragleave', dragLeave);
    position.addEventListener('drop', drop);
  });

function dragStart() {
  draggedPlayer = this;
  setTimeout(() => (this.style.display = 'none'), 0);
}

function dragEnd() {
  draggedPlayer = null;
  setTimeout(() => (this.style.display = 'block'), 0);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.style.background = '#c0c0c0';
}

function dragLeave() {
  this.style.background = '#e0e0e0';
}

function drop() {
  if (!this.innerHTML) {
    this.appendChild(draggedPlayer);
    this.style.background = '#e0e0e0';
  }
}
