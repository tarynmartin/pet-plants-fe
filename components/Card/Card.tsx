import React from 'react';
import { View, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';

const Card = ({ data, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => {navigation.navigate('Plant', { id: data.id, name: data.name})}}>
        <View>
          <Image source={{uri: data.imageUrl}} style={styles.logo} />
          <Text style={styles.item}>{data.name}</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    border: '1px solid black',
    borderRadius: 5,
    margin: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  item: {
    width: 100,
    flexWrap: 'wrap',
  }
});

export default Card;