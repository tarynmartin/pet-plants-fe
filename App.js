import React, { useState, useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

import { fetchData, setSecureKeys } from './helpers/helpers.tsx';

import Home from './screens/Home/Home.tsx';
import Plant from './screens/Plant/Plant.tsx';
import SignIn from './screens/SignIn/SignIn.tsx';
import SignUp from './screens/SignUp/SignUp.tsx';
import VerifyOTP from './screens/VerifyOTP/VerifyOTP.tsx';
import PasswordReset from './screens/PasswordReset/PasswordReset.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
  const [plantsData, setPlantsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [animal, setAnimal] = useState('');
  const [isToxic, setIsToxic] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => setError(''), [])

  const loginUser = (email, password) => {
    setIsLoading(true);
    return fetchData('auth/sign-in', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      email, password
    })})
    .then(data => {
      if (data.message) {
        Toast.show({
          type: 'error',
          text1: 'There was a problem logging you in.',
          text2: data.message,
          visibilityTime: 6000,
        })
      } else {
        setLoggedIn(true);
        setSecureKeys(data);
      }
    })
  }

  const signUpUser = (email, password, phone, agreement) => {
    return fetchData('auth/sign-up', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      email, password, phone, agreement
    })})
    .then(data => {
      if (data.message) {
        setError('Error signing up')
        Toast.show({
          type: 'error',
          text1: 'There was a problem signing you up.',
          text2: 'Make sure your password is over 6 characters',
          visibilityTime: 6000,
        })
      } else {
        setLoggedIn(true);
        setSecureKey('refreshToken', data.refresh_token)
        setSecureKey('accessToken', data.access_token);
        Toast.show({
          text1: 'Success! You are now signed up.',
        })
      }
    })
  }

  useEffect(() => {
    getPlants();
    const getRefreshToken = async () => {
      let token;
      try {
        token = await SecureStore.getItemAsync('refreshToken');
      } catch (e) {
        setLoggedIn(false);
        setError('There was an error logging you in, please try again.')
        console.error('no_refresh_token', e);
      }
      setRefreshToken(token);
      setIsLoading(false);
    }
    getRefreshToken();
  }, [loggedIn])

  const getPlants = () => {
    return fetchData('plants/').then(plantData => {
      setPlantsData(plantData)
      setIsLoading(false)
    })
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {refreshToken ? 
          <>
            <Stack.Screen name="Home" options={{headerShown: false}}>
              {props => <Home {...props} data={plantsData} isLoading={isLoading} setIsLoading={setIsLoading} setLoggedIn={setLoggedIn} animal={animal} setAnimal={setAnimal} isToxic={isToxic} setIsToxic={setIsToxic} />}
            </Stack.Screen>
            <Stack.Screen name="Plant">
              {props => <Plant {...props} setLoggedIn={setLoggedIn} />}
            </Stack.Screen>
          </> :
          <>
            <Stack.Screen name="Sign In">{props => <SignIn {...props} loginUser={loginUser} error={error} isLoading={isLoading} />}</Stack.Screen>
            <Stack.Screen name="Sign Up">{props => <SignUp {...props} signUpUser={signUpUser} error={error} setError={setError} />}</Stack.Screen>
            <Stack.Screen name="One Time Password">{props => <VerifyOTP {...props} />}</Stack.Screen>
            <Stack.Screen name="Reset Password">{props => <PasswordReset {...props} setLoggedIn={setLoggedIn}/>}</Stack.Screen>
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}