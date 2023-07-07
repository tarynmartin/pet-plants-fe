import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import SignInForm from '../../components/SignIn/SignInForm';
import Button from '../../components/Button/Button';

export default function SignIn({navigation, loginUser, error}) {
  const [userEmail, setUserEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('placeholder')
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const submitLogin = () => {
    loginUser(userEmail, password)
  }

  const goToSignUp = () => navigation.navigate('Sign Up')

  const goToPasswordReset = () => navigation.navigate('Password Reset')

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
        <Button onPress={goToSignUp} label='Click here to sign up for an account' text='Sign Up' />
        <SignInForm userEmail={userEmail} setUserEmail={setUserEmail} password={password} setPassword={setPassword} error={error} />
        <Button onPress={goToPasswordReset} label='Click here to reset your password' text='Forgot your password?' />
        <Button onPress={submitLogin} label='Click here to log in' text='Log In' />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
})