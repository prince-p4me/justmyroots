import { View, ImageBackground, Text } from "react-native";
import React from "react"

export default class DashboardScreen extends React.Component {
    state = {};

    static navigationOptions = {
        header: null
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello</Text>
            </View>
        )
    }
}