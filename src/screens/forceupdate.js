import React, { Component } from "react";
// import { connect } from "react-redux";
import { Platform, Linking, View, Text, TouchableOpacity, BackHandler } from "react-native";
import Constant from "../constant";

// import Icon from "react-native-vector-icons/FontAwesome";
export default class ForceUpdateScreen extends Component {
    state = {
        androidUrl: "https://play.google.com/store/apps/details?id=com.cre8comm.app&hl=en",
        iosUrl: ""
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
        })
    }

    openStore = () => {
        let { androidUrl, iosUrl } = this.state;
        let url = Platform.OS == "android" ? androidUrl : iosUrl;
        Linking.openURL(url).then(() => {
            console.log("url opened");
            BackHandler.exitApp();
        }).catch(err => {
            console.error("Couldn't load page", err);
        });;
    }

    render() {

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ width: '70%', textAlign: "center", fontSize: 15, color: 'black', }}>Please update your applicaiton otherwise it will stop working.</Text>
                <TouchableOpacity style={{
                    height: 60, width: '80%',
                    backgroundColor: 'rgb(161,31,34)', justifyContent: "center",
                    alignItems: 'center', marginTop: 20
                }}
                    onPress={() => this.openStore()}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: "800" }}>UPDATE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}