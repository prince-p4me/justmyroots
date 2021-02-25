import { View, TouchableOpacity, Text, TextInput } from "react-native";
import React from "react"
import constant from "../constant";
import styles from "./style";
import Loader from "../Loader";
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class OTPScreen extends React.Component {
    state = {
        mobile: "",
        visible: false,
        otp: ""
    };

    componentDidMount = () => {
        console.log("entering OTP");
        const { navigation } = this.props;
        const mobile = navigation.getParam("mobile");
        console.log("mobile no.", mobile);
        this.setState({ mobile });
    }

    verify = async () => {
        let { mobile, otp } = this.state;
        if (!otp) {
            Toast.showWithGravity("Please enter OTP . . .", Toast.LONG, Toast.BOTTOM);
            return;
        }
        try {
            let response = await fetch(constant.API_URL + 'verifyMobile', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile,
                    otp
                })
            });
            response = await response.json();
            console.log("response", response);
            this.setState({ visible: false });
            if (response && response.verified && response.token) {
                await AsyncStorage.setItem(constant.TOKEN, response.token);
                Toast.showWithGravity("Otp verification successfull . . .", Toast.LONG, Toast.BOTTOM);
                this.props.navigation.navigate("App");
            } else {
                Toast.showWithGravity("Invalid OTP . . .", Toast.LONG, Toast.BOTTOM);
            }
        } catch (error) {
            this.setState({ visible: false });
        }
    }

    render() {
        let { mobile, visible, otp } = this.state;
        return (
            <View style={styles.container}>
                <Loader loading={visible} />
                <TextInput style={styles.input}
                    placeholder="Enter Mobile Number"
                    placeholderTextColor={"black"}
                    editable={false}
                    value={mobile}
                />
                <TextInput style={styles.input}
                    placeholder="Enter OTP"
                    placeholderTextColor={"black"}
                    maxLength={6}
                    value={otp}
                    keyboardType="phone-pad"
                    onChangeText={otp => this.setState({ otp })}
                    onSubmitEditing={() => this.verify()}
                    returnKeyLabel="Done"
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.fullBtn} activeOpacity={.8}
                    onPress={() => this.verify()}>
                    <Text style={styles.btnText}>VERIFY</Text>
                </TouchableOpacity>
            </View>
        )
    }
}