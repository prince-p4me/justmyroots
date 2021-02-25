import { View, ActivityIndicator, BackHandler } from "react-native";
import React from "react"
import { WebView } from 'react-native-webview';
import Loader from "../Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import constant from "../constant";

export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            loading: false
        };
        this.webview = null;
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount = async () => {
        console.log("Webview")
        this.setState({ loading: true })
        // await AsyncStorage.setItem(constant.TOKEN, null);
        const token = await AsyncStorage.getItem(constant.TOKEN, null);
        this.setState({ token });
        BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
    }

    backButtonHandler = () => {
        console.log("handling back button");
        if (this.webview) {
            this.webview.goBack()
        } else {
            BackHandler.exitApp();
        }
    }



    render() {
        let { token, loading } = this.state;
        if (token) {
            return <WebView source={{ uri: ("https://justmyroots.com/home/mobile/" + token) }}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator
                        color={constant.theme}
                        size='large'
                        style={{ flex: 1 }}
                    />
                )}
                ref={ref => (this.webview = ref)}
            />
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