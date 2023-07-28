import React, { useState } from 'react';
import { SafeAreaView, Switch, Text, ActivityIndicator, View, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/Header/Header';
import SignInForm from '../../components/SignIn/SignInForm';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function SignUp({signUpUser, error, setError }) {
  const [userEmail, setUserEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('');
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const [ phone, setPhone ] = useState<string>('');
  const [ agreement, setAgreement] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const submitUser = () => {
    if (userEmail.length && password.length && agreement) {
      setLoadingState(true);
      signUpUser(userEmail, password, phone, agreement)
    } else {
      setError('You must provide either an email address, password, and accept the agreement to sign up')
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      {!loadingState && 
        <ScrollView contentContainerStyle={styles.scrollview}>
          <SignInForm userEmail={userEmail} setUserEmail={setUserEmail} password={password} setPassword={setPassword} error={error} />
          <View style={styles.inputDiv}>
            <Input label='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} />
            <Input label='Phone Number' value={phone} setValue={setPhone} keyboardType='phone-pad' placeholder='555-555-5555' />
          </View>
          <Text style={styles.agreement}>By clicking below, you are agreeing that you will not hold this app responsible for any outcomes you or your pet/pets may have based on the information presented here. This app is only for informational purposes, not diagnostic and/or treatment of anything an animal may have ingested or come into contact with.</Text>
          <Switch onValueChange={() => setAgreement(prevState => !prevState)} value={agreement} trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={agreement ? '#f5dd4b' : '#f4f3f4'}
            />
          <Button onPress={submitUser} label='Click here to complete sign up process' text='Sign Up' disabled={!userEmail.length && !password.length && !agreement && password !== confirmPassword} />
        </ScrollView>
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
  },
  scrollview: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  inputDiv: {
    width: '75%',
  },
  agreement: {
    padding: 16,
  }
})