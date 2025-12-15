import {useNavigation, useRoute} from '@react-navigation/native';
import * as React from 'react';
import {Animated, Platform, Pressable, Text, Vibration} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import {TextBold, TextRegular} from '../../components/Text';
import {dzikirDb} from '../../services/db';
import {Dzikir} from '../../types';
import {ScrollView} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import MenuDrawer, {MenuDrawerProps} from 'react-native-side-drawer';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../rematch/store';
import Notes from './Notes';
import ContentV2 from './ContentV2';
import Icon from '@react-native-vector-icons/feather';
import {useAppTheme} from '../../theme/useAppTheme';
import dayjs from 'dayjs';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const Drawer = (props: MenuDrawerProps) => {
  return (
    <MenuDrawer
      open={props.open}
      drawerContent={props.drawerContent}
      drawerPercentage={100}
      animationTime={150}
      overlay={true}
      // opacity={0.4}
      position="right">
      {props.children}
    </MenuDrawer>
  );
};

const SwitchModeButton = ({
  initialMode,
  onChange,
}: {
  initialMode: string;
  onChange: (val: string) => void;
}) => {
  const {
    theme: {colors},
  } = useAppTheme();
  const [mode, setMode] = React.useState(initialMode);
  const SwitchBtn = React.useMemo(
    () =>
      ({
        id,
        label,
        onPress,
      }: {
        id: string;
        label: string;
        onPress: (id: string) => void;
      }) =>
        (
          <Pressable
            style={{
              flex: 1,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: mode == id ? colors.primaryContainer : undefined,
            }}
            onPress={() => onPress(id)}>
            <Text
              style={{
                fontWeight: '600',
                color: mode == id ? colors.onPrimaryContainer : colors.primary,
              }}>
              {label}
            </Text>
          </Pressable>
        ),
    [mode, colors],
  );

  const handlePress = React.useCallback(
    (id: string) => {
      setMode(id);
      onChange(id);
    },
    [setMode, onChange],
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: colors.primaryContainer,
        // borderRadius: 0,
        // backgroundColor: colors.primary,
        overflow: 'hidden',
        height: 32,
        minWidth: 180,
      }}>
      <SwitchBtn id="normal" label="Normal" onPress={handlePress} />
      <SwitchBtn id="hafalan" label="Hafalan" onPress={handlePress} />
    </View>
  );
};

const DzikirScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    theme: {colors},
  } = useAppTheme();
  const time: string = (route.params as any).time || undefined;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [drawerOpened, setDrawerOpened] = React.useState(false);
  const dispatch = useDispatch<Dispatch>();
  const mode = useSelector((state: RootState) => state.app.viewMode);
  const showCounter = useSelector(
    (state: RootState) => !!state.app.showCounter,
  );
  const enableVibrate = useSelector(
    (state: RootState) => !!state.app.enableVibrate,
  );
  const [counters, setCounters] = React.useState<Record<number, number>>({});
  const enableTracker = useSelector(
    (state: RootState) => !!state.app.enableTracker,
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
    let max = currentItem?.max_counter || 0;

    setCounters(prevCounters => {
      let count = prevCounters[id] || 0;
      if (count >= max) {
        if (enableVibrate) Vibration.vibrate(500);
        return prevCounters;
      }

      if (enableVibrate) Vibration.vibrate(100);
      return {...prevCounters, [id]: count + 1};
    });
  }, [currentItem, enableVibrate]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // setTimeout(() => setMounted(true), 500);
      setMounted(true);
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  // Track habit: record completion after 60 seconds
  React.useEffect(() => {
    if (!enableTracker) return;

    const timer = setTimeout(() => {
      const today = dayjs().format('YYYY-MM-DD');
      if (time === 'pagi' || time === 'petang') {
        console.log('Recording habit for', time, 'on', today);
        dispatch.app.recordHabit({
          date: today,
          time: time as 'pagi' | 'petang',
        });
      }
    }, 60000); // 60 seconds

    return () => clearTimeout(timer);
  }, [time, enableTracker, dispatch]);

  const drawerContent = React.useMemo(
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
            backgroundColor: colors.background,
            maxWidth: '70%',
            paddingTop: 50,
          }}>
          <View style={{padding: 10}}>
            <TextBold style={{fontSize: 22}}>dzikir {time}</TextBold>
          </View>
          {items.map((item, idx) => {
            const isActive = currentPage === idx;
            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  setDrawerOpened(false);
                  ref.current?.setPageWithoutAnimation(idx);
                }}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderBottomColor: colors.outlineVariant,
                  borderBottomWidth: 1,
                  backgroundColor: isActive
                    ? colors.primaryContainer
                    : colors.surface,
                }}>
                <TextRegular
                  style={{
                    color: isActive
                      ? colors.onPrimaryContainer
                      : colors.onBackground,
                  }}>
                  {item.title}
                </TextRegular>
              </Pressable>
            );
          })}
          <View style={{height: 120}} />
        </ScrollView>
      </View>
    ),
    [drawerOpened, items, time, currentPage, colors],
  );

  const progress = items ? (currentPage + 1) / items.length : 0;

  return (
    <Drawer
      open={drawerOpened}
      drawerContent={drawerContent}
      drawerPercentage={100}
      animationTime={150}
      overlay={true}
      // opacity={0.4}
      position="right">
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
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
            <Icon name="home" size={22} color={colors.onBackground} />
          </Pressable>
          <View style={{flex: 1, alignItems: 'center'}}>
            <SwitchModeButton
              initialMode={mode}
              onChange={val => dispatch.app.setViewMode(val)}
            />
          </View>
          <Pressable
            onPress={() => setDrawerOpened(true)}
            hitSlop={{left: 10, top: 10, right: 10, bottom: 10}}>
            <Icon name="list" size={22} color={colors.onBackground} />
          </Pressable>
        </View>
        <Progress.Bar
          progress={progress}
          width={null}
          borderRadius={0}
          borderWidth={0}
          color={colors.secondary}
          unfilledColor={colors.surfaceDisabled}
          height={4}
        />
        <AnimatedPagerView
          ref={ref}
          style={{flex: 1}}
          onPageSelected={e => setCurrentPage(e.nativeEvent.position)}>
          {React.useMemo(
            () =>
              items.map((item, idx) => {
                return <ContentV2 item={item} key={idx} mode={mode} />;
              }),
            [items, mode],
          )}
        </AnimatedPagerView>
        <View
          style={{
            position: 'absolute',
            bottom: Platform.OS == 'ios' ? 80 : 90,
            right: 30,
          }}>
          {!!showCounter &&
            !!currentItem?.max_counter &&
            currentItem?.max_counter > 1 && (
              <Pressable onPress={increaseCounter} hitSlop={50}>
                <CircularProgress
                  value={counters[currentItem?.id || -1] || 0}
                  radius={36}
                  duration={300}
                  progressValueColor={colors.primary}
                  progressValueStyle={{fontSize: 22, fontFamily: 'Nunito-Bold'}}
                  maxValue={currentItem?.max_counter}
                  title={undefined}
                  // titleFontSize={16}
                  // titleColor={colors.onSecondary}
                  // titleStyle={{fontWeight: 'bold'}}
                  circleBackgroundColor={colors.surface}
                  activeStrokeColor={colors.primary}
                  activeStrokeSecondaryColor={colors.secondary}
                  inActiveStrokeColor={colors.outlineVariant}
                  activeStrokeWidth={8}
                />
              </Pressable>
            )}
        </View>
        {mounted && <Notes item={currentItem} />}
        {/* <Notes item={currentItem} /> */}
      </SafeAreaView>
    </Drawer>
  );
};
export default DzikirScreen;
