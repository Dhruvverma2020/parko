import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useRef, useContext } from 'react';
import { Text, TextInput, View, Image } from 'react-native';
import Toast from 'react-native-simple-toast';
import Button from '../components/Button';
import logo from "../assets/path_white.png";
import { otp, validate } from '../API/API';
import ScreenContext from '../Contexts/ScreenContext';
import LoginContext from '../Contexts/LoginContext';

export default function Login() {
    const [phone, setPhone] = useState("");
    const [enteredOTP, setEnteredOTP] = useState("");
    const [sent, setSent] = useState(false);
    const sentOnPhone = useRef(null);
    const {setCurrentScreen} = useContext(ScreenContext);
    const {setLoginDetails} = useContext(LoginContext);

    const sendOTP = async () => {
        if (phone) {
            sentOnPhone.current = phone;
            res = await otp(phone);
            if (res === 200) {
                setSent(true);
                Toast.show("OTP sent", Toast.SHORT);
            }
            else {
                Toast.show("Unable to send OTP", Toast.SHORT);
            }
        }
        else {
            Toast.show("Please Enter a phone number", Toast.SHORT);
        }
    }

    const login = async () => {
        if (enteredOTP) {
            let [status, data] = await validate(sentOnPhone.current, enteredOTP);
            if (status === 200) {
                await SecureStore.setItemAsync('loginID', data.loginID);
                await SecureStore.setItemAsync('sessionID', data.sessionID);
                await AsyncStorage.setItem("loggedIn", data.loginID);

                await setLoginDetails({
                    "loginID": data.loginID,
                    "sessionID": data.sessionID
                })

                if (data.exists) {
                    setCurrentScreen(1);
                }
                else {
                    setCurrentScreen(3);
                }
            }
            else {
                Toast.show("Wrong OTP!", Toast.SHORT);
            }
        }
        else {
            Toast.show("Please Enter the OTP", Toast.SHORT);
        }
    }

    return (
        <View className="flex-1 w-full h-full bg-blue-custom-1 justify-center items-center">
            <Image source={logo} className="w-20 h-28 mb-20" />

            <Text className="text-white font-bold text-xl">Login to Parko!</Text>
            <View className="w-[80%] my-8 flex-row items-center bg-white rounded-lg">
                <Text className="text-gray-700 font-bold px-2 border-r-2 border-gray-400 tracking-widest"> +91 </Text>

                <TextInput value={phone} onChangeText={(text) => {setPhone(text)}}
                className="bg-white rounded-lg py-2 px-2 flex-1 font-bold text-gray-700 tracking-widest"
                placeholder='Phone Number' keyboardType='phone-pad' />
            </View>

            {sent && (
                <View className="w-[60%] mb-8 flex-row items-center bg-white rounded-lg">
                    <TextInput value={enteredOTP} onChangeText={(text) => {setEnteredOTP(text)}}
                    className="bg-white rounded-lg py-2 px-2 flex-1 font-bold text-gray-700 text-center tracking-widest"
                    placeholder='OTP' keyboardType='numeric' maxLength={4} />
                </View>
            )}

            <View className="flex-row justify-evenly px-5 w-full">
                {sent ? (
                    <>
                        <Button title='Resend' onclick={sendOTP} />
                        <Button title='Login' onclick={login} />
                    </>
                ) : (
                    <Button title='Get OTP >' onclick={sendOTP} />
                )}
            </View>
            
            <StatusBar style="light" />
        </View>
    )
}