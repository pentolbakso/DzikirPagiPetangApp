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
import {Card, useTheme} from 'react-native-paper';

const ContentV2 = ({item, mode}: {item: Dzikir; mode: string}) => {
  const {colors} = useTheme();
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
      <TextBold
        style={{
          fontSize: 24,
          textAlign: 'center',
          color: colors.onBackground,
        }}>
        {item.title}
      </TextBold>
      <TextItalic
        style={{textAlign: 'center', color: colors.secondary, fontSize: 14}}>
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
              backgroundColor: colors.tertiaryContainer,
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}>
            <TextRegular
              style={{
                marginTop: 15,
                textAlign: 'center',
                color: colors.onTertiaryContainer,
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
                paddingVertical: 10,
                marginBottom: 10,
                backgroundColor: colors.secondaryContainer,
              }}>
              <TextArabic
                style={{
                  textAlign: 'center',
                  fontSize: arabicFontSize,
                  color: colors.onPrimaryContainer,
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
};
export default ContentV2;
