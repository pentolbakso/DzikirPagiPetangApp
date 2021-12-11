import * as React from 'react';
import {
  Alert,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  TextArabic,
  TextBold,
  TextItalic,
  TextLight,
  TextRegular,
  TextSemiBold,
} from '../../components/Text';
import Slider from '@react-native-community/slider';
import {Colors} from '../../colors';
import Card from '../../components/Card';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../rematch/store';
import {Switch} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Rate, {AndroidMarket} from 'react-native-rate';
import {useTheme, useNavigation} from '@react-navigation/native';

const Menu = ({label, onPress}: {label: string; onPress?: () => void}) => {
  const {colors: themeColors} = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: themeColors.border,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextRegular style={{flex: 1, color: themeColors.text}}>
        {label}
      </TextRegular>
      <Icon name="chevron-right" size={18} color={themeColors.text} />
    </Pressable>
  );
};

const ModalReference = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const {colors: themeColors} = useTheme();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle={'overFullScreen'}
      transparent>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#000000bb',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: 5,
            overflow: 'hidden',
            width: '90%',
            padding: 15,
            backgroundColor: themeColors.card,
          }}>
          <TextBold
            style={{color: themeColors.text, fontSize: 18, marginBottom: 10}}>
            Referensi
          </TextBold>
          <TextRegular style={{color: themeColors.text, marginBottom: 10}}>
            Referensi diambil dari artikel berjudul "Bacaan Dzikir Pagi" dan
            "Bacaan Dzikir Petang" dari website Rumasyho.com, disusun oleh
            Ustadz Muhammad Abduh Tuasikal Hafidzahullah.
          </TextRegular>
          <Pressable
            onPress={() =>
              Linking.openURL(
                'https://rumaysho.com/1636-bacaan-dzikir-pagi.html',
              )
            }>
            <TextItalic style={{color: themeColors.primary}}>
              Bacaan Dzikir Pagi
            </TextItalic>
          </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL(
                'https://rumaysho.com/1638-bacaan-dzikir-petang.html',
              )
            }>
            <TextItalic style={{color: themeColors.primary}}>
              Bacaan Dzikir Petang
            </TextItalic>
          </Pressable>
          <Pressable
            onPress={onDismiss}
            style={{alignItems: 'center', marginTop: 10}}>
            <TextSemiBold style={{color: themeColors.text, fontSize: 18}}>
              OK
            </TextSemiBold>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const SettingScreen = () => {
  const navigation = useNavigation();
  const {colors: themeColors} = useTheme();
  const width = useWindowDimensions().width;
  const dispatch = useDispatch<Dispatch>();
  const initialArabicFontSize = useSelector(
    (state: RootState) => state.app.arabicFontSize || 32,
  );
  const initialArabicLatinFontSize = useSelector(
    (state: RootState) => state.app.arabicLatinFontSize || 16,
  );
  const initialTranslationFontSize = useSelector(
    (state: RootState) => state.app.translationFontSize || 16,
  );
  const showArabicLatin = useSelector(
    (state: RootState) => state.app.showArabicLatin || false,
  );
  const darkMode = useSelector(
    (state: RootState) => state.app.darkMode || false,
  );
  const showCounter = useSelector(
    (state: RootState) => state.app.showCounter || false,
  );
  const enableVibrate = useSelector(
    (state: RootState) => state.app.enableVibrate || false,
  );

  const [preview, showPreview] = React.useState(false);
  const [modalReferenceVisible, setModalReferenceVisible] =
    React.useState(false);

  const [arabicFontSize, setArabicFontSize] = React.useState(
    initialArabicFontSize,
  );
  const [arabicLatinFontSize, setArabicLatinFontSize] = React.useState(
    initialArabicLatinFontSize,
  );
  const [translationFontSize, setTranslationFontSize] = React.useState(
    initialTranslationFontSize,
  );

  const handleRateOurApp = () => {
    const options = {
      AppleAppID: '1234567890',
      GooglePackageName: 'com.pagipetangstudio.dzikirpagipetang',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
    };
    Rate.rate(options, success => {
      if (success) {
        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
      }
    });
  };

  const openPagiPetangWeb = () => {
    Linking.openURL('https://www.instagram.com/pagipetangstudio/');
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTintColor: themeColors.text,
    });
  }, [darkMode]);

  return (
    <ScrollView style={{flex: 1, padding: 10}}>
      <Card style={{paddingVertical: 5, backgroundColor: themeColors.card}}>
        <View style={{flexDirection: 'row'}}>
          <TextRegular style={{fontSize: 16, flex: 1, color: themeColors.text}}>
            Ukuran teks arab
          </TextRegular>
          <TextBold style={{fontSize: 16, color: themeColors.text}}>
            {arabicFontSize}
          </TextBold>
        </View>
        <View style={{alignItems: 'center'}}>
          <Slider
            style={{width: width - 40}}
            minimumValue={20}
            maximumValue={48}
            step={1}
            thumbTintColor={Colors.lightBlue}
            value={initialArabicFontSize}
            maximumTrackTintColor="#ddd"
            minimumTrackTintColor={Colors.lightBlue}
            onSlidingStart={() => showPreview(true)}
            onSlidingComplete={val => {
              showPreview(false);
              dispatch.app.setArabicFontSize(Math.trunc(val));
            }}
            onValueChange={val => setArabicFontSize(Math.trunc(val))}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextRegular style={{fontSize: 16, flex: 1, color: themeColors.text}}>
            Ukuran teks terjemahan
          </TextRegular>
          <TextBold style={{fontSize: 16, color: themeColors.text}}>
            {translationFontSize}
          </TextBold>
        </View>
        <View style={{alignItems: 'center'}}>
          <Slider
            style={{width: width - 40}}
            minimumValue={12}
            maximumValue={24}
            step={1}
            thumbTintColor={Colors.lightBlue}
            value={initialTranslationFontSize}
            maximumTrackTintColor="#ddd"
            minimumTrackTintColor={Colors.lightBlue}
            onSlidingStart={() => showPreview(true)}
            onSlidingComplete={() => showPreview(false)}
            onValueChange={val => {
              setTranslationFontSize(Math.trunc(val));
              dispatch.app.setTranslationFontSize(Math.trunc(val));
            }}
          />
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <Switch
            trackColor={{false: '#ddd', true: Colors.lightBlue}}
            thumbColor={Colors.white}
            ios_backgroundColor="#ddd"
            onValueChange={(value: boolean) => {
              dispatch.app.setShowArabicLatin(value);
            }}
            value={showArabicLatin}
          />
          <TextRegular style={{marginLeft: 10, color: themeColors.text}}>
            Tampilkan arab latin
          </TextRegular>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <TextRegular style={{fontSize: 16, flex: 1, color: themeColors.text}}>
            Ukuran teks arab latin
          </TextRegular>
          <TextBold style={{fontSize: 16, color: themeColors.text}}>
            {arabicLatinFontSize}
          </TextBold>
        </View>
        <View style={{alignItems: 'center'}}>
          <Slider
            style={{width: width - 40}}
            minimumValue={12}
            maximumValue={24}
            step={1}
            thumbTintColor={showArabicLatin ? Colors.lightBlue : '#aaa'}
            value={initialArabicLatinFontSize}
            maximumTrackTintColor="#ddd"
            minimumTrackTintColor={showArabicLatin ? Colors.lightBlue : '#aaa'}
            onSlidingStart={() => showPreview(true)}
            onSlidingComplete={() => showPreview(false)}
            onValueChange={val => {
              setArabicLatinFontSize(Math.trunc(val));
              dispatch.app.setArabicLatinFontSize(Math.trunc(val));
            }}
            disabled={!showArabicLatin}
          />
        </View>
      </Card>
      {preview && (
        <Card style={{marginTop: 10, backgroundColor: themeColors.card}}>
          <TextArabic
            style={{fontSize: arabicFontSize, color: themeColors.text}}>
            ضَرَبَ زَيْدٌ عَمْرًا
          </TextArabic>
          {showArabicLatin && (
            <TextLight
              style={{fontSize: arabicLatinFontSize, color: themeColors.text}}>
              Dhoroba Zaidun Amran
            </TextLight>
          )}
          <TextRegular
            style={{fontSize: translationFontSize, color: themeColors.text}}>
            Zaid telah memukul Amr
          </TextRegular>
        </Card>
      )}
      <Card style={{marginTop: 10, backgroundColor: themeColors.card}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <Switch
            trackColor={{false: '#ddd', true: Colors.lightBlue}}
            thumbColor={Colors.white}
            ios_backgroundColor="#ddd"
            onValueChange={(value: boolean) => {
              dispatch.app.setShowCounter(value);
            }}
            value={!!showCounter}
          />
          <TextRegular
            style={{marginLeft: 10, color: themeColors.text, marginRight: 10}}>
            Penghitung dzikir
          </TextRegular>
          <Switch
            trackColor={{false: '#ddd', true: Colors.lightBlue}}
            thumbColor={Colors.white}
            ios_backgroundColor="#ddd"
            onValueChange={(value: boolean) => {
              dispatch.app.setEnableVibrate(value);
            }}
            value={!!enableVibrate}
            disabled={!showCounter}
          />
          <TextRegular style={{marginLeft: 10, color: themeColors.text}}>
            Getar
          </TextRegular>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Switch
            trackColor={{false: '#ddd', true: Colors.lightBlue}}
            thumbColor={Colors.white}
            ios_backgroundColor="#ddd"
            onValueChange={(value: boolean) => {
              dispatch.app.setDarkMode(value);
            }}
            value={!!darkMode}
          />
          <TextRegular style={{marginLeft: 10, color: themeColors.text}}>
            Mode gelap
          </TextRegular>
        </View>
      </Card>
      <Card style={{marginTop: 10, backgroundColor: themeColors.card}}>
        <Menu label={'Beri Rating'} onPress={handleRateOurApp} />
        <Menu
          label={'Referensi'}
          onPress={() => setModalReferenceVisible(true)}
        />
      </Card>
      <Pressable onPress={openPagiPetangWeb}>
        <TextRegular
          style={{
            color: themeColors.text,
            marginTop: 10,
            textAlign: 'center',
            fontSize: 14,
          }}>
          dari{'\n'}Pagi Petang Studio
        </TextRegular>
      </Pressable>
      <ModalReference
        visible={modalReferenceVisible}
        onDismiss={() => setModalReferenceVisible(false)}
      />
      <View style={{height: 50}} />
    </ScrollView>
  );
};
export default SettingScreen;
