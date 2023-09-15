import React from 'react';
import { Text, StyleSheet } from 'react-native';

const PlantInfoSection = ({ sectionTitle, data, scientificName }) => {
  return (
      <Text style={styles.categoryContainer}>
        <Text style={styles.category}>{`${sectionTitle}:`}</Text> <Text style={scientificName ? styles.scientificName : null}>{data}</Text>
      </Text>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
  },
  category: {
    fontWeight: '600',
    paddingRight: 5,
  },
  scientificName: {
    textTransform: 'capitalize',
  },
})

export default PlantInfoSection;