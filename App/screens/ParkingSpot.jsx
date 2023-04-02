import * as React from 'react';
import { Image, Text, View, StyleSheet, SafeAreaView} from 'react-native';
import { ColorSchemeProvider } from 'tailwindcss-react-native/dist/context/color-scheme';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import tw from 'tailwind-react-native-classnames';

Feather.loadFont();

export default function ParkingSpot() {
    return (
        <View style={styles.container}>
            <SafeAreaView>
            <View style={styles.headerWrapper}>
                <Feather name="arrow-left" size={30} color={colors.textDark} />
                <Text style={tw``}>Select A Parking Spot</Text>
                <Feather name="arrow-left" size={24} color={colors.background} />
            </View>
            </SafeAreaView>
            <View>
                <Text>C</Text>
            </View>
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