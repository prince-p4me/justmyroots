import { View, ImageBackground, Text } from "react-native";
import React from "react"

export default class Login extends React.Component {
    state = {};

    componentDidMount = () => {

    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Login</Text>
            </View>
        )
    }
}