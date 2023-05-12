import React, { useState, useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/Home/Home.tsx';
import Plant from './screens/Plant/Plant.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
  const [plantsData, setPlantsData] = useState([]);

  useEffect(() => {
    getPlants();
  }, [])

  const getPlants = () => {
    return fetch('http://localhost:3000/plants/')
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        return response.json()
      }
    }).then(plantData => setPlantsData(plantData))
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <Home {...props} data={plantsData} />}
        </Stack.Screen>
        <Stack.Screen name="Plant" component={Plant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}