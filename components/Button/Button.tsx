import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  onPress: () => void,
  label: string,
  text: string,
  buttonStyle?: string,
  disabled?: boolean
}

export default function Button({ onPress, label, text, buttonStyle, disabled = false}: ButtonProps) {
  let style;

  if (buttonStyle) {
    style = buttonStyle;
  } else if (disabled) {
    style = 'disabledButton'
  } else if (text === 'Log Out') {
    style = 'clear'
  } else {
    style = 'button'
  }

  return (
    <Pressable onPress={onPress}  accessibilityLabel={label} style={styles[style]} disabled={disabled}>
        <Text style={styles[style === 'clear' ? 'darkText' : 'text']}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  disabledButton: {
    marginTop: 16,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  button: {
    marginTop: 16,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'navy',
    borderRadius: 5,
  },
  danger: {
    marginTop: 16,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'crimson',
    borderRadius: 5,
  },
  success: {
    marginTop: 16,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'darkgreen',
    borderRadius: 5,
  },
  clear: {
    marginTop: 16,
    paddingTop: 15,
    paddingBottom: 5,
    paddingRight: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '500',
  },
  darkText: {
    color: 'black',
    textDecorationLine: 'underline',
    fontWeight: '500',
  }
})