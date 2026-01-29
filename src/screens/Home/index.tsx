import * as React from 'react';
import {Pressable, useWindowDimensions, ViewStyle} from 'react-native';
import {ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextBold, TextRegular} from '../../components/Text';
import Icon from '@react-native-vector-icons/feather';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {IconButton} from 'react-native-paper';
import {useAppTheme} from '../../theme/useAppTheme';
import {Colors} from '../../colors';
import {HabitTracker} from '../../components/HabitTracker';
import {useSelector} from 'react-redux';
import {RootState} from '../../rematch/store';

type BigMenuProps = {
  subtitle: string;
  title: string;
  titleColor: string;
  titleSize?: number;
  style?: ViewStyle;
  gradicentColors: Array<string>;
  onPress?: () => void;
  icon?: string;
  iconStyle?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  angle?: number;
};
const BigMenu = React.memo(
  ({gradicentColors, titleSize = 40, angle = 180, ...props}: BigMenuProps) => (
    <View style={props.style}>
      <LinearGradient
        style={{flex: 1, borderRadius: 10, overflow: 'hidden'}}
        useAngle={true}
        angle={angle}
        colors={gradicentColors}>
        {!!props.icon && (
          <Icon
            name={props.icon as any}
            style={props.iconStyle}
            size={props.iconSize || 256}
            color={props.iconColor || 'rgba(255, 255, 255, 0.25)'}
          />
        )}
        <Pressable
          onPress={props.onPress}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <TextRegular style={{fontSize: 20, color: props.titleColor}}>
            {props.subtitle}
          </TextRegular>
          <TextBold
            style={{
              width: 200,
              fontSize: titleSize,
              color: props.titleColor,
              marginTop: -10,
              textAlign: 'center',
            }}>
            {props.title}
          </TextBold>
        </Pressable>
      </LinearGradient>
    </View>
  ),
);

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;
  const enableTracker = useSelector(
    (state: RootState) => !!state.app.enableTracker,
  );

  const {
    theme: {colors},
  } = useAppTheme();
  const hour = dayjs().hour();
  const timeMode = React.useMemo(() => {
    // let hour = 3;
    if (hour >= 3 && hour < 12) return 'pagi';
    else if (hour >= 15 && hour <= 23) return 'petang';
    else return '';
  }, [hour]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView contentContainerStyle={{flex: 1, padding: 15}}>
        <BigMenu
          subtitle="dzikir"
          title={'pagi'}
          titleColor={Colors.white}
          //titleColor={colors.primary}
          style={{
            flexGrow: timeMode == 'pagi' && !isLandscape ? 3 : 1,
          }}
          // gradicentColors={['#1061B0', '#3585DA', '#59C1E8', '#FCD32D']}
          gradicentColors={['#FCD32D', '#C3305D']}
          // gradicentColors={[colors.primary, colors.background]}
          angle={90}
          icon="sun"
          iconColor="rgba(255, 200, 100, 0.3)"
          iconStyle={{
            position: 'absolute',
            zIndex: 0,
            left: -80,
            bottom: -100,
          }}
          onPress={() => navigation.navigate('Dzikir', {time: 'pagi'})}
        />
        <View style={{height: 10, backgroundColor: colors.background}} />
        {!!enableTracker && <HabitTracker />}
        <View style={{height: 10, backgroundColor: colors.background}} />
        <BigMenu
          subtitle="dzikir"
          title="petang"
          titleColor={Colors.white}
          //titleColor={colors.secondary}
          style={{flexGrow: timeMode == 'petang' && !isLandscape ? 3 : 1}}
          gradicentColors={['#103d63', '#C3305D']}
          // gradicentColors={[colors.secondary, colors.background]}
          icon="moon"
          iconColor="rgba(150, 180, 220, 0.3)"
          iconStyle={{
            position: 'absolute',
            zIndex: 0,
            left: '50%',
            top: '25%',
            transform: [{translateX: -32}, {translateY: -32}],
          }}
          iconSize={64}
          onPress={() => navigation.navigate('Dzikir', {time: 'petang'})}
          angle={210}
        />
        {/* <View style={{height: 2, backgroundColor: '#fff'}} /> */}
        {/* <BigMenu
          subtitle="Dzikir"
          title="Setelah Sholat Fardhu"
          titleSize={26}
          style={{flexGrow: 1}}
          gradientColor1="#3a7bd5"
          gradientColor2="#3a6073"
          onPress={() => navigation.navigate('Dzikir', {time: 'petang'})}
        /> */}
        <View style={{position: 'absolute', top: 25, right: 25}}>
          <View style={{flexDirection: 'row'}}>
            <IconButton
              icon={'cog-outline'}
              iconColor={colors.onPrimaryContainer}
              size={24}
              onPress={() => navigation.navigate('Setting')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
