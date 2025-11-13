import * as React from 'react';
import {View} from 'react-native';
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
import {useAppTheme} from '../../theme/useAppTheme';

const Content = ({item, mode}: {item: Dzikir; mode: string}) => {
  const {
    theme: {colors},
  } = useAppTheme();
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
      style={{backgroundColor: colors.background, padding: 15, flex: 1}}
      showsVerticalScrollIndicator={true}>
      <TextBold style={{fontSize: 24, textAlign: 'center', color: colors.text}}>
        {item.title}
      </TextBold>
      <TextItalic style={{textAlign: 'center', color: colors.text}}>
        {item.note}
      </TextItalic>

      {mode == 'normal' ? (
        <View style={{marginTop: 10}}>
          <TextArabic
            style={{
              textAlign: 'center',
              fontSize: arabicFontSize,
              color: colors.text,
            }}>
            {arabicArr.join(separator)}
          </TextArabic>
          {showArabicLatin && (
            <TextLight
              style={{
                marginTop: 15,
                textAlign: 'center',
                color: colors.text,
                fontSize: arabicLatinFontSize,
              }}>
              {latinArr.join(' ')}
            </TextLight>
          )}
          <TextRegular
            style={{
              marginTop: 15,
              textAlign: 'center',
              color: colors.text,
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
                borderBottomColor: colors.border,
              }}>
              <TextArabic
                style={{
                  textAlign: 'center',
                  fontSize: arabicFontSize,
                  color: colors.text,
                }}>
                {it}
              </TextArabic>
              {showArabicLatin && (
                <TextLight
                  style={{
                    textAlign: 'center',
                    color: colors.text,
                    fontSize: arabicLatinFontSize,
                  }}>
                  {latinArr[idx]}
                </TextLight>
              )}
              <TextRegular
                style={{
                  textAlign: 'center',
                  fontSize: translationFontSize,
                  color: colors.text,
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
