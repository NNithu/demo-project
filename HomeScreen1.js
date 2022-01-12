import React from 'react'
import { View, Text,StyleSheet,Button,Image,TouchableWithoutFeedback,Keyboard } from 'react-native'

export default function HomeScreen1({navigation}) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={styles.paragraph}>
                Admin Link to add new jobs
            </Text>
            <Button
                title="Career Page"  color="purple"
                onPress={() => navigation.navigate('CareerPage1')}
            />
             {/* <Image source={require('../bimg.png')} style={{height:400,width:400}} /> */}
            
            
        </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
       
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor:'#D7BDE2',
        //justifyContent: "center",
        padding: 16
    },
    icon: {
        fontSize: 40,
        fontWeight: '700',
        padding: 20
    },
    paragraph: {
        padding: 20,
        fontSize: 17,
        textAlign: "center"
    },
    tbutton:{
        width:300,
        backgroundColor:'#B3F1E6',
         borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13
    }
});