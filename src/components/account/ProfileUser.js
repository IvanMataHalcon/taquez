import React , { useState }from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar,Text } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import { getAuth , updateProfile} from 'firebase/auth'
import { getStorage , ref , uploadBytes, getDownloadURL} from 'firebase/storage'

export default function ProfileUser(props) {
    //console.log(props);
    const {setVisibleLoad , setTextLoad } = props;
    const {uid, photoURL, displayName, email} = getAuth().currentUser;
    //console.log("name -> " + displayName)
    const [photo, setPhoto] = useState(photoURL);

    const changePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images , 
            allowsEditing:true,
            aspect:[4,3],
        })
        console.log(result)
        if(!result.canceled) uploadPhoto(result.uri)
    }
    const uploadPhoto = async(uri) => {
      //console.log(uri);
      setTextLoad("Subiendo Foto")
      setVisibleLoad(true)
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const storage = getStorage();
      const refStorage = ref(storage , `imgProfile/${uid}`)
      uploadBytes(refStorage, blob).then((snapshot)=>{
        updatePhoto(snapshot.metadata.fullPath);
      })
    }

    const updatePhoto = async(imgPath) => {
      setTextLoad("Actualizando Foto");

      const storage = getStorage();
      const imgRef = ref(storage, imgPath);
      const imgUrl = await getDownloadURL(imgRef);
      //console.log("img-> " + imgUrl)
      const auth = getAuth();
      updateProfile(auth.currentUser, {photoURL: imgUrl});
      setPhoto(imgUrl);
      setVisibleLoad(false);
    }
  return (
    <View style={styles.viewInfo}>
      <Avatar
      size={"large"}
      rounded={true}
      icon={{type:"material" , name:"person"}}
      containerStyle={styles.avatar}
      source={{uri: photo}}
      >
        <Avatar.Accessory size={30} onPress={changePhoto}/>
      </Avatar>
      <View>
        <Text style={styles.user}>{displayName || "Anonimo"}</Text>
        <Text>{email}</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    viewInfo:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#F2F2F2",
        paddingVertical:30
    },
    avatar:{
        backgroundColor:"#faad07",
        marginRight:20
    },
    user:{
        fontWeight:"bold",
        paddingBottom:5

    }
})