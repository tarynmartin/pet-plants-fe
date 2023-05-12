import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header/Header';
import ContactMessage from '../../components/ContactMessage/ContactMessage';
import Button from '../../components/Button/Button';

export default function Home({navigation, data, getData, setSelectedItem}) {
  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
      <ScrollView>
        <ContactMessage />
        <Button getData={getData}/>
        <View>
        <FlatList data={data} keyExtractor={item => item.id} renderItem={({item}) => <Text style={styles.item} onPress={() => {
          setSelectedItem(item)
          navigation.navigate('Plant', item)
          }}>{item.thing}</Text>}>
          {/* put in plantsData; display scientificName */}
          {/* {things.map(item => (
            <Text style={styles.item}>{item.thing}</Text>
          ))} */}
        </FlatList>
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