import { useContext } from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import LoginContext from "../Contexts/LoginContext";
import ScreenContext from "../Contexts/ScreenContext";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignOut() {
    const { setLoginDetails } = useContext(LoginContext);
    const { setCurrentScreen } = useContext(ScreenContext);
    return (
        <TouchableOpacity onPress={() => {
            AsyncStorage.removeItem('loggedIn');
            SecureStore.deleteItemAsync('loginID');
            SecureStore.deleteItemAsync('sessionID');
            
            setLoginDetails({
                loginID: "",
                sessionID: ""
            });
            setCurrentScreen(0);
        }} 
            className="shadow flex-row items-center" > 
            <Image className="w-6 h-6 mr-2" source={require('../assets/images/logout.png')} />
            <Text className="text-lg font-bold text-red-500"> Sign Out </Text>
        </TouchableOpacity>
    )
}
