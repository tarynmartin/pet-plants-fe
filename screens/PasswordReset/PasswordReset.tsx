import React, { useState, useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { fetchData } from '../../helpers/helpers';
import * as SecureStore from 'expo-secure-store';

export default function PasswordReset({ navigation, setLoggedIn }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('')

  const getID = async () => {
    let id;
    try {
      id = await SecureStore.getItemAsync('uid');
    } catch (e) {
      console.error('no_id_update_password', e)
    }
    return id
  };

  const updatePassword = async () => {
    if (password === confirmPassword) {
      const id = await getID();
      return fetchData('auth/update-user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        newPassword: confirmPassword,
        id
      })}).then(data => {
        if (data.message) {
          console.error('error resetting password', data)
        } else {
          setLoggedIn(true);
        }
      })
    } else {
      setError('Your passwords do not match. Please re-enter them')
    }
  }

  const isDisabled = useMemo(() => password === confirmPassword, [password, confirmPassword]);

  return (
    <View style={styles.body}>
      <Text>Set New Password</Text>
      <Input label='New Password' value={password} setValue={setPassword} />
      <Input label='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} />
      {error.length > 0 && <Text style={styles.errorMessage} >{error}</Text>}
      <Button onPress={updatePassword} label='Click here to submit new password' text='Submit New Password' disabled={!isDisabled} />
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
    paddingTop: 24,
    justifyContent: 'center'
  },
  errorMessage: {
    color: 'red'
  },
})