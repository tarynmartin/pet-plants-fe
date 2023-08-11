import React, { useState } from 'react';
import { SafeAreaView, Switch, Text, ActivityIndicator, View, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/Header/Header';
import SignInForm from '../../components/SignIn/SignInForm';
import Input from '../../components/Input/Input';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Button from '../../components/Button/Button';

export default function SignUp({signUpUser, error, setError }) {
  const [userEmail, setUserEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('');
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const [ phone, setPhone ] = useState<string>('');
  const [ agreement, setAgreement] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0)

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
          {step === 0 && (
            <>
              <SignInForm userEmail={userEmail} setUserEmail={setUserEmail} password={password} setPassword={setPassword} error={error} />
              <View style={styles.inputDiv}>
                <PasswordInput label='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} />
              </View>
              <Button onPress={() => setStep(1)} label='Click here to go to the next step of the sign up process' text='Next' disabled={!userEmail.length || !password.length || !confirmPassword || password !== confirmPassword} />
            </>
          )}
          {step === 1 && (
            <>
              <View style={styles.inputDiv}>
                <Input label='Phone Number' value={phone} setValue={setPhone} keyboardType='phone-pad' placeholder='555-555-5555' />
              </View>
              <Button onPress={() => setStep(2)} label='Click here to go to the next step of the sign up process' text='Next' disabled={!userEmail.length && !password.length && password !== confirmPassword} />
            </>
          )}
          {step === 2 && (
            <>
              <Text style={styles.agreement}>By clicking below, you are agreeing that you will not hold this app responsible for any outcomes you or your pet/pets may have based on the information presented here. This app is only for informational purposes, not diagnostic and/or treatment of anything an animal may have ingested or come into contact with.</Text>
              <Switch onValueChange={() => setAgreement(prevState => !prevState)} value={agreement} trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={agreement ? '#f5dd4b' : '#f4f3f4'}
                />
              <Button onPress={submitUser} label='Click here to complete sign up process' text='Sign Up' disabled={!agreement} />
            </>
          )}
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