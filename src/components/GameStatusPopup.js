import React from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';

const GameStatusPopup = ({isGameOver, hasWon}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isGameOver || hasWon) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isGameOver, hasWon]);

  if (!isGameOver && !hasWon) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          backgroundColor: hasWon ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)',
        },
      ]}>
      <Text style={styles.text}>{hasWon ? 'You Won!' : 'Game Over!'}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameStatusPopup;
