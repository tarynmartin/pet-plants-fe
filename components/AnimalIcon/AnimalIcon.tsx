import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 

type IconProps = {
  animal: string;
  toxic?: boolean;
  color?: string;
}

const AnimalIcon = ( { animal, toxic, color }: IconProps) => {
  let iconColor;
  if (color) {
    iconColor = color;
  } else {
    iconColor = toxic ? "red" : "green"
  }
  return (
    <FontAwesome5 name={animal} size={20} color={iconColor} />
  )
}

export default AnimalIcon