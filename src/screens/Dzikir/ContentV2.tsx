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
import {useSelector, shallowEqual} from 'react-redux';
import {RootState} from '../../rematch/store';
import {Card} from 'react-native-paper';
import {useAppTheme} from '../../theme/useAppTheme';

const ContentV2 = React.memo(({item, mode}: {item: Dzikir; mode: string}) => {
  const {
    theme: {colors},
  } = useAppTheme();
  const {
    arabicFontSize,
    arabicLatinFontSize,
    translationFontSize,
    showArabicLatin,
  } = useSelector(
    (state: RootState) => ({
      arabicFontSize: state.app.arabicFontSize,
      arabicLatinFontSize: state.app.arabicLatinFontSize,
      translationFontSize: state.app.translationFontSize,
      showArabicLatin: state.app.showArabicLatin,
    }),
    shallowEqual,
  );
  const arabicArr = React.useMemo(() => item.arabic.split('|'), [item.arabic]);
  const latinArr = React.useMemo(
    () => item.arabic_latin.split('|'),
    [item.arabic_latin],
  );
  const tarjimArr = React.useMemo(
    () => item.translated_id.split('|'),
    [item.translated_id],
  );
  const separator = React.useMemo(() => {
    return !!item.is_surah ? ' ۝ ' : '، ';
  }, [item.is_surah]);

  return (
    <ScrollView
      style={{backgroundColor: colors.background, padding: 15, flex: 1}}
      showsVerticalScrollIndicator={true}>
      <TextBold
        style={{
          fontSize: 24,
          textAlign: 'center',
          color: colors.onBackground,
        }}>
        {item.title}
      </TextBold>
      <TextItalic
        style={{textAlign: 'center', color: colors.onBackground, fontSize: 14}}>
        {item.note}
      </TextItalic>

      {mode == 'normal' ? (
        <View style={{marginTop: 10}}>
          <Card
            mode="contained"
            style={{padding: 5, backgroundColor: colors.secondaryContainer}}>
            <TextArabic
              style={{
                textAlign: 'center',
                fontSize: arabicFontSize,
                color: colors.onSecondaryContainer,
              }}>
              {arabicArr.join(separator)}
            </TextArabic>
          </Card>
          {showArabicLatin && (
            <Card
              mode="contained"
              style={{
                marginTop: 15,
                backgroundColor: colors.tertiaryContainer,
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}>
              <TextLight
                style={{
                  marginTop: 15,
                  textAlign: 'center',
                  color: colors.onTertiaryContainer,
                  fontSize: arabicLatinFontSize,
                }}>
                {latinArr.join(' ')}
              </TextLight>
            </Card>
          )}
          <Card
            mode="contained"
            style={{
              marginTop: 15,
              backgroundColor: colors.secondaryContainer,
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}>
            <TextRegular
              style={{
                marginTop: 15,
                textAlign: 'center',
                color: colors.onSecondaryContainer,
                fontSize: translationFontSize,
              }}>
              {tarjimArr.join(item?.is_surah ? ' ۝ ' : ' ')}
            </TextRegular>
          </Card>
        </View>
      ) : (
        <View style={{marginTop: 10}}>
          {arabicArr.map((it, idx) => (
            <Card
              key={idx}
              mode="contained"
              style={{
                paddingVertical: 5,
                marginBottom: 10,
                backgroundColor: colors.secondaryContainer,
              }}>
              <TextArabic
                style={{
                  textAlign: 'center',
                  fontSize: arabicFontSize,
                  color: colors.onSecondaryContainer,
                }}>
                {it}
              </TextArabic>
              {showArabicLatin && (
                <TextLight
                  style={{
                    textAlign: 'center',
                    fontSize: arabicLatinFontSize,
                  }}>
                  {latinArr[idx]}
                </TextLight>
              )}
              <TextRegular
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: translationFontSize,
                }}>
                {tarjimArr[idx]}
              </TextRegular>
            </Card>
          ))}
        </View>
      )}
      <View style={{height: 170}} />
    </ScrollView>
  );
});
export default ContentV2;
