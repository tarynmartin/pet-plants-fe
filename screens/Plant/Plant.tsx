import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header/Header';
import ContactMessage from '../../components/ContactMessage/ContactMessage';


// show selected item
export default function Plant({navigation, item, setSelectedItem}) {
  console.log('navigation', navigation.params)
  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
      <ScrollView>
        <ContactMessage />
        <View style={styles.item}>
          {item.thing}
        </View>
      </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 8,
    width: '100%',
    backgroundColor: '#14141410'
  },
  item: {
    backgroundColor: 'cadetblue',
    color: 'white',
    textTransform: 'capitalize',
    height: 50,
    width: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 5
  },
  title: {
    fontSize: 32,
  },
})