import React, {FunctionComponent} from 'react';
import {View, ViewStyle} from 'react-native';

type Props = {
  style?: ViewStyle;
};

const Card: FunctionComponent<Props> = ({children, style}) => {
  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,

        elevation: 3,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        ...style,
      }}>
      {children}
    </View>
  );
};
export default Card;
