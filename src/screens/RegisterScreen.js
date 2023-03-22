import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import RegisterForm from '../components/account/RegisterForm'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view';

export default function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
        <Image style={styles.logo} source={require("../../assets/img/tacos.jpg")}></Image>
        <View style={styles.viewForm}>
            <RegisterForm/>
        </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    logo:{
        resizeMode: "contain",
        width:"100%",
        height:150,
        marginTop:30
      },
    viewForm:{
        marginHorizontal:40
    }
})