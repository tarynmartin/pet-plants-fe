import React, { useState, useMemo, SetStateAction } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import AnimalIcon from '../AnimalIcon/AnimalIcon';
import Button from '../Button/Button';

type FilterBarProps = {
  animal: string;
  setAnimal: React.Dispatch<SetStateAction<string>>;
  isToxic: boolean | null;
  setIsToxic: React.Dispatch<SetStateAction<boolean>>;
  getFilteredPlants: (cleared: boolean) => void;
}

const FilterBar = ({ animal, setAnimal, isToxic, setIsToxic, getFilteredPlants }: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const isDisabled = useMemo(() => {
    if (animal && isToxic !==null && (isToxic.toString() === 'true' || isToxic.toString() === 'false')) {
      return false;
    }
    return true;
  }, [animal, isToxic])

  const handleShowingSection = () => {
    setShowFilters(prevState => !prevState);
  }

  const getPlants = (cleared: boolean) => {
    if (cleared) {
      setAnimal('');
      setIsToxic(null);
    }
    getFilteredPlants(cleared);
  }

  return (
    <View style={styles.filterView}>
      {!showFilters && (
        // fix sizing of button
        <View style={styles.showFilterButton}>
          <Button onPress={handleShowingSection} label='Show Filters' text='Show Filters' />
        </View>
      )}
      {showFilters && (
        <View>
          <View style={styles.header}>
            <Text style={styles.filterText}>Filter by Animal and Toxicity</Text>
            <Pressable onPress={handleShowingSection}>
              <AntDesign name='closecircleo' size={20} color='gray' />
            </Pressable>
          </View>
          <View style={styles.buttonsView}>
            <View style={styles.buttonView}>
              <Pressable onPress={()=> setAnimal(animal === 'dog' ? '' : 'dog')} style={animal === 'dog' ? styles.selected : styles.button} ><AnimalIcon animal='dog' color='navy' /></Pressable>
              <Pressable onPress={()=> setAnimal(animal === 'cat' ? '' : 'cat')} style={animal === 'cat' ? styles.selected : styles.button}><AnimalIcon animal='cat' color='navy' /></Pressable>
            </View>
            <View style={styles.buttonView}>
              <Pressable onPress={()=> setIsToxic(isToxic !==null && !isToxic ? null : false)} style={isToxic !== null && !isToxic ? styles.selected : styles.button}><AntDesign name='checkcircleo' size={20} color='forestgreen' /></Pressable>
              <Pressable onPress={()=> setIsToxic(isToxic ? null : true)} style={isToxic !== null && isToxic ? styles.selected : styles.button}><AntDesign name='closecircleo' size={20} color='red' /></Pressable>
            </View>
            <View style={styles.submitButtons}>
              <Button onPress={() => getPlants(true)} label='Clear' text='Clear' buttonStyle='clear'/>
              <Button onPress={() => getPlants(false)} label='Filter List' text='Filter List' disabled={isDisabled} />
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default FilterBar;

const styles = StyleSheet.create({
  filterView: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  showFilterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
  },
  buttonsView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  button: {
    marginTop: 16,
    padding: 5,
  },
  selected: {
    marginTop: 16,
    backgroundColor: 'lightgray',
    height: 30,
    width: 30,
    borderRadius: 5,
    padding: 5,
  },
  buttonView: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between',
  },
  submitButtons: {
    flexDirection: 'row',
    width: '33%',
  },
})