import { StyleSheet, Text, View, Button as ImportedButton, TouchableOpacity } from 'react-native';

const Button = ({getData}) => {
  return (
    <View style={styles.container} class="container">
      <ImportedButton style={styles.Button} onPress={getData} title='Click Me!' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  Button: {
    paddingTop: 42,
    paddingBottom: 42,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    width: 50
  }
});

export default Button;