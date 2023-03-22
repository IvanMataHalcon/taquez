import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IndexStack from './IndexStack';
import DetailsStack from './DetailsStack';
import {Icon} from 'react-native-elements';
import ProfileStack from '../navigation/ProfileStack'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// const Drawer = createDrawerNavigator();
// export default function AppNavigation(){
//     return (
//         <Drawer.Navigator>
//             <Drawer.Screen name='index' component={IndexScreen} options={{title: "Inicio"}}/>
//             <Drawer.Screen name='details' component={DetailsScreen} options={{title: "detalles"}}/>
//             <Drawer.Screen name='information' component={InformationScreen} options={{title: "información"}}/>
            
//         </Drawer.Navigator>
//       );
// }


//shortcut comentar = ctrl + k +c  || para descomentar ctrl + k + u

//METODO DE NAVEGACION POR TABS
const Tab = createBottomTabNavigator();

export default function AppNavigation(){
    const [session , setSession] = useState(null);
    useEffect(() =>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) =>{
            setSession(user ? true : false);
        })
    })
    return session ? (
        <Tab.Navigator screenOptions={({route})=>({headerShown:false,
             tabBarActiveTintColor:"red",
             tabBarInactiveTintColor:"green",
             tabBarIcon:({color, size})=>iconos(route,color,size)})}>
            <Tab.Screen name='index' component={IndexStack} options={{title: "Inicio"}}/>
            <Tab.Screen name='details' component={DetailsStack} options={{title: "Detalles"}}/>
            <Tab.Screen name='profile' component={ProfileStack} options={{title: "Perfil"}}/>
        </Tab.Navigator>

    ):(
        <IndexStack/>
    );
}

function iconos(router, color, size) {
    let name;
    if (router.name==='index') {
        name='home-outline'
    }
    if (router.name==='details') {
        name='details'
    }    
    if (router.name==='profile') {
        name="account"
    }
    return(
        <Icon type='material-community' name={name} color={color} size={size}/>
    );
}
//METODO DE NAVEGACION POR PILA
// const Stack = createNativeStackNavigator();

// export default function AppNavigation(){
//     return(
//         <Stack.Navigator>
//             <Stack.Screen name='index' component={IndexScreen} options={{title: "Inicio"}}/>
//             <Stack.Screen name='details' component={DetailsScreen} options={{title: "detalles"}}/>
//             <Stack.Screen name='information' component={InformationScreen} options={{title: "información"}}/>
//         </Stack.Navigator>
//     );
// }
