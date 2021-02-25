import { View, ImageBackground, Text } from "react-native";
import React from "react"
import splash from "./assets/imgs/splash.png"
export default class Splash extends React.Component {
    state = {};

    componentDidMount = () => {

    }

    render() {
        return (
            <ImageBackground source={splash} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello</Text>
            </ImageBackground>
        )
    }
}