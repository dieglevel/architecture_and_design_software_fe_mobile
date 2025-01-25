import { Press, SafeAreaView } from "@/apps/components";
import { InputForm } from "@/apps/components/ui";
import { Eye, EyeOff } from "@/assets/svgs";
import { Colors, Texts } from "@/constants";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export const LoginScreen = () => {
	const [phone, setPhone] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

	return (
		<SafeAreaView>
			<ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 10, gap: 10 }}>
				<View style={{ marginVertical: 20 }}>
					<Text
						style={[
							Texts.bold24,
							{ color: Colors.colorBrand.midnightBlue[950], textAlign: "center" },
						]}
					>
						Đăng nhập
					</Text>
					<Text style={[Texts.regular16, { color: Colors.gray[500], textAlign: "center" }]}>
						Cùng V-Travel đồng hành với bạn trong các chuyến đi.
					</Text>
				</View>
				<InputForm
					label="Số điện thoại"
					value={phone}
					onChangeText={setPhone}
					placeholder="Nhập số điện thoại"
					required
				/>
				<InputForm
					label="Mật khẩu"
					placeholder="Nhập mật khẩu"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={isShowPassword}
					right={isShowPassword ? <Eye /> : <EyeOff />}
					onRightPress={() => {
						setIsShowPassword(!isShowPassword);
					}}
					style={{ marginTop: 10 }}
					required
				/>
				<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
					<Press>
						<Text
							style={[
								Texts.regular16,
								{ color: Colors.colorBrand.burntSienna[500], textAlign: "right", marginTop: 8 },
							]}
						>
							Quên mật khẩu?
						</Text>
					</Press>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
