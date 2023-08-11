import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/Header/Header';
import ContactMessage from '../../components/ContactMessage/ContactMessage';
import SearchBar from '../../components/SearchBar/SearchBar';
import List from '../../components/List/List';

export default function Home({navigation, data, isLoading, setLoggedIn}) {
  const [clicked, setClicked] = useState<boolean>(false);
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [searchData, setSearchData] = useState([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    setSearchData(data)
  }, [])

  useEffect(() => {
    if (searchPhrase.length) {
      setLoadingState(true);
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
    }).then(searchData => {
      setSearchData(searchData)
      setLoadingState(false);
    })
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header setLoggedIn={setLoggedIn} />
      <View style={styles.body}>
        <ContactMessage />
          <SearchBar clicked={clicked} setClicked={setClicked} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
          {isLoading || loadingState &&
            <>
              <Text>Loading...</Text>
              <ActivityIndicator size='large' />
            </>
          }
          {(!isLoading || !loadingState) && searchPhrase.length > 0 && !searchData.length &&
            <Text>{`There are no results for ${searchPhrase}`}</Text>
          }
          <List data={searchData} navigation={navigation} />
      </View>
      <Toast />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 8,
    width: '100%',
  },
})