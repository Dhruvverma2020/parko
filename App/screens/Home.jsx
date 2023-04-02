import * as React from 'react';
import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, Animated, StyleSheet, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import SignOut from "../components/SignOut";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectVehicleData from '../assets/data/SelectVehicleData';
import colors from '../assets/colors/colors';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import ScreenContext from '../Contexts/ScreenContext';

const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
];


Feather.loadFont();

const initialRegion = {
    latitude: 26.0810475,
    longitude: 91.5621639,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
}

export default function Home() {
    const { setCurrentScreen } = React.useContext(ScreenContext);
    const map = useRef();

    function navigate() {
        setCurrentScreen(2);
    }

    function center() {
        map.current.animateToRegion(initialRegion)
    }

    return (
        <View style={styles.container} className="bg-[#212121]">
            <TouchableOpacity
                style={tw`bg-gray-100 absolute top-10 left-5 z-50 p-4 rounded-full shadow-lg`}
            >
                <Image source={require('../assets/images/Vector-2.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`bg-gray-100 absolute top-10 left-24 z-50 p-4  rounded-full shadow-lg`}
            >
                <Image source={require('../assets/images/Vector-1.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={navigate}
                style={tw`bg-gray-100 absolute top-10 left-44 z-50 p-4 rounded-full shadow-lg`}
            >
                <Image source={require('../assets/images/Vector.png')} />
            </TouchableOpacity>




            <View style={tw`h-3/4`} className="relative">
                <MapView
                    ref={map}
                    style={tw`flex-1`}
                    customMapStyle={mapStyle}
                    mapType='standard'
                    initialRegion={initialRegion}
                >
                    <Marker
                        coordinate={{
                            latitude: 26.0810475,
                            longitude: 91.5621639,
                        }}
                        image={require('../assets/images/Vector_2.png')}
                        title="Location"
                        description='Current'
                    />
                    <Marker
                        className="w-20 h-20"
                        coordinate={{
                            // 26.08215504236644, 91.56582959636721
                            latitude: 26.0821550,
                            longitude: 91.5658296,
                        }}
                        // image={require('../assets/path.png')}
                        title="IT Park"
                        description='Parking Space'
                    >
                        <Image
                            source={require('../assets/path.png')}
                            className="w-20 h-20"
                            resizeMode="contain"
                        />
                    </Marker>
                </MapView>
                <TouchableOpacity
                    onPress={center}
                    style={tw`bg-gray-100 bg-opacity-70 absolute bottom-4 right-4 z-50 p-3 rounded-full shadow-lg`}
                >
                    <Image className="h-4 w-4" source={require('../assets/images/location.png')} />
                </TouchableOpacity>
            </View>

            <View className="bg-white h-full rounded-t-[40px] pt-3 px-5">
                <TouchableOpacity style={{
                    // height: 140,
                    // borderTopLeftRadius: 30,
                    // borderTopRightRadius: 25,
                    flexDirection: 'row',
                    // paddingHorizontal: 20,
                    // marginTop: 15,
                }}>
                    <Feather name="search" size={30} color={colors.textDark} />
                    <Text style={{
                        flex: 1,
                        marginLeft: 10,
                    }}>Search for Parking Spots</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

