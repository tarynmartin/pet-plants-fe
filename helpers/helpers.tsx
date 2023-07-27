import React from 'react';
import * as SecureStore from 'expo-secure-store';

export const fetchData = (endpoint, body) => {
  return fetch(`https://pet-plants-be.onrender.com/${endpoint}`, body)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    } else {
      return response.json()
    }})
}

export const logoutUser = (setLoggedIn, setError) => {
    try {
      return fetch(`https://pet-plants-be.onrender.com/auth/sign-out`, { method: 'POST', headers: { 'Content-Type': 'application/json' }}).then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        setLoggedIn(false);
        SecureStore.deleteItemAsync('refreshToken')
        SecureStore.deleteItemAsync('accessToken');
        setError('');
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