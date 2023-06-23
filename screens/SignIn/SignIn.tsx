import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import SignInForm from '../../components/SignIn/SignInForm';

export default function SignIn({navigation, loginUser, error}) {
  const [userEmail, setUserEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('placeholder')
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const submitLogin = () => {
    loginUser(userEmail, password)
  }

  const goToSignUp = () => navigation.navigate('Sign Up')

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
        <Button onPress={goToSignUp} title='Sign Up' accessibilityLabel='Click here to sign up for an account'/>
        <SignInForm submitLogin={submitLogin} userEmail={userEmail} setUserEmail={setUserEmail} password={password} setPassword={setPassword} error={error} page='sign-in' />
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
    width: '75%',
    paddingTop: 24,
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
  loginBtn: {
    paddingTop: 16,
    alignItems: 'center'
  }
})