import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup"
import Toast from "react-native-toast-message";
import { getAuth , updateEmail, reauthenticateWithCredential , EmailAuthProvider, signOut } from "firebase/auth";

export default function ChangeEmailForm(props) {
    const { close, reload } = props;
    const [showPass, setShowPass] = useState(false);


    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Correo electronico obligatorio"),
            password: Yup.string().required("Contraseña obligatoria")
        }),
        validateOnChange: false,
        onSubmit: async(formValue)=>{
            try {
                const user = getAuth().currentUser
                const credential = EmailAuthProvider.credential(
                    user.email,
                    formValue.password
                );
                console.log(credential);
                reauthenticateWithCredential(user, credential);
                await updateEmail(user, formValue.email);
                close();
                reload();
            } catch (error) {
                console.log(error);
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Error al cambiar el correo electronico"
                })
            }
        }
    })
    const showHidePass = () => {
        setShowPass(!showPass);
      };

  return (
    <View>
      <Input
        placeholder="Correo nuevo"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "email",
          color: "c2c2c2"
        }}
        onChangeText={(text)=>(formik.setFieldValue("email", text))}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={showPass ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPass ? "eye-off-outline" : "eye-outline",
          color: "c2c2c2",
          onPress: showHidePass,
        }}
        onChangeText={(text)=>(formik.setFieldValue("password", text))}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar Correo Electronico"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
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
})