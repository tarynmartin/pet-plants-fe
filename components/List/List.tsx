import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Card from '../Card/Card';

const List = ({ navigation, data }) => {
  return (
    <FlatList data={data} keyExtractor={item => item.id} style={styles.container} numColumns={2}
    renderItem={({item}) => {
      return (
        <Card data={item} navigation={navigation} />
      )}}/>
)
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingLeft: 25,
    flexDirection: 'row'
  }
})

export default List;