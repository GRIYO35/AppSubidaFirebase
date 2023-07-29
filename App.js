import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import home from './screens/home'
import ImageUploader from './screens/UploadImg'

export default function App() {

  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
        name="home" 
        component={home}
        options= {{
          title: "DATOS",
          headerTitleAlign: "center",
          headerStyle: {backgroundColor:"#1B22F8"},
          headerTintColor: "#FFFFFF"
        }} />
        <Stack.Screen 
        name="UploadImg" 
        component={ImageUploader}
        options= {{
          title: "IMAGEN",
          headerTitleAlign: "center",
          headerStyle: {backgroundColor:"#1B22F8"},
          headerTintColor: "#FFFFFF"
        }}/>
      </Stack.Navigator>
    );
  }

  return (
   <NavigationContainer>
   <MyStack/>
   </NavigationContainer>
  );
}


