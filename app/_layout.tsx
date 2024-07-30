import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from 'react-redux';
import store from "@/store";
import Route from "@/router/Route";


export const unstable_settings = {
  initialRouteName: "landing/index",
};

console.log('at layout');


const RootLayout = () =>{

  return(
    <Provider store={store}>
      <Route/>
      <View></View>
    </Provider>
  )
}

export default RootLayout;


const styles = StyleSheet.create({
  title:{
    fontSize:18,
    fontWeight: 'bold',
    color: Colors.light.background
  }
})