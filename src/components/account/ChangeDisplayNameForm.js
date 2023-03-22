import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { getAuth, updateProfile } from "firebase/auth";

export default function ChangeDisplayNameForm(props) {
  const { close, reload } = props;
  const formik = useFormik({
    initialValues: {
      displayName: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required("Nombre y apellidos Obligatorios"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //console.log(formValue);
        const user = getAuth().currentUser;
        //console.log("user -> " + user.displayName);
        await updateProfile(user, {
          displayName: formValue.displayName,
        });
        reload()
        close();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text: "Error al cambiar nombre y appelido",
        });
      }
    },
  });
  return (
    <View style={styles.viewForm}>
      <Text>Cambiar Nombre y Apellido</Text>
      <Input
        placeholder="Nombre y apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar Nombre y Apellido"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 15,
    width: "95%",
  },
  btnStyle: {
    backgroundColor: "#faad07",
  },
});
