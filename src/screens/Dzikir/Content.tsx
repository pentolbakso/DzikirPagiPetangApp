import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TextArabic,
  TextBold,
  TextItalic,
  TextLight,
  TextRegular,
} from '../../components/Text';
import {Dzikir} from '../../types';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../../rematch/store';
import Notes from './Notes';

const Content = ({item, mode}: {item: Dzikir; mode: string}) => {
  const arabicFontSize = useSelector(
    (state: RootState) => state.app.arabicFontSize,
  );
  const arabicLatinFontSize = useSelector(
    (state: RootState) => state.app.arabicLatinFontSize,
  );
  const translationFontSize = useSelector(
    (state: RootState) => state.app.translationFontSize,
  );
  const showArabicLatin = useSelector(
    (state: RootState) => state.app.showArabicLatin,
  );
  const arabicArr = React.useMemo(() => item.arabic.split('|'), [item]);
  const latinArr = React.useMemo(() => item.arabic_latin.split('|'), [item]);
  const tarjimArr = React.useMemo(() => item.translated_id.split('|'), [item]);
  const separator = React.useMemo(() => {
    return !!item.is_surah ? ' ۝ ' : '، ';
  }, [item]);

  return (
    <ScrollView
      style={{backgroundColor: '#fff', padding: 15, flex: 1}}
      showsVerticalScrollIndicator={true}>
      <TextBold style={{fontSize: 24, textAlign: 'center'}}>
        {item.title}
      </TextBold>
      <TextItalic style={{textAlign: 'center'}}>{item.note}</TextItalic>

      {mode == 'normal' ? (
        <View style={{marginTop: 10}}>
          <TextArabic style={{textAlign: 'center', fontSize: arabicFontSize}}>
            {arabicArr.join(separator)}
          </TextArabic>
          {showArabicLatin && (
            <TextLight
              style={{
                marginTop: 15,
                textAlign: 'center',
                color: '#333',
                fontSize: arabicLatinFontSize,
              }}>
              {latinArr.join(' ')}
            </TextLight>
          )}
          <TextRegular
            style={{
              marginTop: 15,
              textAlign: 'center',
              fontSize: translationFontSize,
            }}>
            {tarjimArr.join(' ')}
          </TextRegular>
        </View>
      ) : (
        <View style={{marginTop: 10}}>
          {arabicArr.map((it, idx) => (
            <View
              key={idx}
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
              }}>
              <TextArabic
                style={{textAlign: 'center', fontSize: arabicFontSize}}>
                {it}
              </TextArabic>
              {showArabicLatin && (
                <TextLight
                  style={{
                    textAlign: 'center',
                    color: '#333',
                    fontSize: arabicLatinFontSize,
                  }}>
                  {latinArr[idx]}
                </TextLight>
              )}
              <TextRegular
                style={{textAlign: 'center', fontSize: translationFontSize}}>
                {tarjimArr[idx]}
              </TextRegular>
            </View>
          ))}
        </View>
      )}
      {/* <Notes item={item} /> */}
      <View style={{height: 90}} />
    </ScrollView>
  );
};
export default Content;
