import { useEffect, useState } from 'react';
import LoginContext from './Contexts/LoginContext';
import ScreenContext from './Contexts/ScreenContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import ScreenRenderer from './screens/ScreenRenderer';

export default function App() {
    const [loginDetails, setLoginDetails] = useState({
        loginID: "",
        sessionID: ""
    });

    const [currentScreen, setCurrentScreen] = useState(0)

    useEffect(() => {
        async function IIFE() {
            const loggedIn = await AsyncStorage.getItem("loggedIn");

            if (loggedIn) {
                const loginID = await SecureStore.getItemAsync('loginID');
                const sessionID = await SecureStore.getItemAsync('sessionID');

                setLoginDetails({
                    loginID,
                    sessionID
                });
                setCurrentScreen(1);
            }
        }
        IIFE();
    }, [])
    return (
        <LoginContext.Provider value={{loginDetails, setLoginDetails}}>
            <ScreenContext.Provider value={{currentScreen, setCurrentScreen}}>
                <ScreenRenderer />
            </ScreenContext.Provider>
        </LoginContext.Provider>
    );
}
