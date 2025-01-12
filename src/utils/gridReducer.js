import {getNeighbours} from '../../src/utils/createGrid';

function expand(row, col, grid) {
  const newGrid = grid.slice();
  newGrid[row][col].isFlipped = true;
  const stack = [[row, col]];

  while (stack.length > 0) {
    const [row, col] = stack.pop();
    const neighbours = getNeighbours(newGrid, row, col);

    for (const neighbour of neighbours) {
      const [r, c] = neighbour;
      if (newGrid[r][c].isFlipped) continue;
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isFlipped = true;
        if (newGrid[r][c].value > 0) {
          continue;
        }
        stack.push(neighbour);
      }
    }
  }
  return newGrid;
}

function flipTile(row, col, grid) {
  const newGrid = grid.slice();
  const tile = newGrid[row][col];
  const newTile = {
    ...tile,
    isFlipped: true,
  };
  newGrid[row][col] = newTile;
  return newGrid;
}

function flipAll(grid) {
  const newGrid = grid.map(row =>
    row.map(tile => ({
      ...tile,
      isFlipped: true,
    })),
  );
  return newGrid;
}

export function gridReducer(state, action) {
  const {type, row, col} = action;

  switch (type) {
    case 'start_game': {
      return {
        ...state,
        isGameStarted: true,
      };
    }
    case 'flipped': {
      if (state.grid[row][col].isMine) {
        return {
          ...state,
          grid: flipAll(state.grid),
        };
      } else if (state.grid[row][col].value === 0) {
        return {
          ...state,
          grid: expand(row, col, state.grid),
        };
      } else {
        return {
          ...state,
          grid: flipTile(row, col, state.grid),
        };
      }
    }
    case 'win_game': {
      return {
        ...state,
        hasWon: true,
      };
    }
  }
}
