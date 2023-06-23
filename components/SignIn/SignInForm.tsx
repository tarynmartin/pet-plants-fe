import React from 'react';
import { TouchableHighlight, Button, TextInput, Text, View, StyleSheet } from 'react-native';

export default function SignInForm({submitLogin, userEmail, setUserEmail, password, setPassword, error, page}) {

  return (
    <View style={styles.body}>
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput onChangeText={setUserEmail} value={userEmail} keyboardType='email-address' placeholder='anne@example.com'style={styles.textInput} />
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput onChangeText={setPassword} value={password} secureTextEntry={true} style={styles.textInput} />
      {error.length > 0 && <Text style={styles.errorMessage} >{error}</Text>}
      <TouchableHighlight onPress={submitLogin}  accessibilityLabel={`Click here to complete ${page === 'sign-in'? 'login' : 'sign in'} process`}style={styles.loginBtn}>
        <Button title={page === 'sign-in' ? "Log In" : 'Sign Up'} />
      </TouchableHighlight>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  body: {
    width: '75%',
    paddingTop: 24,
    justifyContent: 'center'
  },
  inputLabel: {
    fontWeight: '600',
    paddingBottom: 16,
    paddingTop: 16,
    fontSize: 20,
  },
  textInput: {
    backgroundColor: 'lightgray',
    height: 40,
    padding: 4,
    fontSize: 20,
  },
  errorMessage: {
    color: 'red'
  },
  loginBtn: {
    paddingTop: 16,
    alignItems: 'center'
  }
})