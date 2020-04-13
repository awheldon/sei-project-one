



function init() {
  
  // * DOM Elements
  const grid = document.querySelector('.grid')
  const cells = []


  // * Grid variables
  const width = 10
  const height = 20

  // * Game variables
  let playerTetriminoPosition = []
  let currentTetrimino = ''


  // * Function to create the grid

  function createGrid() {
    for (let i = 0; i < width * height; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  
  // * Setting tetrimino shapes and rotation data

  const oShape = {
    name: 'o',
    startingPosition: [1, 2, 11, 12]
  }
  const jShape = {
    name: 'j',
    startingPosition: [0, 10, 11, 12],
    rotation90: [2, -9, 0, 9],
    rotation180: [20, 11, 0, -11],
    rotation270: [-2, 9, 0, -9],
    rotation360: [-20, -11, 0, 11]
  }
  const lShape = {
    name: 'l',
    startingPosition: [2, 10, 11, 12]
  }
  const sShape = {
    name: 's',
    startingPosition: [1, 2, 10, 11]
  }
  const tShape = {
    name: 't',
    startingPosition: [1, 10, 11, 12]
  }
  const iShape = {
    name: 'i',
    startingPosition: [10, 11, 12, 13]
  }
  const zShape = {
    name: 'z',
    startingPosition: [0, 1, 11, 12]
  }

  const tetriminos = [oShape, jShape, lShape, sShape, tShape, iShape, zShape]

  // * Creating tetriminos

  function createTetrimino() {
    let nextShape = []
    nextShape = tetriminos[Math.floor(Math.random() * (tetriminos.length - 1))]
    nextShape.startingPosition.forEach(cell => {
      cells[cell].classList.add('playertetrimino')
      playerTetriminoPosition.push(cell)
    })
    currentTetrimino = nextShape.name
    console.log(currentTetrimino)
  }
  
  // * Horizontal and Downward Movement Control

  function handleKeyDown(event) {
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.remove('playertetrimino')
    })
    switch (event.keyCode) { //
      case 39: // * Moving right
        for (let i = 0; i < playerTetriminoPosition.length; i++) {
          playerTetriminoPosition[i] = playerTetriminoPosition[i] + 1
        }
        break
      case 37: // * Moving left
        for (let i = 0; i < playerTetriminoPosition.length; i++) {
          playerTetriminoPosition[i] = playerTetriminoPosition[i] - 1
        }
        break
      case 40: // * Moving down
        for (let i = 0; i < playerTetriminoPosition.length; i++) {
          playerTetriminoPosition[i] = playerTetriminoPosition[i] + 10
        }                
        break
      default:
        console.log('invalid key do nothing')
    }
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.add('playertetrimino')
    })
  }
  
  // * Rotation Control

  function handleRotation(event) {
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.remove('playertetrimino')
    })
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
        break
      default:
        console.log('invalid key do nothing')
    }
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.add('playertetrimino')
    })
  }


  createGrid()

  createTetrimino()

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keydown', handleRotation)


}


window.addEventListener('DOMContentLoaded', init)