import React, { useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import { SafeAreaView, Text, ActivityIndicator, ScrollView, View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { fetchData, setSecureKeys } from '../../helpers/helpers';

export default function VerifyOTP({navigation }) {
  const [ email, setEmail ] = useState<string>('');
  const [ phone, setPhone ] = useState<string>('');
  const [ code, setCode ] = useState<string>('');
  const [ isDisabled, setIsDisabled ] = useState<boolean>(true);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  // TODO: add toggle for showing/hiding password
  // TODO: how to move input above keyboard when the input has been selected?
  // TODO: set up phone OTP in supabase?
  // TODO: remove dashes in phone #?

  const getOTP = (type, content) => {
    setLoadingState(true);
    return fetchData(`auth/${type}-otp-signin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      [type]: content
    })}).then(data => {
      if (data.message) {
        setIsDisabled(true);
        Toast.show({
          type: 'error',
          text1: 'There was a problem getting your one time code.',
          text2: 'Please resubmit your info',
          visibilityTime: 6000,
        })
        console.error('error getting otp', data);
      } else {
        type === 'email' ? setPhone('') : setEmail('');
        setIsDisabled(false);
      }
      setLoadingState(false);
    })
  }

  const verifyOTP = () => {
    setLoadingState(true);
    const type = phone?.length > 0 ? 'phone' : 'email';

    return fetchData(`auth/verify-${type}-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      [type]: type === 'phone' ? phone : email,
      token: code,
      type: type === phone ? 'sms' : 'email',
    })}).then(data => {
      if (data.message) {
        setCode('');
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
        setSecureKeys(data.session, 'id')
        navigation.navigate('Reset Password')
      }
      setLoadingState(false);
    })
  }

  const height = useHeaderHeight();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <SafeAreaView style={styles.screen}>
        <Header />
          {!loadingState && 
                <ScrollView contentContainerStyle={styles.scrollview}>
                  <Text>Get a one time code to reset password</Text>
                  <View style={styles.body}>
                    <Input label='Phone Number' value={phone} setValue={setPhone} keyboardType='phone-pad' placeholder='555-555-5555'/>
                    <Button onPress={() => getOTP('phone', phone)} label='Get one time code by text' text='By Text' />
                    <Input label='Email' value={email} setValue={setEmail} placeholder='anne@example.com' keyboardType='email-address' />
                    <Button onPress={() => getOTP('email', email)} label='Get one time code by email' text='By Email' />
                    <Input label='One Time Code' value={code} setValue={setCode} placeholder='012345' keyboardType='numeric' />
                    <Button onPress={verifyOTP} label='Click here to verify your one time code' text='Verify Code' disabled={isDisabled} />
                  </View>
                  <View style={{ flex : 1 }} />
                </ScrollView>
          }
          {loadingState && <ActivityIndicator size='large' />}
      </SafeAreaView>
      <Toast />
    </KeyboardAvoidingView>
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