import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../assets/colors/colors';
import notificationsData from '../assets/data/notificationsData';
import ScreenContext from '../Contexts/ScreenContext';

Feather.loadFont();

export default function Notifications() {
    const { setCurrentScreen } = React.useContext(ScreenContext);

    function back() {
        setCurrentScreen(1);
    }

  const rendernotificationsItem = ({item}) => {
    return(
      <View 
      style={[
        styles.notiItems,
        {
          backgroundColor: item.selected ? colors.flatlist : colors.secondary,
          borderLeftWidth: 15,
          borderLeftColor: item.selected ? colors.flatlist1 : colors.secondary,
        },
      ]}>
        <View style={styles.notiItemWrapper}>
        <Text style={styles.notiTitle}>{item.title}</Text>
        <Text style={styles.notiBody}>{item.body}</Text>
       </View>
       <Text style={styles.notiTime}>{item.time}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.headerWrapper}>
        <Feather onPress={back} name="arrow-left" size={28} color={colors.textDark} />
        <Feather style = {styles.mid} name="search" size={28} color={colors.textDark} />
        {/* <Feather name="settings" size={28} color={colors.textDark} /> */}
        </View>
      </SafeAreaView>
      
      {/*Titles*/}
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesSubtitle}>Notifications</Text>
      </View>
      {/*notifications*/}
      <View style={styles.notiWrapper}>
        <FlatList
        data={notificationsData}
        renderItem={rendernotificationsItem}
        keyExtractor={item => item.id}/>
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
  mid: {
    marginLeft: 220,
  },
  titlesWrapper: {
    marginTop:60,
    paddingHorizontal: 15,
  },
  titlesSubtitle: {
    fontSize: 40,
    color: colors.textDark,
  },
  notiWrapper: {
    paddingTop: 50,
  },
  notiItems: {
    flexDirection: 'row',
    justifyContent: "space-between",
    backgroundColor: "#F3F6FF",
    marginBottom: 30,
    alignItems: 'center',
  },
  notiItemWrapper: {

  },
  notiTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    paddingTop: 10,
    paddingLeft: 16,

  },
  notiBody: {
    fontSize: 14,
    paddingLeft: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  notiTime: {
    paddingRight: 20,
  },
});