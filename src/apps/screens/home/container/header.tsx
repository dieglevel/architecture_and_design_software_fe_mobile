import { Text, View } from "react-native";

const Header = () => {
   return ( <View>
      <View style={{ padding: 10, backgroundColor: "red" }}>
         <Text style={{ color: "white", fontSize: 20 }}>Header</Text>
      </View>
   </View> );
}
 
export default Header;