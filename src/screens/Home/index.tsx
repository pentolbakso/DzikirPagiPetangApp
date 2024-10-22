import * as React from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextBold, TextRegular} from '../../components/Text';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useTheme} from 'react-native-paper';

type BigMenuProps = {
  subtitle: string;
  title: string;
  titleColor: string;
  titleSize?: number;
  style?: ViewStyle;
  gradicentColors: Array<string>;
  onPress?: () => void;
  icon?: string;
  angle?: number;
};
const BigMenu = ({
  gradicentColors,
  titleSize = 40,
  angle = 180,
  ...props
}: BigMenuProps) => (
  <View style={props.style}>
    <LinearGradient
      style={{flex: 1, borderRadius: 10}}
      useAngle={true}
      angle={angle}
      colors={gradicentColors}>
      {!!props.icon && (
        <Icon
          name={props.icon}
          style={{position: 'absolute', zIndex: 0, right: -20, bottom: -10}}
          size={100}
          color={'rgba(255, 255, 255, 0.25)'}
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
);

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const {colors} = useTheme();
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
          titleColor={colors.background}
          style={{
            flexGrow: timeMode == 'pagi' ? 3 : 1,
          }}
          // gradicentColors={['#1061B0', '#3585DA', '#59C1E8', '#FCD32D']}
          // gradicentColors={['#FCD32D', '#C3305D']}
          gradicentColors={[colors.primaryContainer, colors.primary]}
          angle={180}
          onPress={() => navigation.navigate('Dzikir', {time: 'pagi'})}
        />
        <View style={{height: 10, backgroundColor: colors.background}} />
        <BigMenu
          subtitle="dzikir"
          title="petang"
          titleColor={colors.background}
          style={{flexGrow: timeMode == 'petang' ? 3 : 1}}
          // gradicentColors={['#103d63', '#C3305D']}
          gradicentColors={[colors.tertiaryContainer, colors.tertiary]}
          onPress={() => navigation.navigate('Dzikir', {time: 'petang'})}
          angle={0}
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
          <Pressable
            onPress={() => navigation.navigate('Setting')}
            hitSlop={{left: 10, top: 10, right: 10, bottom: 10}}>
            <Icon name="settings" color="white" size={24} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
