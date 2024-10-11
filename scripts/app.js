function init() {
  // * DOM Elements
  const grid = document.querySelector('.grid');
  const cells = [];
  const level = document.querySelector('#level');
  const lines = document.querySelector('#lines');
  const scoreCounter = document.querySelector('#score');
  const dropFx = document.querySelector('#drop');
  const clearFx = document.querySelector('#clear');
  const gameOverFx = document.querySelector('#gameover');

  // * Grid variables
  const width = 10;
  const height = 23;

  // * Arrays for checks

  const rowArray = [];
  let rowToClear = [];
  let cellToDropFrom = 0;
  let numClearRows = 0;

  // * Game variables
  let playerTetriminoPosition = [];
  let currentTetrimino = '';
  let linesCleared = 0;
  let score = 0;
  let dropSpeed = 1000;
  let falling;
  let nextShape = [];
  let gameStatus = false;

  // * Function to create the grid

  function createGrid() {
    for (let i = 0; i < width * height; i++) {
      const cell = document.createElement('div');
      grid.appendChild(cell);
      cells.push(cell);
    }
    for (let i = 2; i < 22; i++) {
      rowArray.push(cells.slice(i * 10, i * 10 + 10));
    }
    for (let i = 0; i < 20; i++) {
      cells[i].classList.remove('div');
      cells[i].classList.add('top');
    }
    for (let i = 10; i < 20; i++) {
      cells[i].classList.remove('top');
      cells[i].classList.add('topline');
    }
    for (let i = 220; i < 230; i++) {
      cells[i].classList.remove('div');
      cells[i].classList.add('bottom');
    }
  }

  // * Setting tetrimino shapes and rotation data

  const oShape = {
    name: 'o',
    startingPosition: [4, 5, 14, 15],
  };
  const jShape = {
    name: 'j',
    startingPosition: [3, 13, 14, 15],
    rotation90: [2, -9, 0, 9],
    rotation180: [20, 11, 0, -11],
    rotation270: [-2, 9, 0, -9],
    rotation360: [-20, -11, 0, 11],
  };
  const lShape = {
    name: 'l',
    startingPosition: [5, 13, 14, 15],
    rotation90: [20, -9, 0, 9],
    rotation180: [-2, 11, 0, -11],
    rotation270: [-20, 9, 0, -9],
    rotation360: [2, -11, 0, 11],
  };
  const sShape = {
    name: 's',
    startingPosition: [4, 5, 13, 14],
    rotation90: [11, 20, -9, 0],
    rotation180: [9, -2, 11, 0],
    rotation270: [-11, -20, 9, 0],
    rotation360: [-9, 2, -11, 0],
  };
  const tShape = {
    name: 't',
    startingPosition: [4, 13, 14, 15],
    rotation90: [11, -9, 0, 9],
    rotation180: [9, 11, 0, -11],
    rotation270: [-11, 9, 0, -9],
    rotation360: [-9, -11, 0, 11],
  };
  const iShape = {
    name: 'i',
    startingPosition: [13, 14, 15, 16],
    rotation90: [-8, 1, 10, 19],
    rotation180: [21, 10, -1, -12],
    rotation270: [8, -1, -10, -19],
    rotation360: [-21, -10, 1, 12],
  };
  const zShape = {
    name: 'z',
    startingPosition: [3, 4, 14, 15],
    rotation90: [2, 11, 0, 9],
    rotation180: [20, 9, 0, -11],
    rotation270: [-2, -11, 0, -9],
    rotation360: [-20, -9, 0, 11],
  };

  const tetriminos = [
    oShape,
    jShape,
    lShape,
    sShape,
    tShape,
    iShape,
    zShape,
  ];

  // * Creating tetriminos

  function createTetrimino() {
    playerTetriminoPosition = [];
    nextShape =
      tetriminos[Math.floor(Math.random() * tetriminos.length)];
    nextShape.startingPosition.forEach((cell) => {
      cells[cell].classList.add('playertetrimino');
      cells[cell].classList.add(nextShape.name);
      playerTetriminoPosition.push(cell);
    });
    currentTetrimino = nextShape.name;
    falling = setInterval(autoMove, dropSpeed);
  }

  // * Tetrimino movement check functions

  function bottomCheck(position = playerTetriminoPosition) {
    return position.some((pos) => pos > 219);
  }

  function leftCheck() {
    if (playerTetriminoPosition.some((pos) => (pos + 1) % 10 === 0)) {
      return true;
    } else return false;
  }

  function rightCheck() {
    if (playerTetriminoPosition.some((pos) => pos % 10 === 0)) {
      return true;
    } else return false;
  }

  function occupiedCheck(position = playerTetriminoPosition) {
    return position.some((pos) => cells[pos].classList.contains('fixedtetrimino'));
  }

  function calculateGhostPosition() {
    const ghostPosition = [...playerTetriminoPosition];
    while (!bottomCheck(ghostPosition) && !occupiedCheck(ghostPosition)) {
      ghostPosition.forEach((pos, index) => {
        ghostPosition[index] = pos + 10;
      });
    }
    ghostPosition.forEach((pos, index) => {
      ghostPosition[index] = pos - 10;
    });
    return ghostPosition;
  }

  function calculateDropDistance(startPosition, endPosition) {
    const startRow = Math.floor(startPosition[0] / width);
    const endRow = Math.floor(endPosition[0] / width);
    return endRow - startRow;
  }

  // * Tetrimino Functions

  function removeTetrimino() {
    playerTetriminoPosition.forEach((cell) => {
      cells[cell].classList.remove('playertetrimino');
      cells[cell].classList.remove(nextShape.name);
    });
    cells.forEach(cell => cell.classList.remove('ghost'));
  }

  function drawPlayerTetrimino() {
    playerTetriminoPosition.forEach((cell) => {
      cells[cell].classList.add('playertetrimino');
      cells[cell].classList.add(nextShape.name);
    });
  
    const ghostPosition = calculateGhostPosition();
    ghostPosition.forEach((cell) => {
      if (!cells[cell].classList.contains('playertetrimino')) {
        cells[cell].classList.add('ghost');
      }
    });
  }

  function fixDroppedTetrimino() {
    removeTetrimino();
    playerTetriminoPosition.forEach((cell) => {
      cells[cell].classList.add('fixedtetrimino');
    });
    isLineFull();
    dropLines();
    clearInterval(falling);
    createTetrimino();
    gameOver();
  }

  function revertVerticalPos() {
    for (let i = 0; i < playerTetriminoPosition.length; i++) {
      playerTetriminoPosition[i] = playerTetriminoPosition[i] - 10;
    }
  }

  function moveDown() {
    for (let i = 0; i < playerTetriminoPosition.length; i++) {
      playerTetriminoPosition[i] = playerTetriminoPosition[i] + 10;
    }
  }

  function moveRight() {
    for (let i = 0; i < playerTetriminoPosition.length; i++) {
      playerTetriminoPosition[i] = playerTetriminoPosition[i] + 1;
    }
  }

  function moveLeft() {
    for (let i = 0; i < playerTetriminoPosition.length; i++) {
      playerTetriminoPosition[i] = playerTetriminoPosition[i] - 1;
    }
  }

  function updateScore() {
    // if (numClearRows === 40) {
    //   console.log('Im running')
    // }
    score = score + numClearRows * 100;
    scoreCounter.innerHTML = score;
  }

  // * Line Check and Clearing Functions

  function isLineFull() {
    for (let i = 0; i < rowArray.length; i++) {
      for (let j = 0; j < rowArray[i].length; j++) {
        if (
          rowArray[i].every((div) =>
            div.classList.contains('fixedtetrimino')
          )
        ) {
          rowToClear.push(rowArray[i][j]);
          if (cellToDropFrom === 0) {
            cellToDropFrom = (i + 1) * 10 + 10;
          }
        }
      }
    }
    clearRow();
  }

  function clearRow() {
    rowToClear.forEach((cell) => {
      cell.classList.remove('fixedtetrimino');
    });
    numClearRows = rowToClear.length;
    linesCleared = linesCleared + numClearRows / 10;
    lines.innerHTML = linesCleared;
    updateScore();
    updateLevel();
    rowToClear = [];
  }

  function dropLines() {
    if (numClearRows > 0) {
      for (let i = 0; i < cellToDropFrom; i++) {
        if (cells[i].classList.contains('fixedtetrimino')) {
          cells[i].classList.remove('fixedtetrimino');
          cells[i + numClearRows].classList.add('dropping');
        }
      }
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('dropping')) {
          cells[i].classList.remove('dropping');
          cells[i].classList.add('fixedtetrimino');
        }
      }
    }
    numClearRows = 0;
    cellToDropFrom = 0;
  }

  function instantDrop() {
    removeTetrimino();
    const startPosition = [...playerTetriminoPosition];
    const ghostPosition = calculateGhostPosition();
    const dropDistance = calculateDropDistance(startPosition, ghostPosition);
    score += dropDistance * 2;
    
    playerTetriminoPosition = ghostPosition;
    fixDroppedTetrimino();
    updateScore();
  }

  // * Level Function

  function updateLevel() {
    if (linesCleared < 5) {
      dropSpeed = 1000;
      level.textContent = 1;
    } else if (linesCleared < 10) {
      dropSpeed = 800;
      level.textContent = 2;
    } else if (linesCleared < 15) {
      dropSpeed = 650;
      level.textContent = 3;
    } else if (linesCleared < 20) {
      dropSpeed = 500;
      level.textContent = 4;
    } else if (linesCleared < 25) {
      dropSpeed = 400;
      level.textContent = 5;
    } else if (linesCleared < 30) {
      dropSpeed = 300;
      level.textContent = 6;
    } else if (linesCleared < 35) {
      dropSpeed = 250;
      level.textContent = 7;
    } else if (linesCleared < 40) {
      dropSpeed = 200;
      level.textContent = 8;
    } else if (linesCleared < 45) {
      dropSpeed = 150;
      level.textContent = 9;
    } else if (linesCleared < 50) {
      dropSpeed = 100;
      level.textContent = 10;
    }
  }

  // * Horizontal and Downward Movement Control

  function handleKeyDown(event) {
    removeTetrimino();
    switch (
      event.keyCode //
    ) {
      case 39: // * Moving right
        moveRight();
        if (occupiedCheck()) {
          moveLeft();
        }
        if (rightCheck()) {
          moveLeft();
        }
        drawPlayerTetrimino();
        break;
      case 37: // * Moving left
        moveLeft();
        if (occupiedCheck()) {
          moveRight();
        }
        if (leftCheck()) {
          moveRight();
        }
        drawPlayerTetrimino();
        break;
      case 40: // * Moving down
        moveDown();
        if (bottomCheck()) {
          revertVerticalPos();
          fixDroppedTetrimino();
        } else if (occupiedCheck()) {
          revertVerticalPos();
          fixDroppedTetrimino();
        } else {
          score = score + 10;
          updateScore();
          drawPlayerTetrimino();
        }
        gameOver();
        break;
      case 32:
        if (gameStatus === false) {
          createTetrimino();
          gameStatus = true;
        } else {
          instantDrop();
        }
        break;
      case 77:
        console.log('there is no music');
        break;
      default:
    }
  }

  // * Rotation Control

  function handleRotation(event) {
    removeTetrimino();
    switch (
      event.keyCode //
    ) {
      case 38:
        if (leftCheck() || rightCheck() || occupiedCheck()) {
          console.log('rotation stopped');
        } else {
          if (currentTetrimino === 'j') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + jShape.rotation90[i];
            }
            currentTetrimino = 'j90';
          } else if (currentTetrimino === 'j90') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + jShape.rotation180[i];
            }
            currentTetrimino = 'j180';
          } else if (currentTetrimino === 'j180') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + jShape.rotation270[i];
            }
            currentTetrimino = 'j270';
          } else if (currentTetrimino === 'j270') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + jShape.rotation360[i];
            }
            currentTetrimino = 'j';
          }
          if (currentTetrimino === 'l') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + lShape.rotation90[i];
            }
            currentTetrimino = 'l90';
          } else if (currentTetrimino === 'l90') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + lShape.rotation180[i];
            }
            currentTetrimino = 'l180';
          } else if (currentTetrimino === 'l180') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + lShape.rotation270[i];
            }
            currentTetrimino = 'l270';
          } else if (currentTetrimino === 'l270') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + lShape.rotation360[i];
            }
            currentTetrimino = 'l';
          }
          if (currentTetrimino === 's') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + sShape.rotation90[i];
            }
            currentTetrimino = 's90';
          } else if (currentTetrimino === 's90') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + sShape.rotation180[i];
            }
            currentTetrimino = 's180';
          } else if (currentTetrimino === 's180') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + sShape.rotation270[i];
            }
            currentTetrimino = 's270';
          } else if (currentTetrimino === 's270') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + sShape.rotation360[i];
            }
            currentTetrimino = 's';
          }
          if (currentTetrimino === 't') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + tShape.rotation90[i];
            }
            currentTetrimino = 't90';
          } else if (currentTetrimino === 't90') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + tShape.rotation180[i];
            }
            currentTetrimino = 't180';
          } else if (currentTetrimino === 't180') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + tShape.rotation270[i];
            }
            currentTetrimino = 't270';
          } else if (currentTetrimino === 't270') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + tShape.rotation360[i];
            }
            currentTetrimino = 't';
          }
          if (currentTetrimino === 'i') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + iShape.rotation90[i];
            }
            currentTetrimino = 'i90';
          } else if (currentTetrimino === 'i90') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + iShape.rotation180[i];
            }
            currentTetrimino = 'i180';
          } else if (currentTetrimino === 'i180') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + iShape.rotation270[i];
            }
            currentTetrimino = 'i270';
          } else if (currentTetrimino === 'i270') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + iShape.rotation360[i];
            }
            currentTetrimino = 'i';
          }
          if (currentTetrimino === 'z') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + zShape.rotation90[i];
            }
            currentTetrimino = 'z90';
          } else if (currentTetrimino === 'z90') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + zShape.rotation180[i];
            }
            currentTetrimino = 'z180';
          } else if (currentTetrimino === 'z180') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + zShape.rotation270[i];
            }
            currentTetrimino = 'z270';
          } else if (currentTetrimino === 'z270') {
            for (let i = 0; i < playerTetriminoPosition.length; i++) {
              playerTetriminoPosition[i] =
                playerTetriminoPosition[i] + zShape.rotation360[i];
            }
            currentTetrimino = 'z';
          }
        }
        break;
      default:
        console.log('invalid key do nothing');
    }
    drawPlayerTetrimino();
  }
  // * GameStart

  // * Tetrimino Automatic Movement

  function autoMove() {
    // console.log(dropSpeed);
    removeTetrimino();
    moveDown();
    if (bottomCheck() || occupiedCheck()) {
      revertVerticalPos();
      fixDroppedTetrimino();
    } else {
      drawPlayerTetrimino();
      gameOver();
    }
  }

  function gameOver() {
    if (
      playerTetriminoPosition.some((pos) => pos < 20) &&
      playerTetriminoPosition.some((pos) =>
        cells[pos].classList.contains('fixedtetrimino')
      )
    ) {
      clearInterval(falling);
      window.alert(
        'You lost with a score of ' +
          score +
          ' Reload the page to play again!'
      );
    }
  }

  createGrid();

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keydown', handleRotation);
}

window.addEventListener('DOMContentLoaded', init);
