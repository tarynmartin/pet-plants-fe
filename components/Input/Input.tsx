import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

export default function Input({ label, value, setValue, placeholder, keyboardType }) {
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
        <TextInput onChangeText={setValue} value={value} secureTextEntry={label.includes('Password')} style={styles.textInput} placeholder={placeholder || ''} keyboardType={keyboardType || 'default'} />
    </View>
  )
}

const styles = StyleSheet.create({
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
  }
})