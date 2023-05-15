import { useContext, useEffect, useState } from 'react';
import { Image, Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import tw from 'tailwind-react-native-classnames';
import ScreenContext from '../Contexts/ScreenContext';
import SelectedContext from '../Contexts/SelectedContext';
import SelectedSpotContext from '../Contexts/SelectedSpotContext';
import { getSpots } from "../API/API";
import Dropdown from "../components/Dropdown";

Feather.loadFont();

export default function ParkingSpot() {
    const { setCurrentScreen } = useContext(ScreenContext);
    const { selected } = useContext(SelectedContext);
    const { selectedSpot, setSelectedSpot } = useContext(SelectedSpotContext);

    const [spots, setSpots] = useState([]);
    const [from, setFrom] = useState(0);

    function back() {
        setCurrentScreen(1);
    }
    function order() {
        setCurrentScreen(5);
    }
    function select(spot) {
        setSelectedSpot({
            spot: spot,
            from: from,
            duration: 1
        })
    }

    useEffect(() => {
        async function IIFE() {
            res = await getSpots(selected[0]);
            setSpots(res.spots);
            select("");
        }
        IIFE();
    }, [from])


    const renderSpots = () => {
        const rows = [];
        for (let i = 0; i < spots.length; i += 2) {
            const spot1 = spots[i];
            const spot2 = spots[i+1];
            rows.push(
                <View className="flex-row" key={i}>
                    <TouchableOpacity className={`w-[50%] rounded-2xl py-4 pr-6 ${(selectedSpot.spot == spot1.spot) && "bg-blue-300"}`}
                        onPress={() => {
                                if (from >= spot1.availablein) {
                                    select(spot1.spot);
                                }
                            }}>
                        {
                            from >= spot1.availablein ? (
                                <Image className="h-20 w-40 ml-6" source={require("../assets/images/nocar.png")} />
                            ) :
                            (
                                <Image className="h-20 w-40 ml-6" source={require("../assets/images/car.png")} />
                            )
                        }
                        <Text className="w-full text-center mt-2 font-bold text-lg opacity-70"> {spot1.spot} </Text>
                        <View className="bg-black/70 w-full h-[7px] rounded-full mt-3" />
                    </TouchableOpacity>
                    <TouchableOpacity className={`w-[50%] rounded-2xl py-4 pl-6 ${(selectedSpot.spot == spot2.spot) && "bg-blue-300"}`}
                        onPress={() => {
                            if (from >= spot2.availablein) {
                                select(spot2.spot);
                            }
                        }}>
                        {
                            from >= spot2.availablein ? (
                                <Image className="h-20 w-40 mr-6" source={require("../assets/images/nocar-flip.png")} />
                            ) :
                            (
                                <Image className="h-20 w-40 mr-6" source={require("../assets/images/car-flip.png")} />
                            )
                        }
                        <Text className="w-full text-center mt-2 font-bold text-lg opacity-70"> {spot2.spot} </Text>
                        <View className="bg-black/70 w-full h-[7px] rounded-full mt-3" />
                    </TouchableOpacity>
                </View>
            )
        }

        return rows;
    }

    return (
        <View style={styles.container} className="relative">
            <SafeAreaView>
            <View style={styles.headerWrapper} className="mt-2">
                <Feather name="arrow-left" size={30} color={colors.textDark} onPress={back} />
                <Text style={tw`text-lg`}>Select A Parking Spot</Text>
                <Feather name="arrow-left" size={24} color={colors.background} />
            </View>
            </SafeAreaView>
            <Dropdown value={from} setValue={setFrom} />
            <ScrollView className="h-full py-6">
                {
                    renderSpots()
                }
                
            </ScrollView>
            {selectedSpot.spot ? (
                <TouchableOpacity
                    onPress={order}
                    style={tw`bg-white absolute bottom-12 right-12 z-50 p-4 rounded-full shadow-lg`}
                >
                    <Feather onPress={order} name="arrow-right" size={28} color={colors.textDark} />
                </TouchableOpacity>
            ) : null}
                
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ECF1FF',
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
  });