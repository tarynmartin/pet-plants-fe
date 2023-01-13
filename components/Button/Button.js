import { StyleSheet, Text, View } from 'react-native';

const Button = () => {
  return (
    <View style={styles.Button}>
      <Text style={styles.title}>Click Me!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Button: {
    // paddingTop: 42,
    // paddingBottom: 42,
    // backgroundColor: 'blue',
    // color: 'white',
    // textAlign: 'center',
    // fontSize: 32,
    // fontWeight: 'bold'
  }
});

export default Button;