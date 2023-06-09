import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 

const AnimalIcon = ( { animal, toxic }) => {
  return (
    <FontAwesome5 name={animal} size={20} color={toxic ? "red" : "green"} />
  )
}

export default AnimalIcon