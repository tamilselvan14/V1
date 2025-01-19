import LoginPage from './Screens/Login&Register/Login';
import AppBar from './Screens/AppBar.js';
import RegisterPage from './Screens/Login&Register/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';


function App(){
  const Stack = createNativeStackNavigator();
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Login" component={LoginPage}/>
          <Stack.Screen name = "Register" component={RegisterPage}/>
          <Stack.Screen options={{headerShown : false}} name = "AppBar" component={AppBar}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;