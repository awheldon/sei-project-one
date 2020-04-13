



function init() {
  
  // * DOM Elements
  const grid = document.querySelector('.grid')
  const cells = []


  // * Grid variables
  const width = 10
  const height = 20

  // * Game variables
  let playerTetriminoPosition = []


  // * Function to create the grid

  function createGrid() {
    for (let i = 0; i < width * height; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  
  // * Setting tetrimino shapes

  const oShape = [1, 2, 11, 12]
  const jShape = [0, 10, 11, 12]
  const lShape = [2, 10, 11, 12]
  const sShape = [1, 2, 10, 11]
  const tShape = [1, 10, 11, 12]
  const iShape = [10, 11, 12, 13]
  const zShape = [0, 1, 11, 12]

  const tetriminos = [oShape, jShape, lShape, sShape, tShape, iShape, zShape]


  // * Creating tetriminos

  function createTetrimino() {
    let nextShape = []
    nextShape = tetriminos[Math.floor(Math.random() * (tetriminos.length - 1))]
    nextShape.forEach(cell => {
      cells[cell].classList.add('playertetrimino')
      playerTetriminoPosition.push(cell)
    })
  }
  
  function handleKeyDown(event) {
    playerTetriminoPosition.forEach(cell => {
      cells[cell].classList.remove('playertetrimino')
    })
    // const x = pikaPosition % width
    // const y = Math.floor(pikaPosition / width)
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


  createGrid()

  createTetrimino()

  document.addEventListener('keydown', handleKeyDown)


}


window.addEventListener('DOMContentLoaded', init)