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
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import {Colors} from '../../colors';
import MenuDrawer, {MenuDrawerProps} from 'react-native-side-drawer';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../rematch/store';
import Content from './Content';
import Notes from './Notes';
import ContentV2 from './ContentV2';
import {useTheme} from 'react-native-paper';

const rippleConfig = {color: 'lightgray', borderless: true};

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
  const {colors} = useTheme();
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
                color:
                  mode == id ? colors.onPrimaryContainer : colors.onBackground,
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
        borderWidth: 1,
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
  const {colors} = useTheme();
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
    return () => {
      unsubscribe();
    };
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
            backgroundColor: colors.background,
            maxWidth: '70%',
            paddingTop: 50,
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
                borderBottomColor: colors.outlineVariant,
                borderBottomWidth: 1,
                backgroundColor:
                  currentPage == idx ? colors.primaryContainer : colors.surface,
              }}>
              <TextRegular
                style={{
                  color:
                    currentPage == idx
                      ? colors.onPrimaryContainer
                      : colors.onBackground,
                }}>
                {item.title}
              </TextRegular>
            </Pressable>
          ))}
          <View style={{height: 120}} />
        </ScrollView>
      </View>
    ),
    [items, time, currentPage, colors],
  );

  const progress = React.useMemo(() => {
    if (!items) return 0;
    return (currentPage + 1) / items.length;
  }, [currentPage, items]);

  return (
    <Drawer
      open={drawerOpened}
      drawerContent={drawerContent()}
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
          color={colors.primary}
          unfilledColor={colors.surfaceDisabled}
          height={3}
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
            bottom: Platform.OS == 'ios' ? 70 : 90,
            right: 10,
          }}>
          {!!showCounter &&
            !!currentItem?.max_counter &&
            currentItem?.max_counter > 1 && (
              <Pressable onPress={increaseCounter} hitSlop={50}>
                <CircularProgress
                  value={counters.get(currentItem?.id) || 0}
                  radius={36}
                  duration={300}
                  progressValueColor={colors.onSecondaryContainer}
                  progressValueStyle={{fontSize: 22, fontFamily: 'Nunito-Bold'}}
                  maxValue={currentItem?.max_counter}
                  title={undefined}
                  // titleFontSize={16}
                  // titleColor={colors.onSecondary}
                  // titleStyle={{fontWeight: 'bold'}}
                  circleBackgroundColor={colors.secondaryContainer}
                  activeStrokeColor={colors.primary}
                  activeStrokeSecondaryColor={colors.tertiary}
                  inActiveStrokeColor={colors.backdrop}
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
