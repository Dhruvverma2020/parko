import { useContext } from "react";
import { Button } from "react-native";
import LoginContext from "../Contexts/LoginContext";
import ScreenContext from "../Contexts/ScreenContext";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignOut() {
    const { setLoginDetails } = useContext(LoginContext);
    const { setCurrentScreen } = useContext(ScreenContext);
    return (
        <Button title="Sign Out" onPress={() => {
            AsyncStorage.removeItem('loggedIn');
            SecureStore.deleteItemAsync('loginID');
            SecureStore.deleteItemAsync('sessionID');
            
            setLoginDetails({
                loginID: "",
                sessionID: ""
            });
            setCurrentScreen(0);
        }} />
    )
}
