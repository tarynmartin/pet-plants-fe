import React from 'react';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message'

export const fetchData = (endpoint, body) => {
  return fetch(`https://pet-plants-be.onrender.com/${endpoint}`, body)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    } else {
      return response.json()
    }})
}

export const logoutUser = (setLoggedIn) => {
    try {
      return fetch(`https://pet-plants-be.onrender.com/auth/sign-out`, { method: 'POST', headers: { 'Content-Type': 'application/json' }}).then(response => {
      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'There was a problem logging you out.',
          text2: response.statusText,
          visibilityTime: 6000,
        })
      } else {
        SecureStore.deleteItemAsync('refreshToken')
        SecureStore.deleteItemAsync('accessToken');
        setLoggedIn(false);
      }})
    } catch (e) {
      console.error('error_logging_out_user', e);
    }
  }

const setSecureKey = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  }

export const setSecureKeys = (data, id?: string) => {
  if (id) {
    setSecureKey('uid', data.user.id)
  }
  setSecureKey('refreshToken', data.refresh_token)
  setSecureKey('accessToken', data.access_token);
}