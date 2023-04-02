import * as React from 'react';
import { Text, TextInput, View, Animated,  StyleSheet, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import SignOut from "../components/SignOut";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectVehicleData from '../assets/data/SelectVehicleData';
import colors from '../assets/colors/colors';
import MapView, {Marker} from 'react-native-maps';
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

export default function Home() {
  const {setCurrentScreen} = React.useContext(ScreenContext);

  function navigate() {
    setCurrentScreen(2);
  }

  return (
    <View style={styles.container}>
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
        
        
        

      <View style={tw`h-5/6`}>
      <MapView
            style={tw`flex-1`}
            customMapStyle={mapStyle}
            mapType='mutedStandard'
            initialRegion={{
                latitude: 26.0801024,
                longitude: 91.5588184,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
            }}
        >
          <Marker
          coordinate={{
            latitude: 26.0801024,
            longitude: 91.5588184,
          }}
          image={require('../assets/images/Vector_2.png')}
          title="Location"
          description='Where to'
          />
        </MapView>
      </View>
      <TouchableOpacity style={{
        backgroundColor: '#FFFFFF',
        height: 140,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 25,
        flexDirection: 'row',
        paddingHorizontal: 20,
        // marginTop: 20,
      }}>
      <Feather name="search" size={30} color={colors.textDark}/>
      <Text style={{
        flex: 1,
        marginLeft: 10,
      }}>Search for Parking Spots</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

