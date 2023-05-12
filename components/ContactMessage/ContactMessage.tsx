import { StyleSheet, Text, View } from 'react-native';

const ContactMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WARNING: This is purely informational. If you are unsure of the plant your pet has ingested, call the ASPCA for help. DO NOT RELY ON THIS APP FOR DIAGNOSIS</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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