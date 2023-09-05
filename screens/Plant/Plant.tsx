import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import ContactMessage from '../../components/ContactMessage/ContactMessage';
import PlantInfo from '../../components/PlantInfo/PlantInfo';

import { fetchData } from '../../helpers/helpers';

export default function Plant({route, setLoggedIn}) {
  const [plant, setPlant] = useState();

  useEffect(() => {getPlant()}, []);

  const getPlant = () => {
<<<<<<< HEAD
    console.log('plant', `https://pet-plants-be.onrender.com/plants/${route.params.id}`)
    return fetch(`https://pet-plants-be.onrender.com/plants/${route.params.id}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        return response.json()
      }
    }).then(plantData => {
=======
    return fetchData(`plants/${route.params.id}`)
    .then(plantData => {
>>>>>>> e91e489 (fix: updated files)
      setPlant(plantData[0])
    })
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header setLoggedIn={setLoggedIn} />
      <View style={styles.body}>
      <ScrollView>
        <ContactMessage />
        {plant && (
          <PlantInfo plant={plant} />
        )}
      </ScrollView>
      </View>
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
    backgroundColor: '#fff',
  },
})
