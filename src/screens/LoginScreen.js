import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../components/account/LoginForm";
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen() {
  const navigation = useNavigation();
  console.log(navigation);

  const irARegistro = () => {
    console.log("ENTRO");
    navigation.navigate("registerS");
  };

  return (
    <KeyboardAwareScrollView>
      <Text>LoginScreen</Text>
      <Image
        style={styles.logo}
        source={require("../../assets/img/tacos.jpg")}/>
      <View style={styles.viewLogin}>
        <LoginForm />
        <Text style={styles.text1}>
          ¿Aun no tienes cuenta?{" "}
          <Text style={styles.text2} onPress={irARegistro}>
            Registrarse
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: 150,
    marginTop: 30,
  },
  viewLogin: {
    marginHorizontal: 30,
  },
  text1: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  text2: {
    color: "#faad07",
    fontWeight:"bold"
  },
});
