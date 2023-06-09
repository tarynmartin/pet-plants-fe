import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Card from '../Card/Card';

const List = ({ navigation, data }) => {
  return (
    <View style={styles.container}>
      <FlatList data={data} keyExtractor={item => item.id} numColumns={2} scrollEnabled={true}
      renderItem={({item}) => {
        return (
          <Card data={item} navigation={navigation} />
        )}}/>
    </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginLeft: 15,
    marginRight: 20,
  },
})

export default List;