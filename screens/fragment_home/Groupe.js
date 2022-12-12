import {ImageBackground, View, Text, TextInput, Button,StyleSheet, TouchableOpacity, Image ,Alert,ToastAndroid} from 'react-native'
import React, { useState,useEffect } from 'react'
import initfirebase from '../../Config';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';


export default function Groupe() {
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setloading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const [items, setItems] = useState([]);

    const auth = initfirebase.auth();

    const database = initfirebase.database();
    const storage = initfirebase.storage();
    useEffect(() => {
      const currentUserEmail = auth.currentUser.email;
      database.ref('Profiles').on('value', (snapshot) => {
        const dd = snapshot.val();

        var list=[{"label":currentUserEmail, "value": currentUserEmail}];
        Object.keys(dd).map((val) => {
          if (dd[val].email !== currentUserEmail) {
          var m={"label":dd[val].email, "value": dd[val].email}
       
           list.push(m);
           setItems(list);

          }
          
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
    <View style={{
                       flex: 1,//weight ./. l'element pere
                       alignItems: 'center',//alignement horiz
                       justifyContent: 'center',//align vert
                      }}>
    <View
                    style={{
                   
                        height: "80%",
                        width: "90%",
                        backgroundColor:'rgba(52, 52, 52, 0.5)',
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center"
            
                    }}
                    >
      <Text style={styles.title} >Create New Group</Text>
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
        onChangeText={(text)=>{setUsername(text)}} 
        value={username}
        style={styles.textinput}
        placeholder="Group Name"
       />
       <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}

        theme="LIGHT"
        multiple={true}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        style={{
          height: 40,
      width:'90%',
      backgroundColor: 'azure', 
      fontSize: 20,
      margin:20,
      textAlign:"center",
          
          
      }}
      />
        <Button title="Create"
      
         onPress={async ()=>{
          if (value == null || username == null || image == null) {
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
              var key = database.ref("Groups").push().key;
              database.ref("Groups").child(username+key).set({
                members: value,
                
                groupname: username,
                url:url,
              })

              ToastAndroid.showWithGravity(
                "Your Profile is successfully updated !",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
              );

                   
              setloading(false);

                   
            }
        
              }}>
            
        </Button>
        <Spinner
        color="#4682B4"
        visible={loading}
        textContent={'Loading...'}
        textStyle={{ color: '#4682B4' }}
      />
    </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    textinput: {
      height: 40,
      width:'90%',
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