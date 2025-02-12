import { Press, SafeAreaView } from "@/apps/components";
import { Button, InputForm } from "@/apps/components/ui";
import { Close, Eye, EyeOff } from "@/assets/svgs";
import { Calendar } from "@/assets/svgs/calendar";
import { Colors, Texts } from "@/constants";
import { navigate } from "@/libs/navigation/navigationService";
import { useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

export const SignupScreen = () => {
	const [phone, setPhone] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
	const [isDatePickVisible, setDatePickVisible] = useState<boolean>(false);

	const { height } = Dimensions.get("window");

	const showDatePicker = () => {
		setDatePickVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickVisible(false);
	};

	const handleConfirm = (date: any) => {
		console.warn("A date has been picked: ", date);
		hideDatePicker();
	};

	return (
		<SafeAreaView>
			<Press style={{ position: "absolute", backgroundColor: "transpert", padding: 4, top: 40, right: 20 }}>
				<Close size={25} />
			</Press>
			<ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 10, gap: 10 }}>
				<View style={{ flex: 1, justifyContent: "center", height: height }}>
					<View style={{ marginVertical: 20 }}>
						<Text
							style={[
								Texts.bold24,
								{ color: Colors.colorBrand.midnightBlue[950], textAlign: "center" },
							]}
						>
							Đăng ký
						</Text>
						<Text style={[Texts.regular16, { color: Colors.gray[500], textAlign: "center" }]}>
							Cùng V-Travel đồng hành với bạn trong các chuyến đi.
						</Text>
					</View>
					<InputForm
						label="Họ và tên"
						placeholder="Nhập họ và tên"
						required
					/>
					<InputForm
						label="Ngày sinh"
						placeholder="DD/MM/YY"
						required
						right={<Calendar />}
						onRightPress={showDatePicker}
					/>

					<DateTimePicker
						isVisible={isDatePickVisible}
						onConfirm={handleConfirm}
						mode="date"
						onCancel={hideDatePicker}
					/>

					<InputForm
						label="Số điện thoại"
						value={phone}
						onChangeText={setPhone}
						placeholder="Nhập số điện thoại"
						required
					/>
					<InputForm
						label="Nhập mật khẩu"
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
									{
										color: Colors.colorBrand.burntSienna[500],
										textAlign: "right",
										marginTop: 8,
									},
								]}
							>
								Quên mật khẩu?
							</Text>
						</Press>
					</View>

					<Button
						style={{ marginTop: 8 }}
						onPress={() => {
							console.log("adu");
						}}
					>
						Đăng ký
					</Button>

					<View style={{ flexDirection: "row", justifyContent: "center", gap: 4, marginTop: 16 }}>
						<Text style={[Texts.regular16, { color: Colors.gray[500] }]}>Bạn chưa có tài khoản?</Text>
						<Press
							onPress={() => {
								navigate("LoginScreen");
							}}
						>
							<Text style={[Texts.regular16, { color: Colors.colorBrand.burntSienna[500] }]}>
								Đăng nhập
							</Text>
						</Press>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
