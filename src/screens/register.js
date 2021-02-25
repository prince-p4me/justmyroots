import { View, TouchableOpacity, Text, TextInput } from "react-native";
import React from "react"
import constant from "../constant";
import styles from "./style";
import Loader from "../Loader";
import Toast from 'react-native-simple-toast';

export default class Register extends React.Component {
    state = {
        mobile: "",
        visible: false
    };

    componentDidMount = () => {
        console.log("entering Register");
        const { navigation } = this.props;
        const mobile = navigation.getParam("mobile");
        console.log("mobile no.", mobile);
        this.setState({ mobile });
    }

    register = async () => {
        let { mobile } = this.state;
        try {
            let response = await fetch(constant.API_URL + 'sendOtp', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile
                })
            });
            response = await response.json();
            console.log("response", response);
            this.setState({ visible: false });
            if (response) {
                this.props.navigation.navigate((response.status ? "Otp" : "Register"), { mobile });
            }
            Toast.showWithGravity("Otp sent to your mobile number or email", Toast.LONG, Toast.BOTTOM);
        } catch (error) {
            this.setState({ visible: false });
        }
        // Toast.show({
        //     text: "Wish a dish submitted successfuly",
        //     buttonText: "Okay",
        //     duration: 3000
        // });
    }

    render() {
        let { mobile, visible } = this.state;
        return (
            <View style={styles.container}>
                <Loader loading={visible} />
                <TextInput style={styles.input}
                    placeholder="Enter Mobile Number"
                    placeholderTextColor={"black"}
                    keyboardType="phone-pad"
                    onChangeText={mobile => this.setState({ mobile })}
                    onSubmitEditing={() => this.register()}
                    returnKeyLabel="Done"
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.fullBtn} activeOpacity={.8}
                    onPress={() => this.register()}>
                    <Text style={styles.btnText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        )
    }
}