import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextRegular, TextSemiBold} from '../../components/Text';
import {Dzikir} from '../../types';
import BottomSheet from '@gorhom/bottom-sheet';
import {Colors} from '../../colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';

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
  const snapPoints = React.useMemo(() => [60, '60%'], []);
  return (
    <BottomSheet
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
          <View style={{height: 30}} />
        </ScrollView>
      </View>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default Notes;
