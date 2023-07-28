import React, { useState } from 'react';
import { SafeAreaView, ActivityIndicator, View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/Header/Header';
import SignInForm from '../../components/SignIn/SignInForm';
import Button from '../../components/Button/Button';

export default function SignIn({navigation, loginUser, error}) {
  const [userEmail, setUserEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('placeholder')
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const submitLogin = () => {
    setLoadingState(true);
    loginUser(userEmail, password)
    setLoadingState(false);
  }

  const goToSignUp = () => navigation.navigate('Sign Up')

  const goToVerifyOTP = () => navigation.navigate('One Time Password')

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      {!loadingState && 
        <>
          <View style={styles.buttons}>
            <Button onPress={goToSignUp} label='Click here to sign up for an account' text='Sign Up' buttonStyle='success' />
            <Button onPress={goToVerifyOTP} label='Click here to reset your password' text='Forgot your password?' buttonStyle='danger' />
          </View>
          <SignInForm userEmail={userEmail} setUserEmail={setUserEmail} password={password} setPassword={setPassword} error={error} />
          <Button onPress={submitLogin} label='Click here to log in' text='Log In' />
        </>
      }
      {loadingState && <ActivityIndicator size='large' />}
      <Toast />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
  }
})