import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Modal, FlatList, TouchableOpacity } from 'react-native';
import SignOut from "../components/SignOut";
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import SelectVehicleData from '../assets/data/SelectVehicleData';
import VehicleContext from "../Contexts/VehicleContext";
import RecentsContext from "../Contexts/RecentsContext";

Feather.loadFont();

export default function Menu({ modalOpen, setModalOpen }) {
    const { currentVehicle, setCurrentVehicle } = React.useContext(VehicleContext);
    const recents = React.useContext(RecentsContext);

    function back() {
        setModalOpen(false);
    }
    const renderSelectVehicleItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setCurrentVehicle(item.id);
                }}
                className={`flex-row my-2 rounded-xl pl-4 pb-2 ${currentVehicle == item.id && "bg-blue-100"}`}>
                <View className="justify-center">
                    <Image className="h-6 w-10" source={require('../assets/images/car-front.png')} />
                </View>
                <View className="pl-4 flex-1">
                    <Text className="font-bold my-2 text-lg">{item.model}</Text>
                    <Text className="">{item.num}</Text>
                </View>
                <View className="p-4 justify-center">
                    <View className="h-4 w-4 p-[2px] border-[1px] rounded-full border-blue-500">
                        {currentVehicle == item.id ? (
                            <View className="flex-1 border-[1px] rounded-full bg-blue-500" />
                        ) : null}
                        
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <Modal visible={modalOpen} animationType='slide'>
            <View style={styles.container}>
                {/* Header */}
                <SafeAreaView>
                    <View style={styles.headerWrapper}>
                        <Feather onPress={back} name="arrow-left" size={28} color={colors.textDark} />
                    </View>
                </SafeAreaView>
                <View style={styles.tab}>
                    <Image style={styles.account} source={require('../assets/images/profile.jpg')} />
                    <Text style={styles.text}> Abhinav Kumar </Text>
                    <Feather name="settings" size={28} color={colors.textDark} marginRight={20} />
                </View>
                {/* Select Vehicle*/}
                <View className="mx-5">
                    <Text className="font-bold"> Vehicles {'>'} </Text>
                    <FlatList
                        data={SelectVehicleData}
                        renderItem={renderSelectVehicleItem}
                        keyExtractor={item => item.id} />
                </View>

                <View className="mx-5 mt-6">
                    <Text className="font-bold"> Recents {'>'} </Text>
                    {
                        recents.map((item, index) => (
                            <View className="bg-gray-100 rounded-2xl p-4 mt-3" key={index}>
                                <Text className="font-bold mb-1">
                                    {item[0]} | {item[1]}
                                </Text>
                                <Text>
                                    {item[3]} | {item[2]} Hrs
                                </Text>
                            </View>
                        ))
                    }
                </View>

                <View className="absolute bottom-10 left-10">
                    <SignOut />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: 30,
        allignItems: 'center',
    },
    tab: {
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#F3F6FF",
    },
    account: {
        marginLeft: 20,
        width: 65,
        height: 65,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 100,
    },
    align: {
        justifyContent: 'space-between',
        flexDirection: 'row',

    }
});