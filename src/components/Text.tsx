import * as React from 'react';
import {Platform, Text, TextStyle} from 'react-native';

export const TextBold = ({
  children,
  style,
}: {
  children: any;
  style?: TextStyle;
}) => (
  <Text style={{fontSize: 16, fontFamily: 'Nunito-Bold', ...style}}>
    {children}
  </Text>
);

export const TextSemiBold = ({
  children,
  style,
}: {
  children: any;
  style?: TextStyle;
}) => (
  <Text style={{fontSize: 16, fontFamily: 'Nunito-SemiBold', ...style}}>
    {children}
  </Text>
);

export const TextItalic = ({
  children,
  style,
}: {
  children: any;
  style?: TextStyle;
}) => (
  <Text style={{fontSize: 16, fontFamily: 'Nunito-Italic', ...style}}>
    {children}
  </Text>
);

export const TextLight = ({
  children,
  style,
}: {
  children: any;
  style?: TextStyle;
}) => (
  <Text style={{fontSize: 16, fontFamily: 'Nunito-Light', ...style}}>
    {children}
  </Text>
);

export const TextRegular = ({
  children,
  style,
}: {
  children: any;
  style?: TextStyle;
}) => (
  <Text
    style={{
      fontSize: 16,
      fontFamily: Platform.OS == 'ios' ? 'Nunito' : 'Nunito-Regular',
      ...style,
    }}>
    {children}
  </Text>
);

export const TextArabic = ({
  children,
  style,
}: {
  children: any;
  style?: TextStyle;
}) => (
  <Text
    style={{
      textAlign: 'right',
      fontSize: 32,
      fontFamily: 'KFGQPCUthmanicScriptHAFS',
      lineHeight: style?.fontSize ? style?.fontSize + 30 : 52,
      ...style,
    }}>
    {children}
  </Text>
);
