import { View, ImageBackground, Text } from "react-native";
import React from "react"
import splash from "./assets/imgs/splash.png"
import Loader from "./Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import constant from "./constant";
import SplashScreen from 'react-native-splash-screen';

export default class Splash extends React.Component {
    state = {};

    componentDidMount = async () => {
        try {
            const token = await AsyncStorage.getItem(constant.TOKEN, null);
            if (token) {
                this.props.navigation.navigate("App")
            } else {
                this.props.navigation.navigate("Auth")
            }
            SplashScreen.hide();
        } catch (e) {
            // saving error
        }
    }

    render() {
        return (
            <ImageBackground source={splash} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <Text>Hello</Text> */}
                <Loader visible={true} />
            </ImageBackground>
        )
    }
}