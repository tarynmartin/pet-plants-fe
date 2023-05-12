import React, { useState } from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/Home/Home.tsx';
import Plant from './screens/Plant/Plant.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
  const things = [{ id: 1, thing: 'apple'}, {id: 2, thing: 'cats'}, { id: 3, thing: 'dogs'}, {id: 4, thing: 'vacuum'}, {id: 5, thing: 'window'}]
  const [plantsData, setPlantsData] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const getPlants = () => {
    // return fetch('blah')
    // .then(response => {
    //   if (!response.ok) {
    //     throw Error(response.statusText)
    //   } else {
    //     return response.json()
    //   }
    // }).then(plantData => setPlantsData(plantData))
    console.log('clicked')
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <Home {...props} data={things} getData={getPlants} setSelectedItem={setSelectedPlant} />}
        </Stack.Screen>
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="Plant">
            {props => <Plant {...props}selectedItem={selectedPlant} setSelectedItem={setSelectedPlant} />}
          </Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}