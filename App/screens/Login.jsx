import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';

export default function Login() {
    const [phone, setPhone] = useState("");

    return (
        <View className="flex-1 w-full h-full bg-blue-custom-1 justify-center items-center">

            <Text className="text-white font-bold text-xl">Login to Parko!</Text>
            <View className="w-[80%] my-8 flex-row items-center bg-white rounded-lg">
                <Text className="text-gray-700 font-bold px-2 border-r-2 border-gray-400 tracking-widest"> +91 </Text>

                <TextInput value={phone} onChangeText={(text) => {setPhone(text)}}
                className="bg-white rounded-lg py-2 px-2 flex-1 font-bold text-gray-700 tracking-widest"
                placeholder='Phone Number' keyboardType='phone-pad' />
            </View>
            <Button title='Get OTP' />

            <StatusBar style="light" />
        </View>
    )
}