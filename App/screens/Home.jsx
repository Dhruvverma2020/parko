import * as React from 'react';
import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, TouchableOpacity, Modal, Animated, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import ScreenContext from '../Contexts/ScreenContext';
import SelectedContext from '../Contexts/SelectedContext';
import Nearby from '../components/Nearby';
import mapStyle from '../assets/mapStyle';
import Menu from './menu';



Feather.loadFont();

const initialRegion = {
    latitude: 26.0810475,
    longitude: 91.5621639,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
}

export default function Home() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const slideAnim = React.useRef(new Animated.Value(-400)).current;
    const { setCurrentScreen } = React.useContext(ScreenContext);
    const map = useRef();
    const { selected } = React.useContext(SelectedContext);

    function navigate() {
        setCurrentScreen(2);
    }

    function notifications() {
        setCurrentScreen(4);
    }

    function center() {
        map.current.animateToRegion(initialRegion);
    }

    return (
        <View className="bg-[#212121] flex-1">
            <Menu modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <TouchableOpacity
                onPress={() => setModalOpen(true)} 
                style={tw`bg-gray-100 absolute top-12 left-5 z-50 p-4 rounded-full shadow-lg`}
            >
                <Image source={require('../assets/images/Vector-2.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={notifications}
                style={tw`bg-gray-100 absolute top-12 left-24 z-50 p-4  rounded-full shadow-lg`}
            >
                <Image source={require('../assets/images/Vector-1.png')} />
            </TouchableOpacity>


            <View style={tw`h-3/4`} className="relative">
                <MapView
                    ref={map}
                    style={tw`flex-1`}
                    customMapStyle={mapStyle}
                    mapType='standard'
                    initialRegion={initialRegion}
                    provider="google"
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

                {selected ? (
                <TouchableOpacity onPress={navigate}
                    style={tw`bg-gray-100 absolute bottom-4 left-44 z-50 p-4 rounded-full shadow-lg`}
                >
                    <Image source={require('../assets/images/Vector.png')} />
                </TouchableOpacity>
            ) : null}
            </View>

            <Nearby />

            <StatusBar style="light" />
        </View>
    );
};
