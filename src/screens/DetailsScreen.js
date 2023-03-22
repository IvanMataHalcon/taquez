import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DetailsScreen(props) {
  const {navigation} = props;
  return (
    <View>
      <Text>DetailsScreen</Text>
      <Button title='Ir a Index' onPress={()=>navigation.navigate("index")}/>
      <Button title='Ir a  información' onPress={()=>navigation.navigate("information")}/>
    </View>
  )
}

const styles = StyleSheet.create({})