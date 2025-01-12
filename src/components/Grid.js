import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Tile from './Tile';
import Timer from './Timer';
import GameStatusPopup from './GameStatusPopup';
import {createGrid} from '../../src/utils/createGrid';
import {gridReducer} from '../utils/gridReducer';
import {GRID_HEIGHT, GRID_WIDTH, MINES} from '../constants';

export default function Grid() {
  const [gameState, dispatch] = React.useReducer(gridReducer, {
    grid: createGrid(GRID_HEIGHT, GRID_WIDTH, MINES),
    isGameStarted: false,
    isGameOver: false,
    hasWon: false,
    isMineInitialized: false,
  });

  function handlePress(row, col) {
    if (gameState.isGameOver || gameState.hasWon) {
      return;
    }
    if (!gameState.isGameStarted) {
      dispatch({type: 'start_game'});
    }
    if (!gameState.isGridInitialized) {
      dispatch({type: 'initialize_mines', row, col});
    }
    dispatch({type: 'flipped', row, col});
  }

  useEffect(() => {
    if (!gameState.isGameOver && gameState.isGameStarted) {
      const unflippedSafeTiles = gameState.grid.flat().filter(tile => !tile.isFlipped && !tile.isMine);
      if (unflippedSafeTiles.length === 0) {
        dispatch({type: 'win_game'});
      }
    }
  }, [gameState.grid]);

  return (
    <View style={styles.container}>
      <Timer isGameStarted={gameState.isGameStarted} isGameOver={gameState.isGameOver} hasWon={gameState.hasWon} />
      <View style={styles.gridContainer}>
        <GameStatusPopup isGameOver={gameState.isGameOver} hasWon={gameState.hasWon} />
        {gameState.grid.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {row.map((tile, tileIdx) => (
              <Tile key={tileIdx} handlePress={handlePress} {...tile} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
});
