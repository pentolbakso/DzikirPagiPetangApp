import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextRegular, TextSemiBold} from '../../components/Text';
import {Dzikir} from '../../types';
import BottomSheet from '@gorhom/bottom-sheet';
import {Colors} from '../../colors';
import {ScrollView} from 'react-native-gesture-handler';

const BottomSheetBackground = (props: any) => {
  return (
    <View
      style={[
        {
          borderTopColor: '#ccc',
          borderTopWidth: 0.5,
          backgroundColor: '#f5f5f5',
        },
        {...props.style},
      ]}
    />
  );
};
const Content = ({item}: {item?: Dzikir}) => (
  <TextRegular>{item?.faedah}</TextRegular>
);

const Notes = ({item}: {item?: Dzikir}) => {
  const snapPoints = React.useMemo(() => [60, '60%'], []);
  return (
    <BottomSheet
      index={0}
      handleIndicatorStyle={{backgroundColor: Colors.lightBlue}}
      backgroundComponent={props => <BottomSheetBackground {...props} />}
      snapPoints={snapPoints}>
      <View style={styles.contentContainer}>
        <TextSemiBold style={{}}>Catatan / Faedah</TextSemiBold>
        <ScrollView style={{padding: 15}}>
          <Content item={item} />
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
