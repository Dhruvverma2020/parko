import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Modal, FlatList } from 'react-native';
import SignOut from "../components/SignOut";
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import tw from 'tailwind-react-native-classnames';
import SelectVehicleData from '../assets/data/SelectVehicleData';

Feather.loadFont();

export default function Menu({ modalOpen, setModalOpen }) {
    function back() {
        setModalOpen(false);
  }
  const renderSelectVehicleItem = ({item}) => {
    return(
      <View style={styles.bg}>
        <View style={styles.align}>
          <View style={styles.text1}>
            <Text style={styles.text2}>{item.model}</Text>
            <Text style={styles.text3}>{item.num}</Text>
          </View>
          <Text style={styles.text4}>{item.image}</Text>
        </View>
      </View>
    );
  };
    return (
        <Modal visible={modalOpen} animationType='slide'> 
            <View style={styles.container}>
                  {/* Header */}
                   <SafeAreaView>
                      <View style={styles.headerWrapper}>
                        <Feather name="arrow-left" onPress={back} size={28} color={colors.textDark} marginLeft={10} />
                      </View>
                   </SafeAreaView>
                    <View style={styles.tab}>
                      <Image style={styles.account}source={require('../assets/images/person_icon.png')} />
                      <Text style={styles.text}>Dhruv Verma</Text>
                      <Feather name="settings" size={28} color={colors.textDark} marginRight={20} />
                    </View>
                    {/* Select Vehicle*/}
                    <View>
                       <FlatList
                            data={SelectVehicleData}
                            renderItem={renderSelectVehicleItem}
                            keyExtractor={item => item.id}/>    
                    </View>
            </View>
        </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tab: {
        marginTop: 90,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#F3F6FF",
    },
    account:  {
        marginLeft: 20,
        width: 65,
        height: 65,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 100,
    },
    bg: {
    },
    align: {
      justifyContent: 'space-between',
      flexDirection: 'row',

    },
    text1: {
      paddingTop: 20,
      paddingLeft: 20,
    },
    text2: {
      paddingTop: 20,
      fontWeight: 'bold',
    },
    text3: {
      paddingTop: 20,
    },
    text4: {
    },  
  });