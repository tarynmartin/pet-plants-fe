import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { fetchData } from '../../helpers/helpers';

export default function VerifyOTP({navigation}) {
  const [ email, setEmail ] = useState<string>('');
  const [ phone, setPhone ] = useState<string>('');
  const [ code, setCode ] = useState<string>('');
  const [ isDisabled, setIsDisabled ] = useState<boolean>(true);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const sendOTP = (type, content) => {
    return fetchData(`auth/${type}-otp-signin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      type: content
    })}).then(data => {
      if (data.message) {
        // display error message
        setIsDisabled(true);
        console.error('error getting otp', data);
      } else {
        setIsDisabled(false);
      }
    })
  }

  const verifyOTP = () => {
    const type = phone?.length > 0 ? 'phone' : 'email';
    return fetchData(`auth/verify-${type}-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      type: type === 'phone' ? phone : email,
      token: code
    })}).then(data => {
      if (data.message) {
        // display error from verification
        console.error('error verifying otp', data);
      }
      // else, move to next page
    })
  }

  // where does error of user not existing happen?

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
        <Text>Get a one time code to reset password</Text>
        <Input label='Phone Number' value={phone} setValue={setPhone} keyboardType='phone-pad' />
        <Button onPress={() => sendOTP('phone', phone)} label='Get one time code by text' text='By Text' />
        <Input label='Email' value={email} setValue={setEmail} placeholder='anne@example.com' keyboardType='email-address' />
        <Button onPress={() => sendOTP('email', email)} label='Get one time code by email' text='By Email' />
        <Input label='One Time Code' value={code} setValue={setCode} placeholder='012345' keyboardType='numeric' />
        <Button onPress={verifyOTP} label='Click here to verify your one time code' text='Verify Code' disabled={isDisabled} />
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