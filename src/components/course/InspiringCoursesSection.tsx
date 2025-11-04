import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import CourseCardVertical from '../course/CourseCardVertical';
import useUsers from '../../hooks/useUsers';
import { Course } from '../../types';

interface InspiringCoursesSectionProps {
  courses: Course[];
  onViewMore?: () => void;
}

const MAX_DISPLAY_COUNT = 4;

export default function InspiringCoursesSection({ courses, onViewMore }: InspiringCoursesSectionProps) {
  const { users } = useUsers();

  const displayedCourses = useMemo(() => {
    return courses.slice(0, MAX_DISPLAY_COUNT);
  }, [courses]);

  const renderCourse = useCallback(
    ({ item }: { item: Course }) => <CourseCardVertical course={item} />,
    [users]
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Khóa học truyền cảm hứng</Text>
        {courses.length > MAX_DISPLAY_COUNT && (
          <Pressable onPress={onViewMore} style={styles.moreBtn}>
            <Text style={styles.moreText}>Xem thêm</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={displayedCourses}
        renderItem={renderCourse}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={styles.verticalCourseList}
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
  verticalCourseList: { paddingBottom: 5 },
});