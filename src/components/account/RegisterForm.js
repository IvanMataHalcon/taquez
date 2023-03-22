import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm() {
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email no valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "La contraseña debe ser de 8 caracteres"),
      repeatPassword: Yup.string()
        .required("contraseña obligatoria")
        .oneOf([Yup.ref("password")], "La contraseña no coincide")
        .min(8, "La contraseña debe ser de 8 caracteres"),
    }),
    validateOnChange: false, //Evita que valide cada cambio
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        // navigation.navigate("indexS") //
        navigation.goBack(); //
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al registrar usuario",
        });
        console.log(error);
      }
    },
  });

  const showHidePass = () => {
    setShowPass(!showPass);
  };
  const showHideRepeatPass = () => {
    setShowRepeatPass(!showRepeatPass);
  };
  return (
    <View style={styles.viewContent}>
      <Input
        containerStyle={styles.input}
        placeholder="Correo electronico"
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />

      <Input
        containerStyle={styles.input}
        placeholder="Contraseña"
        secureTextEntry={showPass ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHidePass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Input
        containerStyle={styles.input}
        placeholder="Repetir contraseña"
        secureTextEntry={showRepeatPass ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHideRepeatPass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    marginTop: 30,
  },
  input: {
    width: "100%",
    marginTop: 15,
  },
  icon: {
    color: "#c1c1c1",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#faad07",
  },
});
