import { StatusBar } from 'expo-status-bar';
import { useState, useContext } from 'react';
import { Text, TextInput, View, Image, ToastAndroid as Toast } from 'react-native';
// import Toast from 'react-native-simple-toast';
import Button from '../components/Button';
import logo from "../assets/path_white.png";
import { registerUser } from '../API/API';
import ScreenContext from '../Contexts/ScreenContext';
import LoginContext from '../Contexts/LoginContext';

export default function Signup() {
    const {setCurrentScreen} = useContext(ScreenContext);
    const {loginDetails} = useContext(LoginContext);

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");

    const register = async () => {
        if (first && last && email) {
            const loginID = loginDetails.loginID;
            const sessionID = loginDetails.sessionID;

            let status = await registerUser(first, last, email, loginID, sessionID);
            if (status === 200) {
                setCurrentScreen(1);
            }
            else {
                Toast.show("Unable to register", Toast.SHORT);
            }
        }
        else {
            Toast.show("Please Enter all the details", Toast.SHORT);
        }
    }

    return (
        <View className="flex-1 w-full h-full bg-blue-custom-1 justify-center items-center">
            <Image source={logo} className="w-20 h-28 mb-20" />

            <Text className="text-white font-bold text-xl">Please Enter your details</Text>
            <View className="w-[80%] my-8 flex-row items-center">
                <TextInput value={first} onChangeText={(text) => {setFirst(text)}}
                className="bg-white rounded-lg py-2 px-2 mr-2 flex-1 font-bold text-gray-700 text-left"
                placeholder='First Name' keyboardType='default' />

                <TextInput value={last} onChangeText={(text) => {setLast(text)}}
                className="bg-white rounded-lg py-2 px-2 ml-2 flex-1 font-bold text-gray-700 text-left"
                placeholder='Last Name' keyboardType='default' />
            </View>
            <View className="w-[70%] mb-8 flex-row items-center">
                <TextInput value={email} onChangeText={(text) => {setEmail(text)}}
                className="bg-white rounded-lg py-2 px-2 flex-1 font-bold text-gray-700 text-left"
                placeholder='Email' keyboardType='email-address' />
            </View>

            <View className="flex-row justify-evenly px-5 w-full">
                <Button title='Continue' onclick={register} />
            </View>
            
            <StatusBar style="light" />
        </View>
    )
}