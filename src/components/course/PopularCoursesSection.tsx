import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import CourseCard from '../course/CourseCard';
import { Course, User } from '../../types';
import useUsers from '../../hooks/useUsers';

interface PopularCoursesSectionProps {
  courses: Course[];
  onViewMore?: () => void;
}

export default function PopularCoursesSection({ courses, onViewMore }: PopularCoursesSectionProps) {
  const { users } = useUsers();

  const MAX_DISPLAY_COUNT = 5;

  const displayedCourses = useMemo(() => {
    return courses.slice(0, MAX_DISPLAY_COUNT);
  }, [courses]);

  const renderCourse = useCallback(({ item }: { item: Course }) => (
    <CourseCard course={item}/>
  ), [users]);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Khóa học phổ biến</Text>
        <Pressable onPress={onViewMore} style={styles.moreBtn}>
          <Text style={styles.moreText}>Xem thêm</Text>
        </Pressable>
      </View>

      <FlatList
        data={displayedCourses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.horizontalCourseList}
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
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00bfff',
  },
  moreText: {
    fontSize: 13,
    color: '#00bfff',
    fontWeight: '600',
    marginRight: 4,
  },
  horizontalCourseList: { paddingRight: 20 },
});