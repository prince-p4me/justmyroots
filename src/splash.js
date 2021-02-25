import { View, ImageBackground, Text } from "react-native";
import React from "react"
import splash from "./assets/imgs/splash.png"
import Loader from "./Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import constant from "./constant";
import SplashScreen from 'react-native-splash-screen';

export default class Splash extends React.Component {
    state = {
        loading: false
    };

    componentDidMount = async () => {
        try {
            this.setState({ loading: true })
            // await AsyncStorage.setItem(constant.TOKEN, null);
            const token = await AsyncStorage.getItem(constant.TOKEN, null);
            if (token) {
                this.props.navigation.navigate("App")
            } else {
                this.props.navigation.navigate("Auth")
            }
            SplashScreen.hide();
            this.setState({ loading: false })
        } catch (e) {
            console.log("error", e)
            this.setState({ loading: false });
            // saving error
        }
    }

    render() {
        let { loading } = this.state;
        return (
            <ImageBackground source={splash} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <Text>Hello</Text> */}
                <Loader loading={loading} />
            </ImageBackground>
        )
    }
}