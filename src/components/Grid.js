import React from 'react';
import {StyleSheet, View} from 'react-native';
import Tile from './Tile';
import {createGrid} from '../../src/utils/createGrid';
import {gridReducer} from '../utils/gridReducer';
import {GRID_HEIGHT, GRID_WIDTH, MINES} from '../constants';

export default function Grid() {
  const [gameState, dispatch] = React.useReducer(gridReducer, {
    grid: createGrid(GRID_HEIGHT, GRID_WIDTH, MINES),
  });

  function handlePress(row, col) {
    dispatch({type: 'flipped', row, col});
  }

  return (
    <View style={styles.container}>
      {gameState.grid.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((tile, tileIdx) => (
            <Tile key={tileIdx} handlePress={handlePress} {...tile} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
