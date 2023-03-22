import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function InformationScreen(props) {
  const {navigation} = props;
  return (
    <View>
      <Text>InformationScreen</Text>
      <Button title='Ir a detalles' onPress={()=>navigation.navigate("details")}/>
    </View>
  )
}

const styles = StyleSheet.create({})