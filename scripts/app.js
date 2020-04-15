



function init() {
  
  // * DOM Elements
  const grid = document.querySelector('.grid')
  const cells = []


  // * Grid variables
  const width = 10
  const height = 20
  
  // * Attempting to create array of rows, and columns of left/right edge

  let rowArray = []
  let leftEdgeArray = []
  let rightEdgeArray = []

  // * Game variables
  let playerTetriminoPosition = []
  let currentTetrimino = ''
  let timer = 0


  // * Function to create the grid

  function createGrid() {
    for (let i = 0; i < width * height; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cell.textContent = i
      cells.push(cell)
    }
    for (let i = 0; i < 20; i++) {
      rowArray.push(cells.slice(i * 10, ((i * 10) + 10)))
    }
    for (let i = 0; i < 20; i++) {
      leftEdgeArray.push(cells[i * 10])
    }
    for (let i = 0; i < 20; i++) {
      rightEdgeArray.push(cells[(i * 10) + 9])
    }
    console.log(leftEdgeArray)
    console.log(rightEdgeArray)
    console.log(rowArray[19])
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
    startingPosition: [2, 10, 11, 12],
    rotation90: [20, -9, 0, 9],
    rotation180: [-2, 11, 0, -11],
    rotation270: [-20, 9, 0, -9],
    rotation360: [2, -11, 0, 11]
  }
  const sShape = {
    name: 's',
    startingPosition: [1, 2, 10, 11],
    rotation90: [11, 20, -9, 0],
    rotation180: [9, -2, 11, 0],
    rotation270: [-11, -20, 9, 0],
    rotation360: [-9, 2, -11, 0]
  }
  const tShape = {
    name: 't',
    startingPosition: [1, 10, 11, 12],
    rotation90: [11, -9, 0, 9],
    rotation180: [9, 11, 0, -11],
    rotation270: [-11, 9, 0, -9],
    rotation360: [-9, -11, 0, 11]
  }
  const iShape = {
    name: 'i',
    startingPosition: [10, 11, 12, 13],
    rotation90: [-8, 1, 10, 19],
    rotation180: [21, 10, -1, -12],
    rotation270: [8, -1, -10, -19],
    rotation360: [-21, -10, 1, 12]
  }
  const zShape = {
    name: 'z',
    startingPosition: [0, 1, 11, 12],
    rotation90: [2, 11, 0, 9],
    rotation180: [20, 9, 0, -11],
    rotation270: [-2, -11, 0, -9],
    rotation360: [-20, -9, 0, 11]
  }

  const tetriminos = [oShape, jShape, lShape, sShape, tShape, iShape, zShape]

  // * Creating tetriminos

  function createTetrimino() {
    let nextShape = []
    nextShape = tetriminos[Math.floor(Math.random() * (tetriminos.length))]
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
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.add('playertetrimino')
    })
  }

  // * Check functions


  function fixBlocks() {
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.remove('playertetrimino')
      cells[cell].classList.add('fixedtetrimino')
    })
    console.log('can you hear me')
  }


  // * Tetrimino Automatic Movement

  const falling = setInterval(() => {
    timer++
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.remove('playertetrimino')
    })
    for (let i = 0; i < playerTetriminoPosition.length; i++) {
      playerTetriminoPosition[i] = playerTetriminoPosition[i] + 10
    }
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.add('playertetrimino')
    })
    if (timer >= 5) {
      clearInterval(falling)
    }
    playerTetriminoPosition.some(position => position >= 200) ? fixBlocks() : console.log('funtime')      
  }, 1000)

  createGrid()

  createTetrimino()

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keydown', handleRotation)


}


window.addEventListener('DOMContentLoaded', init)