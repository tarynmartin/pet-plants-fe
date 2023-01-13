import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import Header from './components/Header/Header';
import ContactMessage from './components/ContactMessage/ContactMessage';
import Button from './components/Button/Button';

export default function App() {
  return (
    <View>
      <Header />
      <StatusBar />
      <ScrollView>
        <ContactMessage />
        <Button />
      </ScrollView>
    </View>
  );
}
