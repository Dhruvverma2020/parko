import { useEffect, useState } from 'react';
import LoginContext from './Contexts/LoginContext';
import ScreenContext from './Contexts/ScreenContext';
import SelectedContext from './Contexts/SelectedContext';
import SelectedSpotContext from './Contexts/SelectedSpotContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import ScreenRenderer from './screens/ScreenRenderer';
import NotificationsContext, { notifications } from './Contexts/NotificationsContext';
import VehicleContext from './Contexts/VehicleContext';
import RecentsContext, { recents } from './Contexts/RecentsContext';
import { authenticateLogin } from './API/API';

export default function App() {
    const [loginDetails, setLoginDetails] = useState({
        loginID: "",
        sessionID: ""
    });

    const [currentScreen, setCurrentScreen] = useState(-1);
    const [selected, setSelected] = useState([0, ""]);
    const [selectedSpot, setSelectedSpot] = useState({
        spot: "",
        from: 0,
        duration: 0
    })
    const [currentVehicle, setCurrentVehicle] = useState(1);

    useEffect(() => {
        async function IIFE() {
            const loggedIn = await AsyncStorage.getItem("loggedIn");

            if (loggedIn) {
                const loginID = await SecureStore.getItemAsync('loginID');
                const sessionID = await SecureStore.getItemAsync('sessionID');

                res = await authenticateLogin(loginID, sessionID);

                if (res === 200) {
                    setLoginDetails({
                        loginID,
                        sessionID
                    });
                    setCurrentScreen(1);
                }
                
                else {
                    AsyncStorage.setItem('loggedIn', "");
                    setCurrentScreen(0);
                }
            }
            else {
                setCurrentScreen(0);
            }
        }
        IIFE();
    }, [])
    return (
        <LoginContext.Provider value={{loginDetails, setLoginDetails}}>
            <ScreenContext.Provider value={{currentScreen, setCurrentScreen}}>
                <SelectedContext.Provider value={{selected, setSelected}}>
                    <SelectedSpotContext.Provider value={{selectedSpot, setSelectedSpot}}>
                        <NotificationsContext.Provider value={notifications}>
                            <VehicleContext.Provider value={{currentVehicle, setCurrentVehicle}}>
                                <RecentsContext.Provider value={recents}>
                                    <ScreenRenderer /> 
                                </RecentsContext.Provider>
                            </VehicleContext.Provider>
                        </NotificationsContext.Provider>
                    </SelectedSpotContext.Provider>
                </SelectedContext.Provider>
            </ScreenContext.Provider>
        </LoginContext.Provider>
    );
}
