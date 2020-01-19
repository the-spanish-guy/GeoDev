import React from 'react';
import { StatusBar, StyleSheet } from "react-native";
import Routes from './src/routes'

export default function App() {
  return (
    <>
      <StatusBar style={style.cent} barStyle="light-content" backgroundColor="#FC7B6D" />
      <Routes />
    </>
  );
}

const style = StyleSheet.create({
  cent: {
    textAlign: 'center',
    justifyContent: "center",
    alignSelf: "center"
  }
})