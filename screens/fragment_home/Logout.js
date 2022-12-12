import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import initfirebase from "../../Config"
import { Ionicons } from "@expo/vector-icons";

const Logout = (props) => {
    const auth = initfirebase.auth();

    return (  
        <ImageBackground source={require('../../assets/bg.jpg')} style={{
            height:"100%", width:"100%"
                }}>
                <View style={styles.container}>
                  <View
                    style={{
                   
                        height: "50%",
                        width: "80%",
                        backgroundColor:'rgba(52, 52, 52, 0.9)',
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center"
            
                    }}
                    >
                        <Text style={{color: "white", fontSize: 36, fontWeight: "bold"}}>
                        Log OUT
                        </Text>
                       
                        <Pressable   
                        onPress={()=>{
                            Alert.alert(
                                "Are your sure?",
                                "Do you want to sign out!!!",
                                [
                                  // The "Yes" button
                                  {
                                    text: "Yes",
                                    onPress: () => {
                                        auth.signOut().then(props.navigation.replace('auth'))
                                    },
                                  },
                                  // The "No" button
                                  // Does nothing but dismiss the dialog when tapped
                                  {
                                    text: "No",
                                  },
                                ]
                              );
            
                          }}
                          style={styles.button}
                        >
                           
                            <Ionicons name="exit-outline" size={50} color="white" />
                  
                          
                        </Pressable>
                    
                    </View>
                </View>
                </ImageBackground>
    );
}
 
export default Logout;
const styles = StyleSheet.create({

    button: {
      backgroundColor:'rgba(255, 0, 0, 0.7)',
      padding: 10,
      borderRadius: 10,
      margin: 5,
      marginTop: 40,
    },
    buttontext:{
      color: "white",
      
    },
    
      textinput: {
          width: "90%",
          height:40,
          backgroundColor: "azure",
          borderRadius: 8,
          margin: 10,
          padding: 5,
          textAlign:"center",
      },
    container: {
      flex: 1,//weight ./. l'element pere
      alignItems: 'center',//alignement horiz
      justifyContent: 'center',//align vert
    },
  });