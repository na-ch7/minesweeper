import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export default function Tile({row, col, value, isMine, isFlipped, isFlagged, handlePress, handleLongPress}) {
  return (
    <Pressable onPress={() => handlePress(row, col)} style={[styles.container, isFlipped && styles.flipped]}>
      <Text style={styles.text}>{isFlipped && (isMine ? '💣' : value > 0 && value)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    backgroundColor: '#4e43fe',
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  flipped: {
    backgroundColor: '#c5ff21',
    borderColor: '#3d6e0f',
  },
  text: {
    fontSize: 22,
    fontWeight: '800',
    color: '#3d6e0f',
  },
});
