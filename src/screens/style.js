import { StyleSheet } from "react-native";
import constant from "../constant";

export default StyleSheet.create({
    container: {
        flex: 1, justifyContent: "center",
        alignItems: "center",
        backgroundColor: constant.background,
        padding: 14
    },
    fullBtn: {
        width: "100%", height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: constant.theme
    },
    btnText: {
        color: constant.white,
        fontSize: 18,
        fontWeight: "900",
        letterSpacing: 1
    },
    input: {
        width: "100%", height: 45,
        // backgroundColor: constant.theme,
        marginVertical: 15,
        borderBottomWidth: 1,
        paddingLeft: 14,
        borderColor: constant.text
    }
})