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
      console.log('error logging out user', e);
    }
  }