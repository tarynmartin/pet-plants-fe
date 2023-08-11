import React, { useState } from 'react';
import { Text, View, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Button from '../../components/Button/Button';
import { fetchData } from '../../helpers/helpers';
import * as SecureStore from 'expo-secure-store';


export default function PasswordReset({ setLoggedIn }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('')
  const [loadingState, setLoadingState] = useState<boolean>(false);

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
      setLoadingState(true);
      const id = await getID();
      return fetchData('auth/update-user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        newPassword: confirmPassword,
        id
      })}).then(data => {
        if (data.message) {
          Toast.show({
          type: 'error',
          text1: 'There was a problem resetting your password',
          text2: data.message,
          visibilityTime: 6000,
        })
          console.error('error resetting password', data)
        } else {
          setPassword('');
          setConfirmPassword('');
          setLoggedIn(true);
          Toast.show({
          text1: 'Success! Your password was changed',
        })
        }
        setLoadingState(false);
      })
    } else {
      setConfirmPassword('');
      setError('Your passwords do not match. Please re-enter them')
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
    <View style={styles.body}>
      {!loadingState &&
        <View style={styles.body}>
          <Text>Set New Password</Text>

          <PasswordInput label='New Password' setValue={setPassword} value={password} />
          <PasswordInput label='Confirm Password' setValue={setConfirmPassword} value={confirmPassword} />

          {error.length > 0 && <Text style={styles.errorMessage} >{error}</Text>}

          <Button onPress={updatePassword} label='Click here to submit new password' text='Submit New Password' disabled={password !== confirmPassword} />
        </View>
      }
      {loadingState && <ActivityIndicator size='large' />}
      <Toast />
    </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  body: {
    width: '85%',
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 14,
    justifyContent: 'center'
  },
  inputLabel: {
    fontWeight: '600',
    paddingBottom: 16,
    paddingTop: 16,
    fontSize: 20,
  },
  textInput: {
    backgroundColor: 'lightgray',
    height: 40,
    padding: 4,
    fontSize: 20,
  },
  errorMessage: {
    color: 'red'
  },
})