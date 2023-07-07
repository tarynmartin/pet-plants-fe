import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  onPress: () => void,
  label: string,
  text: string,
  disabled?: boolean
}

export default function Button({ onPress, label, text, disabled = false}: ButtonProps) {
  return (
    <Pressable onPress={onPress}  accessibilityLabel={label} style={styles.button} disabled={disabled}>
        <Text>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 16,
    alignItems: 'center'
  }
})