import * as React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import {ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextBold, TextRegular} from '../../components/Text';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

type BigMenuProps = {
  subtitle: string;
  title: string;
  titleSize?: number;
  style?: ViewStyle;
  gradientColor1?: string;
  gradientColor2?: string;
  onPress?: () => void;
  icon?: string;
};
const BigMenu = ({
  gradientColor1 = '#F3904F',
  gradientColor2 = '#3B4371',
  titleSize = 40,
  ...props
}: BigMenuProps) => (
  <View style={props.style}>
    <LinearGradient
      style={{flex: 1}}
      useAngle={true}
      angle={45}
      colors={[gradientColor1, gradientColor2]}>
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
        <TextRegular style={{fontSize: 20, color: '#fff'}}>
          {props.subtitle}
        </TextRegular>
        <TextBold
          style={{
            width: 200,
            fontSize: titleSize,
            color: '#fff',
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
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <BigMenu
          subtitle="Dzikir"
          title="Pagi"
          style={{flexGrow: 1}}
          gradientColor1="#FFA17F"
          gradientColor2="#00223E"
          onPress={() => navigation.navigate('Dzikir', {time: 'pagi'})}
        />
        <View style={{height: 2, backgroundColor: '#fff'}} />
        <BigMenu
          subtitle="Dzikir"
          title="Petang"
          style={{flexGrow: 1}}
          gradientColor1="#355C7D"
          gradientColor2="#C06C84"
          onPress={() => navigation.navigate('Dzikir', {time: 'petang'})}
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
