import {StyleSheet, View} from 'react-native';
import Grid from './src/components/Grid';

export default function App() {
  return (
    <View style={styles.container}>
      <Grid />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
