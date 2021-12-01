import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import * as React from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  ViewStyle,
} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import {TextBold, TextRegular, TextSemiBold} from '../../components/Text';
import {dzikirDb} from '../../services/db';
import {Dzikir} from '../../types';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import {Colors} from '../../colors';
import MenuDrawer from 'react-native-side-drawer';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../rematch/store';
import Content from './Content';
import Notes from './Notes';

const rippleConfig = {color: 'lightgray', borderless: true};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const SwithModeButton = ({
  initialMode,
  onChange,
}: {
  initialMode: string;
  onChange: (val: string) => void;
}) => {
  const [mode, setMode] = React.useState(initialMode);
  React.useEffect(() => onChange(mode), [mode]);

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

const DzikirScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {colors: themeColors} = useTheme();
  const time: string = (route.params as any).time || undefined;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [drawerOpened, setDrawerOpened] = React.useState(false);
  const dispatch = useDispatch<Dispatch>();
  const mode = useSelector((state: RootState) => state.app.viewMode);
  const showCounter = useSelector(
    (state: RootState) => state.app.showCounter || false,
  );
  const enableVibrate = useSelector(
    (state: RootState) => state.app.enableVibrate || false,
  );
  const [counters, setCounters] = React.useState<Map<number, number>>(
    new Map(),
  );

  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef<PagerView>(null);

  const items: Array<Dzikir> = React.useMemo(
    () => dzikirDb.filter(it => it.time == time || it.time == ''),
    [time],
  );

  const currentItem = React.useMemo(() => {
    if (!items) return undefined;
    return items[currentPage];
  }, [items, currentPage]);

  const increaseCounter = React.useCallback(() => {
    let id = currentItem?.id || -1;
    let count = counters.get(id) || 0;
    let max = currentItem?.max_counter || 0;
    if (count >= max) {
      if (enableVibrate) Vibration.vibrate(500);
      return;
    }

    if (enableVibrate) Vibration.vibrate(100);
    setCounters(new Map(counters.set(id, count + 1)));
  }, [currentItem, enableVibrate]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // setTimeout(() => setMounted(true), 500);
      setMounted(true);
    });
    return unsubscribe;
  }, [navigation]);

  const drawerContent = React.useCallback(
    () => (
      <View
        style={{
          flexDirection: 'row',
          height: '100%',
        }}>
        <Pressable
          style={{backgroundColor: '#00000066', flex: 1}}
          onPress={() => setDrawerOpened(false)}
        />
        <ScrollView
          style={{
            backgroundColor: themeColors.card,
            maxWidth: '60%',
            paddingTop: 20,
          }}>
          <View style={{padding: 10}}>
            <TextBold style={{fontSize: 22, color: themeColors.text}}>
              Dzikir {time}
            </TextBold>
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
                borderBottomColor: themeColors.border,
                borderBottomWidth: 1,
                backgroundColor:
                  currentPage == idx ? Colors.lightBlue : themeColors.card,
              }}>
              <TextRegular
                style={{
                  color: currentPage == idx ? Colors.white : themeColors.text,
                }}>
                {item.title}
              </TextRegular>
            </Pressable>
          ))}
          <View style={{height: 30}} />
        </ScrollView>
      </View>
    ),
    [items, time, currentPage],
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
      <SafeAreaView style={{flex: 1, backgroundColor: themeColors.background}}>
        <View
          style={{
            flexDirection: 'row',
            height: 48,
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={{left: 10, top: 10, right: 10, bottom: 10}}>
            <Icon name="home" size={22} color={themeColors.text} />
          </Pressable>
          <View style={{flex: 1, alignItems: 'center'}}>
            <SwithModeButton
              initialMode={mode}
              onChange={val => dispatch.app.setViewMode(val)}
            />
          </View>
          <Pressable
            onPress={() => setDrawerOpened(true)}
            hitSlop={{left: 10, top: 10, right: 10, bottom: 10}}>
            <Icon name="list" size={22} color={themeColors.text} />
          </Pressable>
        </View>
        <Progress.Bar
          progress={progress}
          width={null}
          borderRadius={0}
          borderWidth={0}
          color={Colors.lightBlue}
          unfilledColor={themeColors.card}
          height={3}
        />
        <AnimatedPagerView
          ref={ref}
          style={{flex: 1}}
          onPageSelected={e => setCurrentPage(e.nativeEvent.position)}>
          {React.useMemo(
            () =>
              items.map((item, idx) => {
                return <Content item={item} key={idx} mode={mode} />;
              }),
            [items, mode],
          )}
        </AnimatedPagerView>
        <View
          style={{
            position: 'absolute',
            bottom: Platform.OS == 'ios' ? 70 : 90,
            right: 10,
          }}>
          {!!showCounter &&
            !!currentItem?.max_counter &&
            currentItem?.max_counter > 1 && (
              <Pressable
                onPress={increaseCounter}
                android_ripple={rippleConfig}>
                <CircularProgress
                  value={counters.get(currentItem?.id) || 0}
                  radius={40}
                  duration={300}
                  textColor={Colors.lightBlue}
                  textStyle={{fontSize: 22, fontFamily: 'Nunito-Bold'}}
                  maxValue={currentItem?.max_counter}
                  title={undefined}
                  titleFontSize={16}
                  titleColor={'#333'}
                  titleStyle={{fontWeight: 'bold'}}
                  circleBackgroundColor={themeColors.card}
                  activeStrokeColor={'#2465FD'}
                  activeStrokeSecondaryColor={'#C3305D'}
                  inActiveStrokeColor={themeColors.border}
                  activeStrokeWidth={8}
                />
              </Pressable>
            )}
        </View>
        {mounted && <Notes item={currentItem} />}
      </SafeAreaView>
    </MenuDrawer>
  );
};
export default DzikirScreen;
