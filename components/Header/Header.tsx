import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Friendly Plants</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingTop: 42,
    paddingBottom: 42,
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold'
  }
});

export default Header;
