import * as React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {TextRegular, TextSemiBold} from '../../components/Text';
import {Dzikir} from '../../types';
import BottomSheet from '@gorhom/bottom-sheet';
import {Colors} from '../../colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const BottomSheetBackground = (props: any) => {
  const {colors: themeColors} = useTheme();
  return (
    <View
      style={[
        {
          borderWidth: 0,
          borderTopColor: '#ccc',
          borderTopWidth: 0.5,
          backgroundColor: themeColors.card,
        },
        {...props.style},
      ]}
    />
  );
};

const Notes = ({item}: {item?: Dzikir}) => {
  const {colors: themeColors} = useTheme();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => [60, '60%'], []);
  const handleClose = () => bottomSheetRef.current?.snapToIndex(0);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      handleIndicatorStyle={{backgroundColor: Colors.lightBlue}}
      backgroundComponent={props => <BottomSheetBackground {...props} />}
      snapPoints={snapPoints}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <TextSemiBold style={{color: themeColors.text}}>
          Catatan / Faedah
        </TextSemiBold>
        <ScrollView style={{padding: 15}}>
          <TextRegular style={{color: themeColors.text}}>
            {item?.faedah}
          </TextRegular>
          <Pressable
            onPress={handleClose}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="x" color={themeColors.primary} size={16} />
            <TextSemiBold style={{color: themeColors.primary}}>
              Tutup
            </TextSemiBold>
          </Pressable>
          <View style={{height: 30}} />
        </ScrollView>
      </View>
    </BottomSheet>
  );
};
export default Notes;
