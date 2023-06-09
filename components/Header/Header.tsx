import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    // <View style={styles.container}>
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
    fontWeight: 'bold'
  }
});

export default Header;
