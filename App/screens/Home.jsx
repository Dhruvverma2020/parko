import { Text, View } from "react-native";
import SignOut from "../components/SignOut";

export default function Home() {
  return (
    <View className="w-full h-full bg-slate-100">
        <Text> Home </Text>
        <SignOut />
    </View>
  )
}
