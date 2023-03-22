import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IndexScreen from '../screens/IndexScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
const Stack = createNativeStackNavigator();
export default function IndexStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='index' component={IndexScreen} options={{title:"Inicio"}}/>
        <Stack.Screen name='login' component={LoginScreen} options={{title:"Iniciar Sesión"}}/>
        <Stack.Screen name='registerS' component={RegisterScreen} options={{title:"Registrarse"}}/>
    </Stack.Navigator>
  )
}