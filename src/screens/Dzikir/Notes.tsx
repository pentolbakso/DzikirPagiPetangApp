import * as React from 'react';
import {View, Platform, Pressable} from 'react-native';
import {TextRegular, TextSemiBold} from '../../components/Text';
import {Dzikir} from '../../types';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Colors} from '../../colors';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, useTheme} from 'react-native-paper';

const BottomSheetBackground = (props: any) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          borderWidth: 0,
          borderTopColor: colors.outlineVariant,
          borderTopWidth: 1,
          backgroundColor: colors.tertiaryContainer,
        },
        {...props.style},
      ]}
    />
  );
};

const Notes = ({item}: {item?: Dzikir}) => {
  const {colors} = useTheme();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(
    () => (Platform.OS == 'ios' ? [60, '60%'] : [80, '60%']),
    [],
  );
  const handleClose = () => bottomSheetRef.current?.snapToIndex(0);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      handleIndicatorStyle={{backgroundColor: colors.tertiary}}
      backgroundComponent={props => <BottomSheetBackground {...props} />}
      snapPoints={snapPoints}>
      <BottomSheetView
        style={{
          backgroundColor: colors.tertiaryContainer,
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <TextSemiBold>CATATAN</TextSemiBold>
          <ScrollView style={{margin: 15}}>
            <TextRegular style={{color: colors.onTertiaryContainer}}>
              {item?.faedah}
            </TextRegular>
            <Button
              onPress={handleClose}
              mode="text"
              icon={'close'}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <TextSemiBold style={{color: colors.primary}}>Tutup</TextSemiBold>
            </Button>
            <View style={{height: 30}} />
          </ScrollView>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
export default Notes;
