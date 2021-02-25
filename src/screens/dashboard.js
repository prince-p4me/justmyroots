import { View, ImageBackground, Text } from "react-native";
import React from "react"
import { WebView } from 'react-native-webview';
import Loader from "../Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import constant from "../constant";

export default class DashboardScreen extends React.Component {
    state = {
        token: "",
        loading: false
    };

    static navigationOptions = {
        header: null
    }

    componentDidMount = async () => {
        this.setState({ loading: true })
        // await AsyncStorage.setItem(constant.TOKEN, null);
        const token = await AsyncStorage.getItem(constant.TOKEN, null);
        this.setState({ token })
    }

    render() {
        let { token, loading } = this.state;
        if (token) {
            return <WebView source={{ uri: ("https://justmyroots.com/home/mobile/" + token) }} />
        } else {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {
                        <Loader visible={loading} />
                    }
                </View>
            )
        }
    }
}