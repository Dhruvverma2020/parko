import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, FlatList } from 'react-native';
import SignOut from "../components/SignOut";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/colors';
import Slider from '@react-native-community/slider';
import ScreenContext from '../Contexts/ScreenContext';


Feather.loadFont();

export default function OrderDetail() {
  const [sliderValue, setSliderValue] = React.useState(0);
  const { setCurrentScreen } = React.useContext(ScreenContext);
  function back() {
    setCurrentScreen(2);
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
        <Text style={styles.titlesTime}>{sliderValue} min</Text>
        <Slider
        style={{ width: 350, height: 60, alignSelf: 'center',}}
        minimumValue={1}
        maximumValue={720}
        minimumTrackTintColor='lightblue'
        maximumTrackTintColor='#000'
        thumbTintColor='blue'
        stepValue={1}
        onValueChange={(id) => setSliderValue(parseInt(id))}
        sliderValue={sliderValue}/>
      </View>
      <View style={styles.Vehicle}>
        <Text style={styles.Title}>VEHICLE</Text>
        <Text style={styles.subtitle}>2021 Audi Q3   |   UP 72 8055</Text>
        <Text style={styles.Title}>PARKING LOT</Text>
        <Text style={styles.subtitle}>IT Park Parking   |   Slot A01</Text>
        <View style={styles.total}>
          <Text style={styles.titleTotal}>TOTAL</Text>
          <Text style={styles.subtitleTotal}>{sliderValue} Rs</Text>
        </View>
      </View>
      <View style={styles.Confirm}>
        <Text style={styles.bodyConfirm}>Confirm & Pay</Text>
      </View>

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