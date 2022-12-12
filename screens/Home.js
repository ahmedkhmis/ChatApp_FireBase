import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Groupe from './fragment_home/Groupe';
import Liste from './fragment_home/Liste';
import Profile from './fragment_home/Profile';
import { Ionicons , Entypo} from "@expo/vector-icons";
import Logout from './fragment_home/Logout';


const Tab = createMaterialBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator 
    initialRouteName="Liste"
  activeColor="#f0edf6"
  inactiveColor="white"
  barStyle={{ backgroundColor:'rgb(0, 153, 204)' }}
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'profile') {
        iconName = focused
          ? 'ios-information-circle'
          : 'ios-information-circle-outline';
          size=25;
      } else if (route.name === 'liste') {
        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
        size=25;
      }
      else if (route.name === 'groupe') {
        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        size=25;
      }
      else if (route.name === 'Logout') {
        iconName = focused ? 'exit' : 'exit-outline';
        size=25;
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  })}>
    <Tab.Screen name="profile" component={Profile} />
    <Tab.Screen name="liste" component={Liste} />
    <Tab.Screen name="groupe" component={Groupe} />
    <Tab.Screen name="Logout" component={Logout} />

    
  </Tab.Navigator>
  );
}
