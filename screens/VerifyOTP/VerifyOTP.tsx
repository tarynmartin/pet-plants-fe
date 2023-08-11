import React, { useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, ScrollView, View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { fetchData, setSecureKeys } from '../../helpers/helpers';

export default function VerifyOTP({navigation }) {
  // set below to an empty string when sms can be used
  const [ contactChoice, setContactChoice ] = useState<string>('email')
  const [ email, setEmail ] = useState<string>('');
  const [ phone, setPhone ] = useState<string>('');
  const [ code, setCode ] = useState<string>('');
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [ otpRequestMade, setOTPRequestMade ] = useState<boolean>(false);

  // TODO: add sms in future when charging users

  const getOTP = (type, content) => {
    setLoadingState(true);
    return fetchData(`auth/${type}-otp-signin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      [type]: content
    })}).then(data => {
      if (data.message) {
        Toast.show({
          type: 'error',
          text1: 'There was a problem getting your one time code.',
          text2: 'Please resubmit your info',
          visibilityTime: 6000,
        })
        console.error('error getting otp', data);
      } else {
        type === 'email' ? setPhone('') : setEmail('');
        setOTPRequestMade(true);
      }
      setLoadingState(false);
    })
  }

  const verifyOTP = () => {
    setLoadingState(true);

    return fetchData(`auth/verify-${contactChoice}-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      [contactChoice]: contactChoice === 'phone' ? phone : email,
      token: code,
      type: contactChoice === phone ? 'sms' : 'email',
    })}).then(data => {
      if (data.message) {
        setCode('');
        setOTPRequestMade(false);
        Toast.show({
          type: 'error',
          text1: 'There was a problem with your one time code.',
          text2: 'Make sure your code is the same as you received and is 6 characters',
          visibilityTime: 6000,
        })
        console.error('error verifying otp', data);
      } else {
        setCode('');
        setEmail('');
        setPhone('');
        setOTPRequestMade(false);
        setSecureKeys(data.session, 'id')
        navigation.navigate('Reset Password')
      }
      setLoadingState(false);
    })
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
        {!loadingState && 
          <ScrollView contentContainerStyle={styles.scrollview}>
            <Text>Get a one time code to reset password</Text>
            <View style={styles.body}>
              {/* {!contactChoice && (
                <View>
                  <Button onPress={() => setContactChoice('email')} label='Get one time code by email' text='Email' />
                  <Button onPress={() => setContactChoice('phone')} label='Get one time code by text' text='Text' />
                </View>
              )}
              {!otpRequestMade && contactChoice && (
                <Button onPress={() => setContactChoice(contactChoice === 'phone' ? 'email' : 'phone')} label={`Get one time code by ${contactChoice === 'phone' ? 'email' : 'phone'}`} text={`Change Method to ${contactChoice === 'phone' ? 'Email' : 'Text'}`} />
              )} */}
              {!otpRequestMade && contactChoice === 'email' && (
                <>
                  <Input label='Email' value={email} setValue={setEmail} placeholder='anne@example.com' keyboardType='email-address' />
                  <Button onPress={() => getOTP('email', email)} label='Get one time code by email' text='By Email' disabled={!email.length} />
                </>
              )}
              {/* {!otpRequestMade && contactChoice === 'phone' && (
                <>
                  <Input label='Phone Number' value={phone} setValue={setPhone} keyboardType='phone-pad' placeholder='555-555-5555'/>
                  <Button onPress={() => getOTP('phone', phone)} label='Get one time code by text' text='By Text' />
                </>
              )} */}
              {otpRequestMade && (
                <>
                  <Input label='One Time Code' value={code} setValue={setCode} placeholder='012345' keyboardType='numeric' />
                  <Button onPress={verifyOTP} label='Click here to verify your one time code' text='Verify Code' disabled={code.length !== 6} />
                </>
              )}
            </View>
            <View style={{ flex : 1 }} />
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
    flex: 1,
    alignItems: 'center',
    paddingBottom: 30,
  },
  body: {
    width: '75%',
  }
})