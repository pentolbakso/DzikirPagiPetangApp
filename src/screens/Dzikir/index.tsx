import {useNavigation, useRoute} from '@react-navigation/native';
import * as React from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import {
  TextArabic,
  TextBold,
  TextLight,
  TextRegular,
  TextSemiBold,
} from '../../components/Text';
import {dzikirDb} from '../../services/db';
import {Dzikir} from '../../types';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import {Colors} from '../../colors';
import MenuDrawer from 'react-native-side-drawer';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const SwithModeButton = () => {
  const [mode, setMode] = React.useState('normal');

  const SwitchBtn = ({id, label}: {id: string; label: string}) => (
    <Pressable
      style={{
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: mode == id ? Colors.lightBlue : undefined,
      }}
      onPress={() => setMode(id)}>
      <Text
        style={{
          fontWeight: '600',
          color: mode == id ? Colors.white : Colors.lightBlue,
        }}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.lightBlue,
        // borderRadius: 0,
        overflow: 'hidden',
        height: 32,
        minWidth: 180,
      }}>
      <SwitchBtn id="normal" label="Normal" />
      <SwitchBtn id="hafalan" label="Hafalan" />
    </View>
  );
};

const Content = ({item}: {item: Dzikir}) => {
  const arabicArr = React.useMemo(() => item.arabic.split('|'), [item]);
  const latinArr = React.useMemo(() => item.arabic_latin.split('|'), [item]);
  const tarjimArr = React.useMemo(() => item.translated_id.split('|'), [item]);

  return (
    <ScrollView style={{backgroundColor: '#fff', padding: 15}}>
      <TextBold style={{fontSize: 24, textAlign: 'center'}}>
        {item.title}
      </TextBold>
      {/* <TextArabic>{arabicArr.join(',')}</TextArabic>
      <TextRegular>{tarjimArr.join(',')}</TextRegular> */}
      {/* {arabicArr.map((it, idx) => (
        <View
          key={idx}
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}>
          <TextArabic>{it}</TextArabic>
          <TextLight style={{textAlign: 'right', color: '#333'}}>
            {latinArr[idx]}
          </TextLight>
          <TextRegular style={{textAlign: 'right'}}>
            {tarjimArr[idx]}
          </TextRegular>
        </View>
      ))} */}
      <View style={{height: 30}} />
    </ScrollView>
  );
};

const DzikirScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const time: string = (route.params as any).time || undefined;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [drawerOpened, setDrawerOpened] = React.useState(false);

  const ref = React.useRef<PagerView>(null);

  const items: Array<Dzikir> = React.useMemo(
    // () => dzikirDb.filter(it => it.time == time || it.time == ''),
    () => dzikirDb,
    [time],
  );

  const drawerContent = React.useCallback(
    () => (
      <View style={{flexDirection: 'row', height: '100%'}}>
        <Pressable
          style={{backgroundColor: '#00000066', flex: 1}}
          onPress={() => setDrawerOpened(false)}
        />
        <ScrollView
          style={{
            backgroundColor: '#fff',
            maxWidth: '60%',
            paddingTop: 20,
          }}>
          <View style={{padding: 10}}>
            <TextBold style={{fontSize: 22}}>Dzikir {time}</TextBold>
          </View>
          {items.map((item, idx) => (
            <Pressable
              key={idx}
              onPress={() => {
                setDrawerOpened(false);
                ref.current?.setPageWithoutAnimation(idx);
              }}
              style={{
                padding: 10,
                borderBottomColor: '#eee',
                borderBottomWidth: 1,
              }}>
              <TextRegular>{item.title}</TextRegular>
            </Pressable>
          ))}
          <View style={{height: 30}} />
        </ScrollView>
      </View>
    ),
    [items, time],
  );

  const progress = React.useMemo(() => {
    if (!items) return 0;
    return (currentPage + 1) / items.length;
  }, [currentPage, items]);

  return (
    <MenuDrawer
      open={drawerOpened}
      drawerContent={drawerContent()}
      drawerPercentage={100}
      animationTime={150}
      overlay={true}
      // opacity={0.4}
      position="right">
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            height: 48,
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={{left: 5, top: 5, right: 5, bottom: 5}}>
            <Icon name="home" size={22} />
          </Pressable>
          <View style={{flex: 1, alignItems: 'center'}}>
            <SwithModeButton />
          </View>
          <Pressable onPress={() => setDrawerOpened(true)}>
            <Icon name="list" size={22} />
          </Pressable>
        </View>
        <Progress.Bar
          progress={progress}
          width={null}
          borderRadius={0}
          borderWidth={0}
          color={Colors.lightBlue}
          unfilledColor={'#eee'}
          height={3}
        />
        <AnimatedPagerView
          ref={ref}
          style={{flex: 1, backgroundColor: 'red'}}
          onPageSelected={e => setCurrentPage(e.nativeEvent.position)}>
          {React.useMemo(
            () =>
              items.map((item, idx) => {
                return <Content item={item} key={idx} />;
              }),
            [items],
          )}
        </AnimatedPagerView>
      </SafeAreaView>
    </MenuDrawer>
  );
};

export default DzikirScreen;
