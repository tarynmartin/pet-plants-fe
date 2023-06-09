import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { View, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import AnimalIcon from '../AnimalIcon/AnimalIcon';

const Card = ({ data, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => {navigation.navigate('Plant', { id: data.id, name: data.name})}}style={styles.highlight} >
        <View style={styles.itemContainer}>
          <View>
            <Image source={{uri: data.image_url}} style={styles.image} />
            <Text style={styles.item}>{data.name}</Text>
          </View>
          <View style={styles.icons}>
            <AnimalIcon animal="cat" toxic={data.toxic_cats} />
            <AnimalIcon animal="dog" toxic={data.toxic_dogs} />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  highlight: {
    maxHeight: 160,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 115,
    height: '100%'
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  item: {
    width: 100,
    flexWrap: 'wrap',
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingTop: 5,
  }
});

export default Card;