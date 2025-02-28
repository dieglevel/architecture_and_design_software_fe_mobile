import { Press, SafeAreaView } from "@/apps/components";
import { Button, InputForm } from "@/apps/components/ui";
import { Close, Eye, EyeOff } from "@/assets/svgs";
import { Calendar } from "@/assets/svgs/calendar";
import { Colors, Texts } from "@/constants";
import { navigate } from "@/libs/navigation/navigationService";
import { useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const SignupScreen = () => {
	// Params
	const [name, setName] = useState<string>("");
	const [dateOfBirth, setDateOfBirth] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
	const [isDatePickVisible, setDatePickVisible] = useState<boolean>(false);
	const [checked, setChecked] = useState<boolean>(false);

	const { height } = Dimensions.get("window");

	const [errors, setErrors] = useState<Object>({
		name: null,
		dob: null,
		phone: null,
		password: null,
	});

	// Functions
	const showDatePicker = () => {
		setDatePickVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickVisible(false);
	};

	const handleConfirm = (date: Date) => {
		const formattedDate = format(date, "dd/MM/yyyy", { locale: vi }); // Định dạng ngày tháng
		setDateOfBirth(formattedDate);
		validateDOB(formattedDate);
		hideDatePicker();
	};

	const validatePhone = (text: string) =>
		/^(0|\+84)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/.test(text) ? null : "Số điện thoại không hợp lệ!";
	const validateName = (text: string) => {
		return /^[a-zA-ZÀ-Ỹà-ỹ\s]+$/.test(text.trim()) ? null : "Họ và tên không hợp lệ!";
	};
	const validateDOB = (text: string) => {
		const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
		if (!dateRegex.test(text)) return "Ngày sinh phải có định dạng dd/MM/yyyy!";

		const [day, month, year] = text.split("/").map(Number);
		const birthDate = new Date(year, month - 1, day);
		const today = new Date();

		// Tính ngày cách đây 16 năm
		const sixteenYearsAgo = new Date();
		sixteenYearsAgo.setFullYear(today.getFullYear() - 16);

		if (birthDate >= today) {
			return "Ngày sinh không hợp lệ!";
		}

		if (birthDate > sixteenYearsAgo) {
			return "Người dùng phải trên 16 tuổi!";
		}

		return null;
	};
	const validatePassword = (text: string) => {
		const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return regex.test(text) ? null : "Mật khẩu ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
	};

	// SubmitAPI
	const handeRegister = () => {
		const newErrors = {
			name: validateName(name),
			dob: validateDOB(dateOfBirth),
			phone: validatePhone(phone),
			password: validatePassword(password),
		};
		setErrors(newErrors);

		// Nếu không có lỗi nào
		if (Object.values(newErrors).every((error) => error === null)) {
			console.log("Gửi API đăng ký");
			// Gọi API đăng ký ở đây
		} else {
			console.log("Thông tin không hợp lệ");
		}
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
						onChangeText={setName}
						value={name}
						validator={validateName}
						required
					/>
					<InputForm
						label="Ngày sinh"
						placeholder="DD/MM/YYYY"
						onChangeText={setDateOfBirth}
						value={dateOfBirth}
						required
						right={<Calendar />}
						onRightPress={showDatePicker}
						validator={validateDOB}
					/>

					<DateTimePicker
						isVisible={isDatePickVisible}
						onConfirm={handleConfirm}
						mode="date"
						display="compact"
						onCancel={hideDatePicker}
						maximumDate={new Date()}
						minimumDate={new Date(1900, 0, 1)}
					/>

					<InputForm
						label="Số điện thoại"
						value={phone}
						onChangeText={setPhone}
						placeholder="Nhập số điện thoại"
						required
						validator={validatePhone}
					/>
					<InputForm
						label="Nhập mật khẩu"
						placeholder="Nhập mật khẩu"
						value={password}
						onChangeText={setPassword}
						secureTextEntry={!isShowPassword}
						right={isShowPassword ? <Eye /> : <EyeOff />}
						onRightPress={() => {
							setIsShowPassword(!isShowPassword);
						}}
						validator={validatePassword}
						style={{ marginTop: 10 }}
						required
					/>
					<View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 8 }}>
						<BouncyCheckbox
							size={20}
							fillColor={Colors.gray[500]}
							onPress={(isChecked: boolean) => {
								setChecked(isChecked);
							}}
							text="Tôi đồng ý với Chính sách Bảo mật và Các Điều khoản"
							iconStyle={{ borderColor: Colors.gray[500] }}
							textStyle={[
								Texts.regular14,
								{ color: Colors.gray[500], textDecorationLine: "none" },
							]}
							style={{ marginTop: 8, flex: 1 }}
						/>
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
						<Text style={[Texts.regular16, { color: Colors.gray[500] }]}>Đã có tài khoản?</Text>
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
