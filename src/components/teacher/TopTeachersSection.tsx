import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import TeacherCard from '../teacher/TeacherCard';
import { User } from '../../types';

interface TopTeachersSectionProps {
  teachers: User[];
  onViewMore?: () => void;
}

const MAX_DISPLAY_COUNT = 5;

export default function TopTeachersSection({ teachers, onViewMore }: TopTeachersSectionProps) {
  const displayedTeachers = useMemo(() => {
    return teachers.slice(0, MAX_DISPLAY_COUNT);
  }, [teachers]);

  const renderTeacher = useCallback(({ item }: { item: User }) => (
    <TeacherCard teacher={item} />
  ), []);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top teachers</Text>
        <Pressable onPress={onViewMore}>
          <Text style={styles.viewMore}>View more</Text>
        </Pressable>
      </View>

      <FlatList
        data={displayedTeachers}
        renderItem={renderTeacher}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.horizontalTeacherList}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginHorizontal: 15, marginVertical: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  viewMore: { fontSize: 14, color: '#00bfff' },
  horizontalTeacherList: { paddingRight: 20 },
});