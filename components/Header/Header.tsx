import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Header = () => {
  return (
      <Text style={styles.title}>Will This Plant Kill My Pet?</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 42,
    paddingBottom: 42,
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default Header;
