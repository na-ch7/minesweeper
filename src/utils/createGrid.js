import {createTile} from './createTile';

export function createGrid(height, width, mines) {
  const grid = [];
  for (let row = 0; row < height; row++) {
    const newRow = [];
    for (let col = 0; col < width; col++) {
      newRow.push(createTile(row, col));
    }
    grid.push(newRow);
  }
  return grid;
}

export function initializeMines(grid, mines, safeRow, safeCol) {
  const newGrid = grid.slice();
  const safeTiles = getNeighbours(newGrid, safeRow, safeCol).concat([[safeRow, safeCol]]);

  let minesToInsert = mines;
  while (minesToInsert > 0) {
    let row = Math.floor(Math.random() * newGrid.length);
    let col = Math.floor(Math.random() * newGrid[0].length);

    if (!newGrid[row][col].isMine && !safeTiles.some(([r, c]) => r === row && c === col)) {
      grid[row][col].isMine = true;
      minesToInsert--;
    }
  }
  setValue(newGrid);
  return newGrid;
}

function setValue(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j].isMine) {
        const neighbours = getNeighbours(grid, i, j);
        for (const neighbour of neighbours) {
          const [row, col] = neighbour;
          grid[row][col].value += 1;
        }
      }
    }
  }
}

export function getNeighbours(grid, row, col) {
  const neighbours = [];
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r != row || c != col) {
        if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
          neighbours.push([r, c]);
        }
      }
    }
  }
  return neighbours;
}
