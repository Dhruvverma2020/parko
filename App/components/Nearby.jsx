import { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { getSpaces } from '../API/API';
import SelectedContext from '../Contexts/SelectedContext';

// Directions in Map: https://instamobile.io/react-native-tutorials/react-native-draw-directions-map/
const dist = ["0.6", "31.7"]

export default function Nearby({ setCoordinates }) {
    const [spaces, setSpaces] = useState([]);
    const { selected, setSelected } = useContext(SelectedContext);

    useEffect(() => {
        async function IIFE() {
            res = await getSpaces();
            setSpaces(res.spaces);
        }
        IIFE();
    }, [])

    return (
        <View className="bg-white h-1/4 rounded-t-[40px] pt-3 px-5">
            <TouchableOpacity style={{
                // height: 140,
                // borderTopLeftRadius: 30,
                // borderTopRightRadius: 25,
                flexDirection: 'row',
                // paddingHorizontal: 20,
                // marginTop: 15,
            }}>
                <Text style={{
                    flex: 1,
                    marginLeft: 10,
                }}
                    className="text-center">
                    Parking Spots Nearby</Text>
            </TouchableOpacity>

            <ScrollView className="py-2">
                {spaces.map((space) => (
                    <TouchableOpacity
                        className={`flex-row p-3 rounded-2xl my-4 ${selected[0] == space.id ? "bg-blue-100" : ""}`}
                        key={space.id}
                        onPress={() => {
                            if (selected != space.id) {
                                setSelected([space.id, space.name]);
                                setCoordinates({
                                    latitude: space.lat,
                                    longitude: space.lon
                                })
                            } else { setSelected(0); }
                        }}>
                        <Image source={require("../assets/images/location-pin.png")}
                            className="h-14 w-8 opacity-80" />
                        <View className="mx-4 flex-1 -mt-1">
                            <Text className="font-bold text-md opacity-70"> {space.name} </Text>
                            <Text className="opacity-40"> {space.type} </Text>
                            <Text className="opacity-90"> {dist[space.id-1]} KM </Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </View>
    )
}
