import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import ContactMessage from '../../components/ContactMessage/ContactMessage';
import SearchBar from '../../components/SearchBar/SearchBar';
import List from '../../components/List/List';

export default function Home({navigation, data}) {
  const [clicked, setClicked] = useState<boolean>(false);
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [searchData, setSearchData] = useState([]);

  useEffect(() => setSearchData(data), [])

  useEffect(() => {
    if (searchPhrase.length) {
      getSearchResults()
    } else {
      setSearchData(data)
    };
  }, [searchPhrase, data])

  const getSearchResults = () => {
    return fetch(`https://pet-plants-be.onrender.com/plants/search/${searchPhrase}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        return response.json()
      }
    }).then(searchData => setSearchData(searchData))
  }

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <ContactMessage />
        {/* <View> */}
          <SearchBar clicked={clicked} setClicked={setClicked} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
          <List data={searchData} navigation={navigation} />
        {/* </View> */}
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
  },
  title: {
    fontSize: 32,
  },
})