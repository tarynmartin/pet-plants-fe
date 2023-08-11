import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../Button/Button';
import { logoutUser } from '../../helpers/helpers';

const Header = ({ setLoggedIn}: { setLoggedIn?: () => void}) => {
  return (
    <View style={setLoggedIn ? styles.logoutHeader : styles.header}>
      {setLoggedIn && (
        <View style={styles.logoutButton}>
          <Button label="Click to log out" text='Log Out' onPress={() => logoutUser(setLoggedIn)} />
        </View>
      )}
      <Text style={styles.title}>Will This Plant Kill My Pet?</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logoutHeader: {
    width: '100%',
  },
  header: {
    paddingTop: 24,
    width: '100%',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default Header;
