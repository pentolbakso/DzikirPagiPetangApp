import * as React from 'react';
import {Platform, TextStyle} from 'react-native';
import {Text} from 'react-native-paper';

export const TextBold = React.memo(({
  children,
  style,
}: {
  children: any;
  style?: TextStyle;
}) => (
  <Text
    style={{
      fontSize: 16,
      fontFamily: 'Nunito-Bold',
      fontWeight: 700,
      ...style,
    }}>
    {children}
  </Text>
));

export const TextSemiBold = React.memo(({
  children,
  style,
}: {
  children: any;
  style?: TextStyle;
}) => (
  <Text
    style={{
      fontSize: 16,
      fontFamily: 'Nunito-SemiBold',
      fontWeight: 500,
      ...style,
    }}>
    {children}
  </Text>
));

export const TextItalic = React.memo(({
  children,
  style,
}: {
  children: any;
  style?: TextStyle;
}) => (
  <Text style={{fontSize: 16, fontFamily: 'Nunito-Italic', ...style}}>
    {children}
  </Text>
));

export const TextLight = React.memo(({
  children,
  style,
}: {
  children: any;
  style?: TextStyle;
}) => (
  <Text
    style={{
      fontSize: 16,
      fontFamily: 'Nunito-Light',
      fontWeight: '200',
      ...style,
    }}>
    {children}
  </Text>
));

export const TextRegular = React.memo(({
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
      fontWeight: '400',
      ...style,
    }}>
    {children}
  </Text>
));

export const TextArabic = React.memo(({
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
      // fontFamily: 'KFGQPCUthmanicScriptHAFS',
      fontFamily: 'adwa-assalaf',
      lineHeight: style?.fontSize ? style?.fontSize + 30 : 52,
      ...style,
    }}>
    {children}
  </Text>
));
