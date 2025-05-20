import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { useNavigation } from "@react-navigation/native";

export const PaymentSuccessPage = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.iconCircle}>
                    <AntDesign name="checkcircle" size={64} color={Colors.colorBrand.burntSienna[500]} />
                </View>
                <Text style={styles.title}>Thanh toán thành công!</Text>
                <Text style={styles.subtitle}>Cảm ơn bạn đã đặt vé.</Text>
                <Text style={styles.desc}>
                    Giao dịch của bạn đã được xử lý thành công. Chúng tôi sẽ liên hệ bạn sớm nhất để xác nhận thông tin.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("BottomTabScreenApp")}
                    activeOpacity={0.85}
                >
                    <Text style={styles.buttonText}>Về trang chủ</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray[100],
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 32,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        width: "100%",
        maxWidth: 350,
    },
    iconCircle: {
        backgroundColor: Colors.colorBrand.burntSienna[50],
        borderRadius: 50,
        padding: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.colorBrand.burntSienna[500],
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.colorBrand.midnightBlue[900],
        marginBottom: 8,
        textAlign: "center",
    },
    desc: {
        fontSize: 15,
        color: Colors.gray[600],
        marginBottom: 24,
        textAlign: "center",
    },
    button: {
        backgroundColor: Colors.colorBrand.burntSienna[500],
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 2,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1,
    },
});