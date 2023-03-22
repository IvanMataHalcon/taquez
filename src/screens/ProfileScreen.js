import React , {useState}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { getAuth , signOut } from "firebase/auth"
import { useNavigation } from '@react-navigation/native'
import ProfileUser from '../components/account/ProfileUser'
import Loading from '../components/common/Loading'
import OptionsUser from '../components/account/OptionsUser'

export default function ProfileScreen() {

  const navigation = useNavigation();
  const [visibleLoad, setVisibleLoad] = useState(false);
  const [textLoad, setTextLoad] = useState("");
  const [reload, setReload] = useState(false)

  const onReload=()=>setReload((prevState)=>!prevState)

  const logout =  async() => {
    const auth = getAuth();
    await signOut(auth);
    console.log("CERRO SESION");
    navigation.navigate("index")
  }
  return (
    <View>
      <ProfileUser setVisibleLoad={setVisibleLoad} setTextLoad={setTextLoad}/>
      <OptionsUser reload={onReload}/>
      <Button title="Cerrar Sesión" onPress={logout} buttonStyle={styles.btn} titleStyle={styles.textBtn}/>
      <Loading visible={visibleLoad} text={textLoad}/>
    </View>
  )
}

const styles = StyleSheet.create({
  btn:{
    marginTop:30,
    paddingVertical:10,
    backgroundColor:"#FFF",
    borderTopWidth:1,
    borderTopColor:"#e3e3e3",
    borderBottomColor:"#e3e3e3",
    borderBottomWidth:1
  },
  textBtn:{
    color:"#faad07"

  }
  
})