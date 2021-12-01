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
import {useTheme} from '@react-navigation/native';

const Content = ({item, mode}: {item: Dzikir; mode: string}) => {
  const {colors: themeColors} = useTheme();
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
      style={{backgroundColor: themeColors.background, padding: 15, flex: 1}}
      showsVerticalScrollIndicator={true}>
      <TextBold
        style={{fontSize: 24, textAlign: 'center', color: themeColors.text}}>
        {item.title}
      </TextBold>
      <TextItalic style={{textAlign: 'center', color: themeColors.text}}>
        {item.note}
      </TextItalic>

      {mode == 'normal' ? (
        <View style={{marginTop: 10}}>
          <TextArabic
            style={{
              textAlign: 'center',
              fontSize: arabicFontSize,
              color: themeColors.text,
            }}>
            {arabicArr.join(separator)}
          </TextArabic>
          {showArabicLatin && (
            <TextLight
              style={{
                marginTop: 15,
                textAlign: 'center',
                color: themeColors.text,
                fontSize: arabicLatinFontSize,
              }}>
              {latinArr.join(' ')}
            </TextLight>
          )}
          <TextRegular
            style={{
              marginTop: 15,
              textAlign: 'center',
              color: themeColors.text,
              fontSize: translationFontSize,
            }}>
            {tarjimArr.join(item?.is_surah ? ' ۝ ' : ' ')}
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
                borderBottomColor: themeColors.border,
              }}>
              <TextArabic
                style={{
                  textAlign: 'center',
                  fontSize: arabicFontSize,
                  color: themeColors.text,
                }}>
                {it}
              </TextArabic>
              {showArabicLatin && (
                <TextLight
                  style={{
                    textAlign: 'center',
                    color: themeColors.text,
                    fontSize: arabicLatinFontSize,
                  }}>
                  {latinArr[idx]}
                </TextLight>
              )}
              <TextRegular
                style={{
                  textAlign: 'center',
                  fontSize: translationFontSize,
                  color: themeColors.text,
                }}>
                {tarjimArr[idx]}
              </TextRegular>
            </View>
          ))}
        </View>
      )}
      <View style={{height: 170}} />
    </ScrollView>
  );
};
export default Content;
