



function init() {
  
  // * DOM Elements
  const grid = document.querySelector('.grid')
  const cells = []


  // * Grid variables
  const width = 10
  const height = 20

  // * Game variables
  let playerTetriminoPosition = 0 


  function createGrid() {
    for (let i = 0; i < width * height; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  

  // * Control functionality of testblock


  // * Writing function to create new player block


  // * Writing basic function to move testblock down at an interval
  


  createGrid()








}


window.addEventListener('DOMContentLoaded', init)