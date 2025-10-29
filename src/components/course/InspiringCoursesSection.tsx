import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import CourseCardVertical from '../course/CourseCardVertical';
import { Course, User } from '../../types';
import useUsers from '../../hooks/useUsers';

interface InspiringCoursesSectionProps {
  courses: Course[];
  onViewMore?: () => void;
}

export default function InspiringCoursesSection({ courses, onViewMore }: InspiringCoursesSectionProps) {
  const { users } = useUsers();
  const renderCourse = useCallback(({ item }: { item: Course }) => (
    <CourseCardVertical course={item} />
  ), [users]);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Course that inspires</Text>
        <Pressable onPress={onViewMore}>
          <Text style={styles.viewMore}>View more</Text>
        </Pressable>
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id.toString()}
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
  viewMore: { fontSize: 14, color: '#00bfff' },
  verticalCourseList: { paddingBottom: 5 },
});