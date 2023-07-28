import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const Header = ({ userLogOut }: { userLogOut?: () => void}) => {
  return (
    <View>
      <Text style={styles.title}>Will This Plant Kill My Pet?</Text>
      {userLogOut && <Button title='Log Out' onPress={userLogOut} />}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 42,
    paddingBottom: 20,
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default Header;
