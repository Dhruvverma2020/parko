import { useContext } from 'react';
import { Image, Text, View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
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
    function order() {
        setCurrentScreen(5);
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
            <View>
                <Text></Text>
            </View>
            <TouchableOpacity
                    onPress={order}
                    style={tw`bg-white bg-opacity-70 absolute bottom-12 right-12 z-50 p-4 rounded-full shadow-lg`}
                >
                    <Feather onPress={order} name="arrow-right" size={28} color={colors.textDark} />
                </TouchableOpacity>
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