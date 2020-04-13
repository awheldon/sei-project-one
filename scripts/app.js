



function init() {
  
  // * DOM Elements
  const grid = document.querySelector('.grid')
  const cells = []


  // * Grid variables
  const width = 10
  const height = 20

  // * Game variables
  let playerTetriminoPosition = 0


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
    nextShape = tetriminos[Math.round(Math.random() * (tetriminos.length - 1))]
    nextShape.forEach(cell => {
      cells[cell].classList.add('playertetrimino')
    })
  }
  


  createGrid()

  createTetrimino()







}


window.addEventListener('DOMContentLoaded', init)