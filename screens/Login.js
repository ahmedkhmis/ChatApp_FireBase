import { StatusBar } from 'expo-status-bar';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import initfirebase from '../Config';

export default function Login(props) {

  const auth = initfirebase.auth();

    const [email, setEmail] = useState('aa@aa.aa');
    const [pwd, setpwd] = useState('aaaaaa');

    return (
    <ImageBackground source={require('../assets/bg.jpg')} style={{
height:"100%", width:"100%"
    }}>
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View
        style={{
            height: 500,
            width: "90%",
            backgroundColor:'rgba(52, 52, 52, 0.9)',
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center"

        }}
        >
            <Text style={{color: "white", fontSize: 36, fontWeight: "bold"}}>
            Authentication
            </Text>
            <TextInput placeholder="email@site.com" 
            keyboardType="email-address"
            style={styles.textinput}
            onChangeText={(text)=>{setEmail(text)}}>

            </TextInput>
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.textinput}
                        onChangeText={(text)=>{setpwd(text)}}>

            </TextInput>
            <TouchableOpacity>
                <Text style={{color: "white"}} 
                onPress={()=>{
                  
                  props.navigation.navigate("reset");
                }}>
                    Forgot your password ? click here
                </Text>
            </TouchableOpacity>
        
            <Pressable   
            onPress={()=>{
              if((email.length>0 && email.includes("@")))
                    {
                      if(pwd.length>5){
                        auth.signInWithEmailAndPassword(email,pwd).then(()=>{
                    props.navigation.replace("home")
                }).catch((err)=>{
                    alert(err);
                });
                      }
                    }
                    else{
                      alert("Please verify your data")
                    }
                

              }}
              style={styles.button}
            >
              <Text style={styles.buttontext}>
                Submit
              </Text>
            </Pressable>
            <TouchableOpacity>
                <Text style={{color: "white"}} 
                onPress={()=>{
                  
                  props.navigation.navigate("signup");
                }}>
                    Create new user
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  button: {
    
    backgroundColor:"black",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    marginTop: 20,
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
