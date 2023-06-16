import React, { useState, useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/Home/Home.tsx';
import Plant from './screens/Plant/Plant.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
  const [plantsData, setPlantsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPlants();
  }, [])

  const getPlants = () => {
    return fetch('https://pet-plants-be.onrender.com/plants/')
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        return response.json()
      }
    }).then(plantData => {
      setPlantsData(plantData)
      setIsLoading(false)
    })
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <Home {...props} data={plantsData} isLoading={isLoading} />}
        </Stack.Screen>
        <Stack.Screen name="Plant" component={Plant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}