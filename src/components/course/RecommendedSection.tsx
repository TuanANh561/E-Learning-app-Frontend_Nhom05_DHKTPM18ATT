import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import CourseCard from '../course/CourseCard';
import { Course, User } from '../../types';

interface RecommendedSectionProps {
  courses: Course[];
  users: User[];
  onViewMore?: () => void;
}

const MAX_DISPLAY_COUNT = 2;

export default function RecommendedSection({ courses, users, onViewMore }: RecommendedSectionProps) {
  const displayedCourses = useMemo(() => {
    return courses.slice(0, MAX_DISPLAY_COUNT);
  }, [courses]);

  const renderCourse = useCallback(({ item }: { item: Course }) => (
    <CourseCard course={item} users={users} />
  ), [users]);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        <Pressable onPress={onViewMore}>
          <Text style={styles.viewMore}>View more</Text>
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
  viewMore: { fontSize: 14, color: '#00bfff' },
  horizontalCourseList: { paddingRight: 20 },
});