import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Member, Event, FamilyData } from '../src/services/familyService';

type Props = {
  familyData: string; // JSON string
};

LocaleConfig.locales['en'] = {
  monthNames: [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ],
  monthNamesShort: [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
  ],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  today: "Today"
};
LocaleConfig.defaultLocale = 'en';

export default function FamilyScheduleScreen({ familyData }: Props) {
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (familyData) {
      const family: FamilyData = JSON.parse(familyData);
      setMembers(family.members);
      setEvents(family.events);
    }
  }, [familyData]);

  const renderMember = ({ item }: { item: Member }) => {
    // prepare marked dates for this member
    const marked: Record<string, { marked: boolean; dotColor?: string }> = {};
    events
      .filter((e) => e.member === item.name)
      .forEach((e) => {
        marked[e.date] = { marked: true, dotColor: '#00adf5' };
      });

    return (
      <View style={styles.memberContainer}>
        <View style={styles.header}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <Text style={styles.memberName}>{item.name} ({item.role})</Text>
        </View>
        <Calendar
          markedDates={marked}
          theme={{
            todayTextColor: '#00adf5',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
          }}
          style={styles.calendar}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Family Schedule</Text>
      <FlatList
        data={members}
        renderItem={renderMember}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  memberContainer: { marginBottom: 30, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  memberName: { fontSize: 18, fontWeight: 'bold' },
  calendar: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
});
