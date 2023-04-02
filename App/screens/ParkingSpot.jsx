import { useContext } from 'react';
import { Image, Text, View, StyleSheet, SafeAreaView} from 'react-native';
import { ColorSchemeProvider } from 'tailwindcss-react-native/dist/context/color-scheme';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import tw from 'tailwind-react-native-classnames';
import ScreenContext from '../Contexts/ScreenContext';
import LoginContext from '../Contexts/LoginContext';

Feather.loadFont();

export default function ParkingSpot() {
    const { setCurrentScreen } = useContext(ScreenContext);
    const { loginDetails } = useContext(LoginContext);

    function back() {
        setCurrentScreen(1);
    }
    return (
        <View style={styles.container}>
            <SafeAreaView>
            <View style={styles.headerWrapper}>
                <Feather name="arrow-left" size={30} color={colors.textDark} onPress={back} />
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