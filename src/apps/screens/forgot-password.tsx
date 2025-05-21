import { Press, SafeAreaView } from "@/apps/components";
import { Button, InputForm } from "@/apps/components/ui";
import { Close } from "@/assets/svgs";
import { Colors, Texts } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";

export const ForgotPasswordScreen = () => {
	const [email, setEmail] = useState<string>("");
	const navigate = useNavigation();

	const { height } = Dimensions.get("window");

	return (
		<SafeAreaView>
			<ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 10, gap: 10 }}>
				<View style={{ flex: 1, justifyContent: "center", height: height }}>
					<View style={{ marginVertical: 20 }}>
						<Text
							style={[
								Texts.bold24,
								{ color: Colors.colorBrand.midnightBlue[950], textAlign: "center" },
							]}
						>
							Quên mật khẩu?
						</Text>
						<Text style={[Texts.regular16, { color: Colors.gray[500], textAlign: "center" }]}>
							Đừng lo chúng tôi sẽ giúp bạn khôi phục tài khoản.
						</Text>
					</View>
					<InputForm
						label="Địa chỉ email"
						value={email}
						onChangeText={setEmail}
						placeholder="Nhập địa chỉ email của bạn"
						required
					/>
					<Button
						style={{ marginTop: 8 }}
						onPress={() => {
							console.log("adu");
						}}
					>
						Gửi
					</Button>

					<View style={{ flexDirection: "row", justifyContent: "center", gap: 4, marginTop: 16 }}>
						<Text style={[Texts.regular16, { color: Colors.gray[500] }]}>Hoặc</Text>
						<Press onPress={() => navigate.navigate("RegisterScreen")}>
							<Text style={[Texts.regular16, { color: Colors.colorBrand.burntSienna[500] }]}>
								Tạo tài khoản mới
							</Text>
						</Press>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
