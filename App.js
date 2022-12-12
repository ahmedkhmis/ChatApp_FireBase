import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./screens/Chat";
import Chatgroup from "./screens/Chatgroup";
//import ForgotPassword from "../screens/ForgotPassword";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ResetPassword from "./screens/ResetPassword";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="auth" component={Login} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="signup" component={Register}></Stack.Screen>
      <Stack.Screen name="home" component={Home}></Stack.Screen>
      <Stack.Screen name="chat" component={Chat}></Stack.Screen>
      <Stack.Screen name="chatgroup" component={Chatgroup}></Stack.Screen>
      <Stack.Screen name="reset" component={ResetPassword}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  );
}
