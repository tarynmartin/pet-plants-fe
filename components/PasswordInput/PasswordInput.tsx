import React from 'react';
import { TextInput, Text, View, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTogglePasswordVisibility } from '../../helpers/hooks';

export default function PasswordInput({ label, value, setValue }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput onChangeText={setValue} value={value} secureTextEntry={passwordVisibility} style={styles.textInput} keyboardType='default' maxLength={24} />
        <Pressable onPress={handlePasswordVisibility} style={styles.toggle}>
          <Ionicons name={rightIcon} size={22} color="#232323" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: '85%',
  },
  toggle: {
    width: '12%',
    paddingRight: 10,
  }
})