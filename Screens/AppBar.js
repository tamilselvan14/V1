import HomeScreen from './Home/HomeScreen.jsx';
import ProfileScreen from './Profile/ProfileScreen.jsx';
import ServiceScreen from '/Users/tamilselvan/V1/Screens/ServiceScreen.jsx';
import {NavigationContainer,NavigationIndependentTree} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import UserScreen from '/Users/tamilselvan/V1/Screens/UserScreen.jsx';

function AppBar(){
  const TabNav = createBottomTabNavigator();

  const tabConfig=[
    {
      name:"Home",
      component: HomeScreen,
      focusedIcon:'home',
      unfocusedIcon:'home-outline',
      iconComponent:Ionicons
    },
    {
      name:"Community",
      component:UserScreen,
      focusedIcon:'people-circle',
      unfocusedIcon:'people-circle-outline',
      iconComponent: Ionicons,
    }, 
    {
      name:"Service",
      component:ServiceScreen,
      focusedIcon:'server',
      unfocusedIcon:'server-outline',
      iconComponent:Ionicons,
    },
    {
      name:"Profile",
      component:ProfileScreen,
      focusedIcon:'user',
      unfocusedIcon:'user-o',
      iconComponent:FontAwesome,
    }
  ]
const screenOptions=({route})=>({
  tabBarIcon: ({focused, color, size}) => {
    const routeConfig = tabConfig.find(config => config.name === route.name);
    const IconName = focused?routeConfig.focusedIcon:routeConfig.unfocusedIcon;
    const IconComponent = routeConfig.iconComponent;

    return <IconComponent name={IconName} size={size} color={color}/>;
  },
  tabBarActiveTintColor: '#0163d2',
  tabBarInactiveTintColor: 'black',

});
  
  return (
    <SafeAreaProvider>
      <NavigationIndependentTree>

        <TabNav.Navigator  screenOptions={screenOptions}>
          
          <TabNav.Screen name = "Home" component={HomeScreen}/>
          <TabNav.Screen name = "Community" component={UserScreen}/>
          <TabNav.Screen name = "Service" component={ServiceScreen}/>
          <TabNav.Screen name = "Profile" component={ProfileScreen}/>
          
        </TabNav.Navigator>
      </NavigationIndependentTree>
    </SafeAreaProvider>
    
  );
}

export default AppBar;