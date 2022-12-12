import { StatusBar } from 'expo-status-bar';
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import initfirebase from "../Config"

export default function Register(props) {

    const auth = initfirebase.auth();
    const database = initfirebase.database();

    const [email, setEmail] = useState('');
    const [pwd, setpwd] = useState('');
    const [confirmpwd, setconfirmpwd] = useState('');
    const [fname, setname] = useState("");
    const [lname, setlastname] = useState("");
    const [username, setUsername] = useState("");
    return (
    <ImageBackground source={require('../assets/bg.jpg')} style={{
height:"100%", width:"100%"
    }}>
    <View style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
       
            height: "90%",
            width: "93%",
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
            <TextInput          
        onChangeText={(text)=>{setname(text)}} 
        style={styles.textinput}
                placeholder="First Name">
        </TextInput>
        <TextInput          
        onChangeText={(text)=>{setlastname(text)}}
        style={styles.textinput}
        placeholder="Last Name">
        </TextInput>

        <TextInput          
        onChangeText={(text)=>{setUsername(text)}} 
        style={styles.textinput}
        placeholder="UserName">
        </TextInput>
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.textinput}
                        onChangeText={(text)=>{setpwd(text)}}>

            </TextInput>
            <TextInput placeholder="Confirm your Password" secureTextEntry={true} style={styles.textinput}
                        onChangeText={(text)=>{setconfirmpwd(text)}}>

            </TextInput>
            <Pressable   
            onPress={()=>{
                //test de saisie
                if((email.length>0 && email.includes("@")))
             if(pwd.length>5 && (pwd===confirmpwd)&&(pwd.length>5))
             {auth.createUserWithEmailAndPassword(email,pwd).then(()=>{
                    props.navigation.replace("home")
                }).catch((err)=>{
                    alert(err);
                });
                console.log(email);

                var key = database.ref("Profiles").push().key;
                database.ref("Profiles").child(username+key).set({
                  firstName: fname,
                  lastName: lname,
                  Username: username,
                  email: email,
                  url: "https://img1.freepng.fr/20180714/ggq/kisspng-user-profile-computer-icons-login-clip-art-profile-picture-icon-5b49de2f1ef441.4301202215315676631268.jpg"
                })

             }else{
                alert("Please Verify your data")
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
                  
                  props.navigation.navigate("auth");
                }}>
                    Already user
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
