import React, { useState } from 'react';
import { SafeAreaView, Switch, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import SignInForm from '../../components/SignIn/SignInForm';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function SignUp({signUpUser, error}) {
  const [userEmail, setUserEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [ phone, setPhone ] = useState();
  const [ agreement, setAgreement] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const submitUser = () => {
    signUpUser(userEmail, password, phone, agreement)
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      <SignInForm userEmail={userEmail} setUserEmail={setUserEmail} password={password} setPassword={setPassword} error={error} />
      <Input label='Phone Number' value={phone} setValue={setPhone} keyboardType='phone-pad' />
      <Text>By clicking below, you are agreeing that you will not hold this app responsible for any outcomes you or your pet/pets may have based on the information presented here. This app is only for informational purposes, not diagnostic and/or treatment of anything an animal may have ingested or come into contact with.</Text>
      <Switch onValueChange={() => setAgreement(prevState => !prevState)} value={agreement} trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={agreement ? '#f5dd4b' : '#f4f3f4'}
        />
      <Button onPress={submitUser} label='Click here to complete sign up process' text='Sign Up' disabled={!agreement} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
})