import React,{ useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Home from './views/Home';
import ImageView from './views/ImageView';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import gallery from './assets/gallery.png'

const stack = createNativeStackNavigator()


export default function App() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='HomeScreen' 
        options={{
        title:'Gallery',
        headerStyle:{backgroundColor:"#0D0D0D"},
        headerTitleStyle: {fontWeight: "bold"},
        headerTintColor: "#d17c04",
        headerLeft: () => <Image source={gallery} style={styles.logo} />,
        headerRight: () => (
          <Text style={styles.TextSearch} onPress={() => setOpenSearch(!openSearch)}>
            {openSearch ? "Close" : "Search"}
          </Text>) 
        }}>
          {(props)=><Home {...props} openSearch={openSearch}/> }
        </stack.Screen>
        <stack.Screen name='ImageView' component={ImageView} options={{
          title: "Profile",
          headerTitleStyle: {fontWeight: "bold"},
          headerStyle: {backgroundColor: "#0D0D0D"},
          headerTintColor: "#d17c04",
        }}/>
      </stack.Navigator>
      <StatusBar />
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    marginEnd: 5,
    borderRadius: 7,
  },
  TextSearch:{ color: "#d17c04", fontSize: 18 },
});