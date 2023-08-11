import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../Button/Button';

const ContactMessage = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  return (
    <View style={styles.message}>
      {!showMessage && (
        <Button text='Need Poison Control?' onPress={() => setShowMessage(true)} label='Get poison control phone number' buttonStyle='danger' />
      )}
      {showMessage && (
        <>
          <Text style={styles.title}>If you think your pet has ingested a potentially poisonous substance, call the ASPCA Animal Poison Control Center (888) 426-4435. A consultation fee may apply</Text>
          <Button text='Close Message' onPress={() => setShowMessage(false)} label='Close message' />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'lightpink',
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  }
});

export default ContactMessage;