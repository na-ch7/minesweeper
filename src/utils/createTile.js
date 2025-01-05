export function createTile(row, col, value = 0) {
  return {
    row,
    col,
    value,
    isMine: false,
    isFlipped: false,
    isFlagged: false,
  };
}
