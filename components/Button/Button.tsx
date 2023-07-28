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
  return (
    <Pressable onPress={onPress}  accessibilityLabel={label} style={styles[buttonStyle || 'button']} disabled={disabled}>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'navy',
    borderRadius: 5,
  },
  danger: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'crimson',
    borderRadius: 5,
  },
  success: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'darkgreen',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontWeight: '500',
  }
})