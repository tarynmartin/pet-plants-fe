import React, { useState, useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import * as SecureStore from 'expo-secure-store';

import { fetchData, logoutUser } from './helpers/helpers.tsx';

import Home from './screens/Home/Home.tsx';
import Plant from './screens/Plant/Plant.tsx';
import SignIn from './screens/SignIn/SignIn.tsx';
import SignUp from './screens/SignUp/SignUp.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
  const [plantsData, setPlantsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => setError(''), [])

  const setSecureKey = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  }

  const loginUser = (email, password) => {
    return fetchData('auth/sign-in', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      email, password
    })})
    .then(data => {
      if (data.message) {
        setError('There was a problem logging you in. Make sure your email and password are correct')
      } else {
        setLoggedIn(true);
        setSecureKey('refreshToken', data.refresh_token)
        setSecureKey('accessToken', data.access_token);
      }
    })
  }

  const signUpUser = (email, password) => {
    return fetchData('auth/sign-up', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      email, password
    })})
    .then(data => {
      if (data.message) {
        setError('There was a problem signing you up. Make sure your password is over 6 characters')
      } else {
        setLoggedIn(true);
        setSecureKey('refreshToken', data.refresh_token)
        setSecureKey('accessToken', data.access_token);
      }
    })
  }

  useEffect(() => {
    setIsLoading(true);
    getPlants();
    const getRefreshToken = async () => {
      let token;
      try {
        token = await SecureStore.getItemAsync('refreshToken');
      } catch (e) {
        setLoggedIn(false);
        console.log('no_refresh_token', e);
        console.error('no_refresh_token', e);
      }
      console.log('token', refreshToken)
      setRefreshToken(token);
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
              {props => <Home {...props} data={plantsData} isLoading={isLoading} logOut={() => logoutUser(setLoggedIn, setError)} />}
            </Stack.Screen>
            <Stack.Screen name="Plant">
              {props => <Plant {...props} logOut={() => logoutUser(setLoggedIn, setError)} />}
            </Stack.Screen>
          </> :
          <>
            <Stack.Screen name="Sign In">{props => <SignIn {...props} loginUser={loginUser} error={error} />}</Stack.Screen>
            <Stack.Screen name="Sign Up">{props => <SignUp {...props} signUpUser={signUpUser} error={error} />}</Stack.Screen>
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}