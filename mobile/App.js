import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>HELLO WORLD!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#FFFFFF',
    backgroundColor: '#FC7B6D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFFFFF',
  }
});
