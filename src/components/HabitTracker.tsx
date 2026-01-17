import * as React from 'react';
import {View, ScrollView, useWindowDimensions} from 'react-native';
import {TextBold, TextRegular} from './Text';
import {useSelector} from 'react-redux';
import {RootState} from '../rematch/store';
import dayjs from 'dayjs';
import {useAppTheme} from '../theme/useAppTheme';

const BOX_SIZE = 12;
const BOX_GAP = 3;
const DAYS_TO_SHOW = 30;

export const HabitTracker = () => {
  const {
    theme: {colors},
  } = useAppTheme();
  const {width, height} = useWindowDimensions();
  const habitHistory = useSelector(
    (state: RootState) => state.app.habitHistory || {},
  );

  const scrollRef = React.useRef<ScrollView>(null);

  const days = React.useMemo(() => {
    const today = dayjs();
    const result = [];
    for (let i = DAYS_TO_SHOW - 1; i >= 0; i--) {
      const date = today.subtract(i, 'day');
      const dateStr = date.format('YYYY-MM-DD');
      const data = habitHistory[dateStr] || {pagi: false, petang: false};
      result.push({
        date: dateStr,
        pagi: data.pagi,
        petang: data.petang,
        dayOfWeek: date.day(),
      });
    }
    return result;
  }, [habitHistory]);

  /*
  const stats = React.useMemo(() => {
    let currentStreak = 0;
    let totalDays = 0;

    // Calculate total completion
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const completed = day.pagi || day.petang;
      if (completed) {
        totalDays++;
      }
    }

    // Current streak from today backwards
    for (let i = days.length - 1; i >= 0; i--) {
      const day = days[i];
      const completed = day.pagi || day.petang;

      if (completed) {
        currentStreak++;
      } else {
        break;
      }
    }

    const completionRate = Math.round((totalDays / days.length) * 100);

    return {currentStreak, totalDays, completionRate};
  }, [days]);
  */

  const getBoxColor = (completed: boolean) => {
    return completed ? colors.primary : colors.surfaceDisabled;
  };

  React.useLayoutEffect(() => {
    // Scroll to end on mount and layout changes (orientation)
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({animated: false});
    }
  }, [width, height]);

  return (
    <View style={{paddingVertical: 5, alignItems: 'center'}}>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <TextBold style={{fontSize: 15, color: colors.onBackground}}>
          Tracker
        </TextBold>
        <TextBold
          style={{
            fontSize: 20,
            color: colors.onBackground,
          }}>
          {stats.completionRate}%
        </TextBold>
      </View> */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        ref={scrollRef}>
        <View>
          {/* Pagi row */}
          <View style={{flexDirection: 'row', marginBottom: BOX_GAP}}>
            {days.map((day, idx) => (
              <View
                key={`pagi-${idx}`}
                style={{
                  width: BOX_SIZE,
                  height: BOX_SIZE,
                  backgroundColor: getBoxColor(day.pagi),
                  marginRight: BOX_GAP,
                  borderRadius: 2,
                }}
              />
            ))}
          </View>
          {/* Petang row */}
          <View style={{flexDirection: 'row'}}>
            {days.map((day, idx) => (
              <View
                key={`petang-${idx}`}
                style={{
                  width: BOX_SIZE,
                  height: BOX_SIZE,
                  backgroundColor: getBoxColor(day.petang),
                  marginRight: BOX_GAP,
                  borderRadius: 2,
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
        <TextRegular
          style={{
            fontSize: 11,
            color: colors.onBackground,
            fontWeight: '600',
            flex: 1,
          }}>
          {/* {DAYS_TO_SHOW} hari yg lalu */}
          🗓️ Dzikir Tracker
        </TextRegular>
        <TextRegular style={{fontSize: 11, color: colors.onBackground}}>
          Hari Ini ↑
        </TextRegular>
      </View>
    </View>
  );
};
