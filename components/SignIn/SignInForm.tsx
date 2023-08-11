import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Input from '../Input/Input';
import PasswordInput from '../PasswordInput/PasswordInput';

export default function SignInForm({ userEmail, setUserEmail, password, setPassword, error}) {

  return (
    <View style={styles.body}>
      <Input label='Email' value={userEmail} setValue={setUserEmail} placeholder='anne@example.com' keyboardType='email-address' />
      <PasswordInput label='Password' value={password} setValue={setPassword} />
      {error.length > 0 && <Text style={styles.errorMessage} >{error}</Text>}
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  body: {
    width: '75%',
    paddingTop: 10,
    justifyContent: 'center'
  },
  errorMessage: {
    color: 'red'
  },
})