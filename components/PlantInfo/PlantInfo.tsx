import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PlantInfoSection from '../PlantInfoSection/PlantInfoSection';
import AnimalIcon from '../AnimalIcon/AnimalIcon';

const PlantInfo = ({ plant }) => {
  return (
    <View style={styles.info}>
      <Image source={{uri: plant.image_url}} style={styles.image} />
      <View style={styles.icons}>
        <AnimalIcon animal="cat" toxic={plant.toxic_cats} />
        <AnimalIcon animal="dog" toxic={plant.toxic_dogs} />
      </View>
      <PlantInfoSection sectionTitle='Name' data={plant.name} scientificName={false}/>
      <PlantInfoSection sectionTitle='Scientific Name' data={plant.scientific_name} scientificName={true} />
      {plant.popular_names.length > 0 && 
        <PlantInfoSection sectionTitle='Other Names' data={plant.popular_names.replaceAll(',', ', ')} scientificName={false}/>
      }
      {plant.signs.length > 0 && 
        <PlantInfoSection sectionTitle='Description' data={plant.description} scientificName={false} />
      }
      {plant.description.length > 0 && 
        <PlantInfoSection sectionTitle='Signs' data={plant.signs} scientificName={false} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
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
  image: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingTop: 5,
  }
})

export default PlantInfo;