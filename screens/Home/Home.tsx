import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Header from '../../components/Header/Header';
import ContactMessage from '../../components/ContactMessage/ContactMessage';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBar from '../../components/FilterBar/FilterBar';
import List from '../../components/List/List';

import { fetchData } from '../../helpers/helpers';

export default function Home({navigation, data, isLoading, setLoggedIn, animal, setAnimal, isToxic, setIsToxic, setIsLoading }) {
  const [clicked, setClicked] = useState<boolean>(false);
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    setSearchData(data)
  }, [])

  useEffect(() => {
    if (searchPhrase.length) {
      getSearchResults()
    } else {
      setSearchData(data)
    };
  }, [searchPhrase, data])

  const searchAndFilterResults = () => {
    fetchData(`plants/${animal + 's'}/${isToxic.toString().toUpperCase()}/${searchPhrase}`).then(plantData => {
        setIsLoading(false);
        setSearchData(plantData);
      })
  }

  const getSearchResults = () => {
    if (!animal && isToxic === null) {
      return fetchData(`/plants/search/${searchPhrase}`)
      .then(searchData => {
        setSearchData(searchData)
      })
    } else if (animal && isToxic || isToxic === false) {
      searchAndFilterResults();
    }
  }

  const getFilteredPlants = (cleared) => {
    if (cleared) {
      setSearchData(data)
      return
    }

    if (searchPhrase) {
      searchAndFilterResults();
    } else {
      fetchData(`plants/${animal + 's'}/${isToxic.toString().toUpperCase()}`).then(plantData => {
        setIsLoading(false);
        setSearchData(plantData);
      })
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header setLoggedIn={setLoggedIn} />
      <View style={styles.body}>
        <ContactMessage />
          <SearchBar clicked={clicked} setClicked={setClicked} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
          <FilterBar animal={animal} setAnimal={setAnimal} isToxic={isToxic} setIsToxic={setIsToxic} getFilteredPlants={getFilteredPlants} />
          {isLoading &&
            <>
              <Text>Loading...</Text>
              <ActivityIndicator size='large' />
            </>
          }
          {!isLoading && searchPhrase.length > 0 && !searchData.length &&
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
  },
  body: {
    flex: 8,
  },
})