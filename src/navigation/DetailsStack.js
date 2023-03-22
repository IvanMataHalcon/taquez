import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
const Stack = createNativeStackNavigator();
export default function DetailsStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name='details' component={DetailsScreen} options={{title:"Detalles"}}/>
      <Stack.Screen name='profile' component={ProfileScreen} options={{title:"Perfil"}}/>
    </Stack.Navigator>
  )
}