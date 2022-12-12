import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import { signOut } from 'firebase/auth';
import initfirebase,{ auth, database } from '../Config';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';


export default function Chat(props) {

  const [messages, setMessages] = useState([]);
  const [list, setlist] = useState([]);
  const [image, setImage] = useState('https://i.pravatar.cc/300');

  const navigation = useNavigation();
  const db = initfirebase.database();
  
  var chatkey ="";
var otheruserdata = props.route.params["otheruserdata"];
if(otheruserdata.email[0]>auth.currentUser.email[0]){

  chatkey = otheruserdata.email + "-"+auth.currentUser.email;
}else{
  chatkey = auth.currentUser.email + "-"+otheruserdata.email;
}

chatkey = chatkey.replace(".","");
chatkey = chatkey.replace(".","");

console.log(chatkey);
const tablemsg=db.ref("messages/"+chatkey);

const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  useEffect(() => {
        const currentUserEmail = auth.currentUser.email;
        db.ref('Profiles').on('value', (snapshot) => {
          const dd = snapshot.val();
          Object.keys(dd).map((val) => {
            if (dd[val].email == currentUserEmail) {
    
              setImage(dd[val].url);
            
    
              
            }
          });
        });
      }, []);
  useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={onSignOut}
          >
            <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
          </TouchableOpacity>
        )
      });
    }, [navigation]);

  useLayoutEffect(() => {
    
    tablemsg.on("value",(dataSnapshot)=>{
      let d=[];
      dataSnapshot.forEach(msg => {
          d.push(msg.val());
      });
              setMessages(d.reverse()) ;
            }); 

console.log(list);
       
     
    }, []);

  const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
      // setMessages([...messages, ...messages]);
      const { _id, createdAt, text, user } = messages[0];    
      db.ref("messages/"+chatkey).push({
                _id:_id,
                createdAt: createdAt,
                text: text,
                user: user,
                
              });
    }, []);

    return (
      // <>
      //   {messages.map(message => (
      //     <Text key={message._id}>{message.text}</Text>
      //   ))}
      // </>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={messages => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: '#fff'
        }}
        textInputStyle={{
          backgroundColor: '#fff',
          borderRadius: 20,
        }}
        user={{
          _id: auth?.currentUser?.email,
          avatar: image
        }}
      />
    );
}
