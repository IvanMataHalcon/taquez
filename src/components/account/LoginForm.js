import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { async } from "@firebase/util";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const navigation = useNavigation();
  const showHidePass = () => {
    setShowPass(!showPass);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email, no valido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate("index");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Usuario y/o contraseña incorrecta",
        });
      }
    },
  });
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
      <Button
        title="Iniciar Sesion"
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
