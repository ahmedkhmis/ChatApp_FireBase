import {ImageBackground,View, Text, StyleSheet, FlatList, Image} from "react-native";
import { useState,useEffect } from 'react';
import React from "react";
import initfirebase,{ auth, database }from '../../Config';


export default function List(props){
    const [data,setdata]=useState(null);
    const [groups,setgroups]=useState(null);


    const database=initfirebase.database();
    const ref_profil=database.ref("Profiles");
    const ref_group=database.ref("Groups");


   
    useEffect(() => {
        const currentUserEmail = auth.currentUser.email;

        ref_profil.on("value",(dataSnapshot)=>{
            let d=[];
            dataSnapshot.forEach(profil => {
                d.push(profil.val());
            });
            setdata(d);
        }); 
        
        ref_group.on("value",(dataSnapshot)=>{
            let d=[];
            dataSnapshot.forEach(profil => {
             
                if (profil.val().members.find(element => element == currentUserEmail) == currentUserEmail) {
      
                    d.push(profil.val());
                  
          
                    
                  }
                
            });
            setgroups(d);
        });
    
      return () => {
        ref_profil.off();
      }
    }, [])
    

    //  data = [{
    //     nom: " Ahmed ",
    //     prenom: "Khmis ",
    //     pseudo: "USER 1",

    // }]
    return (
      <ImageBackground source={require('../../assets/bg.jpg')} style={{
        height:"100%", width:"100%" 
            }}>
        <View style={styles.container}>
            <Text style={{
                   color:"black",
                   fontSize:20,
                   fontWeight:"bold",
                   textAlign:'left',
                   marginTop:30,
                   margin:10
                   
   
            }}
            >Liste des Groupes </Text>
            
            <FlatList data={groups}
                      renderItem={({item})=>{
                          return <View style={styles.viewitem}>
                              <Image
                                  style={
                                  {height:60,
                                   width:60,
                                  resizeMode:"contain"}}
                                  source={{uri: item.url}}></Image>

                              <Text onPress={()=>{
                                  props.navigation.navigate("chatgroup",{othergroupdata:item})
                              }}

                                  style={{fontSize:22,fontWeight:"bold"}}>{item.groupname}</Text>



                          </View>;
                      }}
                      
                      style={{height:'100%',width:"100%"
                      }}>
            
            </FlatList>
            <Text style={{
                color:"black",
                fontSize:20,
                fontWeight:"bold",
                textAlign:'left',
                margin:10
                

            }}
            >Liste des Profiles </Text>
            <FlatList data={data}
                      renderItem={({item})=>{
                          return <View style={styles.viewitem}>
                              <Image
                                  style={
                                  {height:60,
                                   width:60,
                                  resizeMode:"contain"}}
                                  source={{uri: item.url}}></Image>

                              <Text onPress={()=>{
                                  props.navigation.navigate("chat",{otheruserdata:item})
                              }}

                                  style={{fontSize:22,fontWeight:"bold"}}>{item.Username}</Text>


                              <Text>{" "+item.firstName}</Text>
                              <Text>{" "+item.lastName}</Text>


                          </View>;
                      }}style={{ width:"100%",height:"100%"}}>
            

            </FlatList>
        </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    viewitem:{
      flexDirection:"row",
      height:65,
      width:"90%",
      borderColor:"gray",
      backgroundColor:'rgba(52, 52, 52, 0.3)',
      borderWidth:  1,
      margin:5,
      borderRadius:7,
      alignItems:"center",
      justifyContent:"flex-start"
    },

    container: {
        flex:1,
        width:'100%',
        justifyContent:'flex-start',
    }
})