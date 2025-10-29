import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { User, Course } from '../types';
import useUsers from '../hooks/useUsers';
import useCourses from '../hooks/useCourses';
import useFavorites from '../hooks/useFavorites';
import CourseCardVertical from '../components/course/CourseCardVertical';

const LOGGED_IN_STUDENT_ID = 1;

export default function UserProfileScreen() {

  const { users, loading: loadingUsers, error: errorUsers } = useUsers();
  const { courses, loading: loadingCourses, error: errorCourses } = useCourses();
  const { favorites, loading: loadingFavorites, error: errorFavorites } = useFavorites(LOGGED_IN_STUDENT_ID);

  const loggedInUser: User | undefined = useMemo(
    () => users.find(u => Number(u.id) === LOGGED_IN_STUDENT_ID && u.role === 'STUDENT'),
    [users]
  );

  const savedCourses: Course[] = useMemo(() => {
    const favoriteCourseIds = new Set(favorites.map(fav => fav.course_id));
    return courses.filter(course => favoriteCourseIds.has(Number(course.id)));
  }, [courses, favorites]);

  if (loadingUsers || loadingCourses || loadingFavorites) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00bfff" />
        <Text style={{ marginTop: 10 }}>Đang tải dữ liệu người dùng...</Text>
      </View>
    );
  }

  if (errorUsers || errorCourses || errorFavorites || !loggedInUser) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {errorUsers || errorCourses || errorFavorites || `Không tìm thấy người dùng ID: ${LOGGED_IN_STUDENT_ID}`}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header trên cùng */}
      <View style={styles.topHeader}>
        <View style={{ width: 24 }} />
        <Text style={styles.screenTitle}>User Profile</Text>
        <TouchableOpacity onPress={() => console.log('More options')}>
          <Ionicons name="ellipsis-vertical" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={savedCourses}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CourseCardVertical course={item} />}
        ListHeaderComponent={
          <>
            {/* Banner + avatar */}
            <View style={styles.header}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dwzjxsdli/image/upload/v1761704111/background_ewmatc.jpg' }}
                style={styles.coverImage}
              />
              <Image source={{ uri: loggedInUser.avatar_url }} style={styles.profileAvatar} />
              <Text style={styles.profileName}>{loggedInUser.full_name}</Text>
              <Text style={styles.profileRole}>UX/UI Designer</Text>
            </View>

            {/* Thống kê */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>25</Text>
                <Text style={styles.statLabel}>Save</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24</Text>
                <Text style={styles.statLabel}>On Going</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>98</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
            </View>

            {/* Tiêu đề khóa học */}
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>Saved Courses</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>
            Bạn chưa lưu khóa học nào
          </Text>
        }
        contentContainerStyle={styles.courseListVertical}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', padding: 20 },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  screenTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  header: { alignItems: 'center', paddingBottom: 20, marginBottom: 10 },
  coverImage: { width: '100%', height: 120, position: 'absolute' },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 50,
    borderWidth: 4,
    borderColor: '#fff',
    zIndex: 10,
  },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#000', marginTop: 10 },
  profileRole: { fontSize: 14, color: '#666' },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 15,
  },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  statLabel: { fontSize: 13, color: '#666' },

  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  categoryTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  courseListVertical: { paddingBottom: 40, paddingHorizontal: 15 },
});