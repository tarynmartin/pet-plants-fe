import React, { useState } from 'react';
import { Button, SafeAreaView, TextInput, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import SignInForm from '../../components/SignIn/SignInForm';

export default function SignUp({signUpUser, error}) {
  const [userEmail, setUserEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('placeholder')
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const submitUser = () => {
    signUpUser(userEmail, password)
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      <SignInForm submitLogin={submitUser} userEmail={userEmail} setUserEmail={setUserEmail} password={password} setPassword={setPassword} error={error} page='sign-up' />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  body: {
    flex: 8,
    width: '100%',
  },
})