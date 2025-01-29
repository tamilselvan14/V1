import LoginPage from './Screens/Login&Register/Login';
import AppBar from './Screens/AppBar.js';
import C1Screen from './Screens/Community/C1Screen.jsx';
import RegisterPage from './Screens/Login&Register/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import Welcome from '/Users/tamilselvan/V1/Screens/Login&Register/Welcome.jsx';
import EditProfile from './Screens/Profile/EditProfile.jsx';
import PostScreen from './Screens/Home/PostScreen.js';
import CommunityCreateScreen from'/Users/tamilselvan/V1/Screens/Community/CommunityCreateScreen.js';

function App(){
  const Stack = createNativeStackNavigator();
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Welcome" component={Welcome}/> 
          <Stack.Screen name = "Login" component={LoginPage}/>
          <Stack.Screen name = "Register" component={RegisterPage}/>
          <Stack.Screen options={{headerShown : false}} name = "AppBar" component={AppBar}/>
          <Stack.Screen name = "C1" component={C1Screen}/>
          <Stack.Screen name = "EditProfile" component={EditProfile}/> 
          <Stack.Screen name = "PostScreen" component={PostScreen}/> 
          <Stack.Screen name = "CommunityCreateScreen" component={CommunityCreateScreen}/> 

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;