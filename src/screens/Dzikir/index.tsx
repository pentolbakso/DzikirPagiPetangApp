import {useNavigation, useRoute} from '@react-navigation/native';
import * as React from 'react';
import {Animated, Pressable, Text} from 'react-native';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import {
  TextArabic,
  TextBold,
  TextLight,
  TextRegular,
} from '../../components/Text';
import {dzikirDb} from '../../services/db';
import {Dzikir} from '../../types';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

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
      {arabicArr.map((it, idx) => (
        <View
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
      ))}
      <View style={{height: 30}} />
    </ScrollView>
  );
};

const DzikirScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const time: string = (route.params as any).time || undefined;

  const items: Array<Dzikir> = React.useMemo(
    // () => dzikirDb.filter(it => it.time == time || it.time == ''),
    () => dzikirDb,
    [time],
  );

  return (
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
          <Icon name="arrow-left" size={26} />
        </Pressable>
      </View>
      <AnimatedPagerView style={{flex: 1}}>
        {React.useMemo(
          () =>
            items.map((item, idx) => {
              return <Content item={item} key={idx} />;
            }),
          [items],
        )}
      </AnimatedPagerView>
    </SafeAreaView>
  );
};
export default DzikirScreen;
