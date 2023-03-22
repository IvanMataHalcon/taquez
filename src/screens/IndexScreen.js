import { Button, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { clockRunning } from 'react-native-reanimated';
import LoginScreen from './LoginScreen';
import Loading from '../components/common/Loading';

export default function IndexScreen(props) {
  //console.log(props);
  const {navigation} = props;
  const [session, setSession] = useState(null);
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{
      setSession(user? true : false);
    })
  },[]);

  if (session===null) {
    return(<Loading visible={true}/>)
  }
  

  return session?(
    <View>
      <Text>IndexScreen</Text>
      <Button title='Ir a Detalles' onPress={()=>navigation.navigate("details")}/>
      <Button title='Ir a  Información' onPress={()=>navigation.navigate("information")}/>
      <Button title='Ir a  Perfil' onPress={()=>navigation.navigate("details",{screen:"profile"})}/>
    </View>
  ):<LoginScreen/>

}

const styles = StyleSheet.create({})