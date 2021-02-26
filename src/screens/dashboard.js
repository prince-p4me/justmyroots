import { View, ActivityIndicator, Platform, BackHandler } from "react-native";
import React from "react"
import { WebView } from 'react-native-webview';
import Loader from "../Loader";
// import Constant from "../constant";
import AsyncStorage from '@react-native-async-storage/async-storage';
import constant from "../constant";

export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            loading: false,
            canGoBack: false
        };
        // this.webview = null;
    }

    webview = React.createRef();


    static navigationOptions = {
        header: null
    }

    componentDidMount = async () => {
        console.log("Webview")
        this.setState({ loading: true })
        this.checkVersion();
        // await AsyncStorage.setItem(constant.TOKEN, null);
        const token = await AsyncStorage.getItem(constant.TOKEN, null);
        this.setState({ token });
        BackHandler.addEventListener("hardwareBackPress", this.backButtonHandler);
    }

    checkVersion = async () => {
        let response = await fetch(constant.API_URL + 'getCurrentBuild', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        let jsonResposne = await response.json()
        console.warn(jsonResposne)
        // alert(JSON.stringify(jsonResposne))
        if (Platform.OS == 'android') {
            if (jsonResposne.android_version != '0.3.1') {
                this.props.navigation.navigate('Force')
                return;
            }
        }
        if (Platform.OS == 'ios') {
            if (jsonResposne.android_version != '1.1') {
                this.props.navigation.navigate('Force')
                return;
            }
        }
    }

    backButtonHandler = () => {
        console.log("handling back button");
        if (this.webview && this.webview.current && this.state.canGoBack) {
            this.webview.current.goBack();
            return true;
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
                ref={this.webview}
                // ref={ref => (this.webview = ref)}
                onNavigationStateChange={navState => {
                    this.setState({ canGoBack: navState.canGoBack });
                }}
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