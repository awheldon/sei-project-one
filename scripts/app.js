



function init() {
  
  // * DOM Elements
  const grid = document.querySelector('.grid')
  const cells = []


  // * Grid variables
  const width = 10
  const height = 23
  
  // * Arrays for checks

  let rowArray = []
  let rowToClear = []
  let numClearRows = 0

  // * Game variables
  let playerTetriminoPosition = []
  let currentTetrimino = ''
  let timer = 0


  // * Function to create the grid

  function createGrid() {
    for (let i = 0; i < width * height; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.textContent = i
    }
    for (let i = 2; i < 22; i++) {
      rowArray.push(cells.slice(i * 10, ((i * 10) + 10)))
    }
    for (let i = 0; i < 20; i++) {
      cells[i].classList.remove('div')
      cells[i].classList.add('topandbottom')
    }
    for (let i = 220; i < 230; i++) {
      cells[i].classList.remove('div')
      cells[i].classList.add('topandbottom')
    }
  }
  
  // * Setting tetrimino shapes and rotation data

  const oShape = {
    name: 'o',
    startingPosition: [4, 5, 14, 15]
  }
  const jShape = {
    name: 'j',
    startingPosition: [3, 13, 14, 15],
    rotation90: [2, -9, 0, 9],
    rotation180: [20, 11, 0, -11],
    rotation270: [-2, 9, 0, -9],
    rotation360: [-20, -11, 0, 11]
  }
  const lShape = {
    name: 'l',
    startingPosition: [5, 13, 14, 15],
    rotation90: [20, -9, 0, 9],
    rotation180: [-2, 11, 0, -11],
    rotation270: [-20, 9, 0, -9],
    rotation360: [2, -11, 0, 11]
  }
  const sShape = {
    name: 's',
    startingPosition: [4, 5, 13, 14],
    rotation90: [11, 20, -9, 0],
    rotation180: [9, -2, 11, 0],
    rotation270: [-11, -20, 9, 0],
    rotation360: [-9, 2, -11, 0]
  }
  const tShape = {
    name: 't',
    startingPosition: [4, 13, 14, 15],
    rotation90: [11, -9, 0, 9],
    rotation180: [9, 11, 0, -11],
    rotation270: [-11, 9, 0, -9],
    rotation360: [-9, -11, 0, 11]
  }
  const iShape = {
    name: 'i',
    startingPosition: [13, 14, 15, 16],
    rotation90: [-8, 1, 10, 19],
    rotation180: [21, 10, -1, -12],
    rotation270: [8, -1, -10, -19],
    rotation360: [-21, -10, 1, 12]
  }
  const zShape = {
    name: 'z',
    startingPosition: [3, 4, 14, 15],
    rotation90: [2, 11, 0, 9],
    rotation180: [20, 9, 0, -11],
    rotation270: [-2, -11, 0, -9],
    rotation360: [-20, -9, 0, 11]
  }

  const tetriminos = [oShape, jShape, lShape, sShape, tShape, iShape, zShape]

  // * Creating tetriminos

  function createTetrimino() {
    let nextShape = []
    playerTetriminoPosition = []
    nextShape = tetriminos[Math.floor(Math.random() * (tetriminos.length))]
    nextShape.startingPosition.forEach(cell => {
      cells[cell].classList.add('playertetrimino')
      playerTetriminoPosition.push(cell)
    })
    currentTetrimino = nextShape.name
    console.log(currentTetrimino)
  }
  
  // * Tetrimino movement check functions

  function bottomCheck() {
    if (playerTetriminoPosition.some(pos => pos > 219)) {
      return true
    } else return false
  }

  function occupiedCheck() {
    if (playerTetriminoPosition.some(pos => cells[pos].classList.contains('fixedtetrimino'))) {
      return true
    } else return false
  }

  // * Tetrimino Functions

  function removeTetrimino() {
    return playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.remove('playertetrimino')
    })
  }

  function drawPlayerTetrimino() {
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.add('playertetrimino')
    })
  }

  function fixDroppedTetrimino() {
    removeTetrimino()
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.add('fixedtetrimino')
    })
    isLineFull()
    dropLines()
    createTetrimino()
    gameOver()
  }

  function revertVerticalPos() {
    for (let i = 0; i < playerTetriminoPosition.length; i++) {
      playerTetriminoPosition[i] = playerTetriminoPosition[i] - 10
    }
  }

  function moveDown() {
    for (let i = 0; i < playerTetriminoPosition.length; i++) {
      playerTetriminoPosition[i] = playerTetriminoPosition[i] + 10
    }
  }

  function moveRight() {
    for (let i = 0; i < playerTetriminoPosition.length; i++) {
      playerTetriminoPosition[i] = playerTetriminoPosition[i] + 1
    }
  }

  function moveLeft() {
    for (let i = 0; i < playerTetriminoPosition.length; i++) {
      playerTetriminoPosition[i] = playerTetriminoPosition[i] - 1
    }
  }

  // * Line Check Functions

  function isLineFull() {
    for (let i = 0; i < rowArray.length; i++) {
      for (let j = 0; j < rowArray[i].length; j++) {
        if (rowArray[i].every(div => div.classList.contains('fixedtetrimino'))) {
          rowToClear.push(rowArray[i][j])
          console.log(rowToClear)
        }
      }
    }
    clearRow()
  }

  function clearRow() {
    rowToClear.forEach(cell => {
      cell.classList.remove('fixedtetrimino')
    })
    numClearRows = rowToClear.length
    rowToClear = []
  }
  
  function dropLines() {
    if (numClearRows > 0) {
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('fixedtetrimino')) {
          cells[i].classList.remove('fixedtetrimino')
          cells[i + numClearRows].classList.add('dropping')
        }
      }
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('dropping')) {
          cells[i].classList.remove('dropping')
          cells[i].classList.add('fixedtetrimino')
        }
      }
      console.log('Im running')  
    } numClearRows = 0
  }

  // * Line clear function

  // * Horizontal and Downward Movement Control

  function handleKeyDown(event) {
    removeTetrimino()
    switch (event.keyCode) { //
      case 39: // * Moving right
        moveRight()
        if (occupiedCheck()) {
          moveLeft()
        }
        drawPlayerTetrimino()
        break
      case 37: // * Moving left
        moveLeft()
        if (occupiedCheck()) {
          moveRight()
        }
        drawPlayerTetrimino()
        break
      case 40: // * Moving down
        moveDown()
        if (bottomCheck()) {
          revertVerticalPos()
          fixDroppedTetrimino()
        } else if (occupiedCheck()) {
          revertVerticalPos()
          fixDroppedTetrimino()
        } else drawPlayerTetrimino()
        gameOver()          
        break
      default:
        console.log('invalid key do nothing')
    }
  }
  
  // * Rotation Control

  function handleRotation(event) {
    removeTetrimino()
    switch (event.keyCode) { //
      case 38:
        if (currentTetrimino === 'j') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + jShape.rotation90[i]
          }
          currentTetrimino = 'j90'
        } else if (currentTetrimino === 'j90') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + jShape.rotation180[i]
          }
          currentTetrimino = 'j180'
        } else if (currentTetrimino === 'j180') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + jShape.rotation270[i]
          }
          currentTetrimino = 'j270'
        } else if (currentTetrimino === 'j270') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + jShape.rotation360[i]
          }
          currentTetrimino = 'j'
        }
        if (currentTetrimino === 'l') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + lShape.rotation90[i]
          }
          currentTetrimino = 'l90'
        } else if (currentTetrimino === 'l90') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + lShape.rotation180[i]
          }
          currentTetrimino = 'l180'
        } else if (currentTetrimino === 'l180') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + lShape.rotation270[i]
          }
          currentTetrimino = 'l270'
        } else if (currentTetrimino === 'l270') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + lShape.rotation360[i]
          }
          currentTetrimino = 'l'
        }
        if (currentTetrimino === 's') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + sShape.rotation90[i]
          }
          currentTetrimino = 's90'
        } else if (currentTetrimino === 's90') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + sShape.rotation180[i]
          }
          currentTetrimino = 's180'
        } else if (currentTetrimino === 's180') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + sShape.rotation270[i]
          }
          currentTetrimino = 's270'
        } else if (currentTetrimino === 's270') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + sShape.rotation360[i]
          }
          currentTetrimino = 's'
        }
        if (currentTetrimino === 't') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + tShape.rotation90[i]
          }
          currentTetrimino = 't90'
        } else if (currentTetrimino === 't90') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + tShape.rotation180[i]
          }
          currentTetrimino = 't180'
        } else if (currentTetrimino === 't180') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + tShape.rotation270[i]
          }
          currentTetrimino = 't270'
        } else if (currentTetrimino === 't270') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + tShape.rotation360[i]
          }
          currentTetrimino = 't'
        }
        if (currentTetrimino === 'i') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + iShape.rotation90[i]
          }
          currentTetrimino = 'i90'
        } else if (currentTetrimino === 'i90') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + iShape.rotation180[i]
          }
          currentTetrimino = 'i180'
        } else if (currentTetrimino === 'i180') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + iShape.rotation270[i]
          }
          currentTetrimino = 'i270'
        } else if (currentTetrimino === 'i270') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + iShape.rotation360[i]
          }
          currentTetrimino = 'i'
        }
        if (currentTetrimino === 'z') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + zShape.rotation90[i]
          }
          currentTetrimino = 'z90'
        } else if (currentTetrimino === 'z90') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + zShape.rotation180[i]
          }
          currentTetrimino = 'z180'
        } else if (currentTetrimino === 'z180') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + zShape.rotation270[i]
          }
          currentTetrimino = 'z270'
        } else if (currentTetrimino === 'z270') {
          for (let i = 0; i < playerTetriminoPosition.length; i++) {
            playerTetriminoPosition[i] = playerTetriminoPosition[i] + zShape.rotation360[i]
          }
          currentTetrimino = 'z'
        }                                                                
        break
      default:
        console.log('invalid key do nothing')
    }
    drawPlayerTetrimino()
  }

  // * Tetrimino Automatic Movement

  const falling = setInterval(() => {
    timer++
    removeTetrimino()
    moveDown()
    if (bottomCheck() || occupiedCheck()) {
      revertVerticalPos()
      fixDroppedTetrimino()
    } else {
      drawPlayerTetrimino()
      gameOver()
    }
    if (timer >= 500) {
      clearInterval(falling)
    }
  }, 200)

  function gameOver() {
    if (playerTetriminoPosition.some(pos => pos < 20) && (playerTetriminoPosition.some(pos => cells[pos].classList.contains('fixedtetrimino')))) {
      window.alert('ya fucked it')
      clearInterval(falling)
    }
  }

  createGrid()

  createTetrimino()

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keydown', handleRotation)


}


window.addEventListener('DOMContentLoaded', init)