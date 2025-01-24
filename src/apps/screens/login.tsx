import { SafeAreaView } from "@/apps/components";
import { InputForm } from "@/apps/components/ui";
import { Brand } from "@/assets/svgs";
import { Colors, Texts } from "@/constants";
import { ScrollView, Text, View } from "react-native";

export const LoginScreen = () => {
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
					onLeftPress={() => {}}
					placeholder="Nhập số điện thoại"
					right={<Brand size={25} />}
					onRightPress={() => {
						console.log("helo");
					}}
					required
				/>
				<InputForm
					label="Mật khẩu"
					onLeftPress={() => {}}
					placeholder="Nhập mật khẩu"
					right={<Brand size={25} />}
					onRightPress={() => {
						console.log("helo");
					}}
					style={{ marginTop: 10 }}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};
