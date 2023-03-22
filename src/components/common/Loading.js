import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'

export default function Loading(props) {
    const {visible, text} = props;
  return (
    <Overlay isVisible={visible} overlayStyle={styles.overlay}>
        <View style={styles.viewText}>
            <ActivityIndicator size="large" color="#faad07"/>
            {text && <Text style={styles.text}>{text}</Text>}
            
        </View>
    </Overlay>
  )
}
Loading.defaultProps = {
    visible:false
}

const styles = StyleSheet.create({
    overlay:{
        height:100,
        width:200,
        backgroundColor:'#FFFFFFFF',
        borderColor:'#faad07',
        justifyContent:'center',
        alignItems:'center',
        border:2,
        borderRadius:10
    },
    viewText:{
        
    },
    text:{textTransform:'uppercase'}
})