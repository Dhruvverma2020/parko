import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import Slider from '@react-native-community/slider';
import ScreenContext from '../Contexts/ScreenContext';
import LoginContext from '../Contexts/LoginContext';
import SelectedContext from '../Contexts/SelectedContext';
import SelectedSpotContext from '../Contexts/SelectedSpotContext';
import NotificationsContext from '../Contexts/NotificationsContext';
import { reserve } from "../API/API";
import Confirmation from "./Confirmation";
import SelectVehicleData from '../assets/data/SelectVehicleData';
import VehicleContext from "../Contexts/VehicleContext";
import RecentsContext from "../Contexts/RecentsContext";


Feather.loadFont();

export default function OrderDetail() {
    const [sliderValue, setSliderValue] = React.useState(1);

    const { setCurrentScreen } = React.useContext(ScreenContext);
    const { selected } = React.useContext(SelectedContext);
    const { selectedSpot } = React.useContext(SelectedSpotContext);
    const { loginDetails } = React.useContext(LoginContext);
    const notifications = React.useContext(NotificationsContext);
    const recents = React.useContext(RecentsContext);
    const { currentVehicle } = React.useContext(VehicleContext);

    const [modal, setModal] = React.useState(false);

    function back() {
        setCurrentScreen(2);
    }

    function book() {
        reserve(
            selected[0],
            selectedSpot.spot,
            selectedSpot.from + sliderValue,
            sliderValue * 50,
            loginDetails.loginID,
            loginDetails.sessionID
        )
        notifications.unshift(["Successful Transaction", "1 parking slot booked", "Now"]);
        recents.unshift([selected[1], selectedSpot.spot, sliderValue, SelectVehicleData[currentVehicle-1].model]);
        setModal(true);
    }


    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView>
                <View style={styles.headerWrapper}>
                    <Feather name="arrow-left" onPress={back} size={28} color={colors.textDark} />
                </View>
            </SafeAreaView>

            {/*Titles*/}
            <View>
                <Text style={styles.titlesSubtitle}>Order detail</Text>
                <Text style={styles.titlesTitle}>Duration</Text>
                <Text style={styles.titlesTime}>{sliderValue} Hours</Text>
                <Slider
                    style={{ width: 350, height: 60, alignSelf: 'center', }}
                    minimumValue={1}
                    maximumValue={12}
                    minimumTrackTintColor='lightblue'
                    maximumTrackTintColor='#000'
                    thumbTintColor='blue'
                    stepValue={1}
                    onValueChange={(id) => setSliderValue(parseInt(id))}
                    sliderValue={sliderValue} />
            </View>
            <View style={styles.Vehicle}>
                <Text style={styles.Title}>VEHICLE</Text>
                <Text style={styles.subtitle}> {SelectVehicleData[currentVehicle-1].model}   |   {SelectVehicleData[currentVehicle-1].num}</Text>
                <Text style={styles.Title}>PARKING LOT</Text>
                <Text style={styles.subtitle}> {selected[1]}   |   Slot {selectedSpot.spot}</Text>
                <View style={styles.total}>
                    <Text style={styles.titleTotal}>TOTAL</Text>
                    <Text style={styles.subtitleTotal}>{sliderValue * 50} Rs</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.Confirm}
                onPress={book}>
                <Text style={styles.bodyConfirm}> Confirm & Pay </Text>
            </TouchableOpacity>

            {modal && <Confirmation />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: 48,
        allignItems: 'center',
    },
    titlesSubtitle: {
        paddingLeft: 20,
        paddingTop: 40,
        fontSize: 36,
        fontWeight: 'bold',
    },
    titlesTitle: {
        paddingTop: 40,
        paddingLeft: 20,
        fontSize: 24,
    },
    titlesTime: {
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 50,
        color: '#0F0F0F',
    },
    Vehicle: {
        backgroundColor: '#F3F6FF',
        paddingTop: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    Title: {
        color: '#677191',
        paddingTop: 24,
        fontSize: 20,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingBottom: 30,
        paddingLeft: 10,
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        backgroundColor: "#E2E9FD",
        alignItems: 'center',
        borderLeftWidth: 7,
        borderLeftColor: '#567DF4',
    },
    titleTotal: {
        fontSize: 20,
        color: '#677191',
        paddingBottom: 20,
        paddingLeft: 10,
        alignSelf: 'center',
    },
    subtitleTotal: {
        fontSize: 20,
        paddingBottom: 20,
        paddingRight: 10,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    Confirm: {
        backgroundColor: '#567DF4',
        marginTop: 50,
        marginLeft: 60,
        marginRight: 60,
        borderRadius: 35,
        paddingBottom: 20
    },
    bodyConfirm: {
        fontSize: 18,
        alignSelf: 'center',
        color: '#FFFFFF',
        paddingTop: 15,
    }
});