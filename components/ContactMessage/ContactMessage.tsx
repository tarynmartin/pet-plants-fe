import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ContactMessage = () => {
  return (
    <View>
      <Text style={styles.title}>WARNING: This is purely informational. If you think you're pet has ingested a potentially poisonous substance, call (888) 426-4435. A consultation fee may apply</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'lightpink',
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  }
});

export default ContactMessage;