import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';

const Timer = ({isGameStarted, isGameOver, hasWon}) => {
  const [time, setTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    if (isGameStarted && !isGameOver && !hasWon) {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setTimerInterval(interval);
    } else if (isGameOver || hasWon) {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isGameStarted, isGameOver, hasWon]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return <Text style={styles.timer}>{formatTime(time)}</Text>;
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default Timer;