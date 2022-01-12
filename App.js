
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen1 from './components/HomeScreen1';
import CareerScreen1 from './components/CareerScreen1';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';

const App = () => {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home1" >
        <Drawer.Screen  name="HomePage1" component={HomeScreen1} options={{ title: 'Home' }} />
        <Drawer.Screen name="CareerPage1" component={CareerScreen1} options={{ title: 'Careers' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

export default App;