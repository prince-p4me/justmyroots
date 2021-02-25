import { View, TouchableOpacity, Text, TextInput } from "react-native";
import React from "react"
import constant from "../constant";
import styles from "./style";
import Loader from "../Loader";
import Toast from 'react-native-simple-toast';

export default class Register extends React.Component {
    state = {
        mobile: "",
        firstName: "",
        lastName: "",
        email: "",
        referralCode: "",
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
        const regex = /\S+@\S+\.\S+/;
        let { mobile, firstName, lastName, email, referralCode } = this.state;
        if (!firstName) {
            Toast.showWithGravity("Please enter your first name . . .", Toast.LONG, Toast.BOTTOM);
            return;
        }
        if (!lastName) {
            Toast.showWithGravity("Please enter your last name . . .", Toast.LONG, Toast.BOTTOM);
            return;
        }
        if (!email || !regex.test(email)) {
            Toast.showWithGravity("Please enter your valid email id . . .", Toast.LONG, Toast.BOTTOM);
            return;
        }
        try {
            let response = await fetch(constant.API_URL + 'registerOTP', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile,
                    firstName,
                    lastName,
                    email,
                    referralCode
                })
            });
            response = await response.json();
            console.log("response", response);
            this.setState({ visible: false });
            if (response && response.status) {
                this.props.navigation.navigate("OTP", { mobile });
                Toast.showWithGravity("Otp sent to your mobile number or email", Toast.LONG, Toast.BOTTOM);
            } else {
                Toast.showWithGravity("Invalid request", Toast.LONG, Toast.BOTTOM);
            }
        } catch (error) {
            this.setState({ visible: false });
        }
    }

    render() {
        let { mobile, visible, firstName, lastName, email, referralCode } = this.state;

        return (
            <View style={styles.container}>
                <Loader loading={visible} />
                <TextInput style={styles.input}
                    placeholder="Enter Mobile Number"
                    placeholderTextColor={"black"}
                    keyboardType="phone-pad"
                    value={mobile}
                    editable={false}
                />
                <TextInput style={styles.input}
                    placeholder="Enter first name"
                    placeholderTextColor={"black"}
                    value={firstName}
                    onChangeText={firstName => this.setState({ firstName })}
                    returnKeyLabel="Next"
                    returnKeyType="next"
                />
                <TextInput style={styles.input}
                    placeholder="Enter last name"
                    placeholderTextColor={"black"}
                    value={lastName}
                    onChangeText={lastName => this.setState({ lastName })}
                    returnKeyLabel="Next"
                    returnKeyType="next"
                />
                <TextInput style={styles.input}
                    placeholder="Enter valid email address"
                    placeholderTextColor={"black"}
                    value={email}
                    keyboardType="email-address"
                    onChangeText={email => this.setState({ email })}
                    onSubmitEditing={() => this.register()}
                    returnKeyLabel="Done"
                    returnKeyType="done"
                />
                <TextInput style={styles.input}
                    placeholder="Enter referral code"
                    placeholderTextColor={"black"}
                    value={referralCode}
                    onChangeText={referralCode => this.setState({ referralCode })}
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