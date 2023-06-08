import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import ContactMessage from '../../components/ContactMessage/ContactMessage';


export default function Plant({navigation, route}) {
  console.log('navigation', navigation.params)
  const [plant, setPlant] = useState();

  useEffect(() => {getPlant()}, []);

  const getPlant = () => {
    return fetch(`https://pet-plants-be.onrender.com/plants/${route.params.id}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        return response.json()
      }
    }).then(plantData => {
      setPlant(plantData[0])
    })

  }

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
      <ScrollView>
        <ContactMessage />
        {plant && (
        <View>
          <p>Name: {plant?.name || ''}</p>
          <p>Scientific Name: {plant.scientificName}</p>
          <p>Other Names: {plant.popularNames} </p>
        </View>
        )}
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