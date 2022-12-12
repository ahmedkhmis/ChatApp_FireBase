import {ImageBackground, View, Text, TextInput, Button,StyleSheet, TouchableOpacity, Image ,Alert,ToastAndroid} from 'react-native'
import React, { useState,useEffect } from 'react'
import initfirebase from '../../Config';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';


export default function Profile() {
    const [fname, setname] = useState("");
    const [lname, setlastname] = useState("");
    const [username, setUsername] = useState("");
    const [mail, setemail] = useState("");
    const [image, setImage] = useState(null);
    const [currentUserKey, setcurrentUserKey] = useState();
    const [loading, setloading] = useState(false);


    const auth = initfirebase.auth();

    const database = initfirebase.database();
    const storage = initfirebase.storage();
    useEffect(() => {
      const currentUserEmail = auth.currentUser.email;
      database.ref('Profiles').on('value', (snapshot) => {
        const dd = snapshot.val();
        Object.keys(dd).map((val) => {
          if (dd[val].email == currentUserEmail) {
            setloading(true);
            setcurrentUserKey(val);
            setemail(dd[val].email);
            setUsername(dd[val].Username);
            setname(dd[val].firstName);
            setlastname(dd[val].lastName);
            setImage(dd[val].url);
            setloading(false);

            
          }
          console.log("name:"+lname);
        });
      });
    }, []);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
    
  
      if (!result.canceled) {
     
        setImage(result.uri);
      }
    };

    const imageToBlob = async (uri)=>{
      const blob = await new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e){
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";//arraybuffer ou blob
        xhr.open("GET", uri, true);
        xhr.send(null);
      })
      return blob;
    }

    const uploadImage = async (uri)=>{
      //convert image to blob
      const blob = await imageToBlob(uri);
      //save blob to reference image
      const ref_image = storage.ref().child("imageprofiles").child("image2.jpg");
      await ref_image.put(blob);
      //get url
      const url = await ref_image.getDownloadURL();
      return url;
    }

  return (
    <ImageBackground source={require('../../assets/bg.jpg')} style={{
      height:"100%", width:"100%" 
          }}>
    <View style={{backgroundColor:'rgba(52, 52, 52, 0.2)',}}>
      <Text style={styles.title} >Profile</Text>
      <TouchableOpacity onPress={()=>{pickImage();}}>
      <Image 
      source={image === null ? 
      require("../../assets/profile.png") :
       {uri: image}}
      style={{
          width:130,
          height:130,
          borderRadius: 63,
          borderWidth: 4,
          borderColor: "white",
          marginBottom:10,
         alignSelf:'center',
          
          marginTop:20
          
      }}></Image>
      </TouchableOpacity>
      <TextInput          
        onChangeText={(text)=>{setemail(text)}} 
        style={styles.textinput}
        value={mail}
        placeholder="Email"
        editable={false}>
        </TextInput>
        <TextInput          
        onChangeText={(text)=>{setname(text)}} 
        value={fname}
        style={styles.textinput}
        placeholder="First Name"
       >
        </TextInput>

        <TextInput          
        onChangeText={(text)=>{setlastname(text)}}
        value={lname}
        style={styles.textinput}
        placeholder="Last Name">
        </TextInput>

        <TextInput          
        onChangeText={(text)=>{setUsername(text)}} 
        value={username}
        style={styles.textinput}
        placeholder="UserName">
        </TextInput>

       

        <Button title="Save"
        
         onPress={async ()=>{
          if (fname == null || lname == null|| username == null || image == null) {
            Alert.alert(
              "Problem",
              "Make sure all fields are filled !",
              [
                { text: "OK", onPress: () => console.log("ok") }
              ]
            );
          }else{
            setloading(true);
                 
              console.log(image);
              const url = await uploadImage(image);
              database.ref("Profiles").child(currentUserKey).update({
                      firstName: fname,
                      lastName: lname,
                      Username: username,
                      email: mail,
                      url: url
              });
              ToastAndroid.showWithGravity(
                "Your Profile is successfully updated !",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
              );

                   
              setloading(false);

                   
            }         }}
            >
            
        </Button>
        <Spinner
        color="#4682B4"
        visible={loading}
        textContent={'Loading...'}
        textStyle={{ color: '#4682B4' }}
      />
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    textinput: {
      height: 40,
      backgroundColor: 'azure', 
      fontSize: 20,
      margin:10,
      textAlign:"center",
    },
    title: {
      fontWeight: "bold",
    marginVertical: 4,
    color: "black",
    fontSize: 25,
    textAlign: "center"
    }
})