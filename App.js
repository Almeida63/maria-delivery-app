import React, { useEffect, useRef } from "react";
import { Animated, Image, ImageBackground, StyleSheet, View } from "react-native";
import Estilos from "./Estilos";
import Login from "./Login";
import TelaInicial from "./TelaInicial"
import TelaCompra from "./TelaCompra"
import PosCompra from "./PosCompra"
import Imagens from "./imagens/Maria.Delivery.png";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
 
 
const Stack = createNativeStackNavigator();
 
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start(() => {
      props.navigation.navigate("Login");
    });
  }, [fadeAnim, props.navigation]);
 
  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};
 
const Main = ({ navigation }) => {
  return (
    <View style={Estilos.appContainer}>
      <ImageBackground
        source={{
          uri:
           "https://gartic.com.br/imgs/mural/bi/biel_lokinho/tela-vermelha.png",
        }}
        resizeMode="cover"
        style={Estilos.appImage}
        //imageStyle={{ opacity: 0.3 }}
      >
        <FadeInView style={{ ...Estilos.appFadein, justifyContent: "center" }} navigation={navigation}>
          <Image
            style={{ ...Estilos.logo, width: 150, height: 150}}
            source={require("./imagens/Maria.Delivery.png")}
             
 
          />
        </FadeInView>
      </ImageBackground>
    </View>
  );
};
 
export default () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF0000",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="Main" component={Main} options={{ title: "Maria Delivery", headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ title: "Maria Delivery - Login", headerShown: false }}/>
      <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ title: "Maria Delivery", headerShown: true }} />
      <Stack.Screen name="TelaCompra" component={TelaCompra} options={{ title: "Tela de Compra", headerShown: true }} />
      <Stack.Screen name="PosCompra" component={PosCompra} options={{ title: "Maria Delivery", headerShown: true }} />
 
 
     
    </Stack.Navigator>
  </NavigationContainer>
);