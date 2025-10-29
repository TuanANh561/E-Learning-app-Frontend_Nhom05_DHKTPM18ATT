import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CourseCardVertical from '../components/course/CourseCardVertical';
import useUsers from '../hooks/useUsers';
import useCourses from '../hooks/useCourses';
import { Course, RootStackParamList } from '../types';

type TabType = 'overview' | 'courses';

export default function TeacherProfileScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'TeacherProfile'>>();
  const teacherId = route.params.teacherId;
  const navigation = useNavigation();

  const { users, loading: usersLoading } = useUsers();
  const { fetchByTeacherId, loading: coursesLoading } = useCourses();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [teacherCourses, setTeacherCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const limit = 6;

  const teacher = useMemo(() => users.find(u => u.id === teacherId && u.role === 'TEACHER'), [users, teacherId]);

  const loadTeacherCourses = useCallback(async (pageNum = 1, isLoadMore = false) => {
    if (!isLoadMore) setIsLoadingMore(true);
    try {
      const result = await fetchByTeacherId(teacherId, pageNum, limit);
      setTeacherCourses(isLoadMore ? prev => [...prev, ...result.data] : result.data);
      setTotal(result.total);
      setPage(pageNum);
    } catch {
      Alert.alert('Lỗi', 'Không thể tải khóa học');
    } finally {
      setIsLoadingMore(false);
      setIsRefreshing(false);
    }
  }, [teacherId, fetchByTeacherId]);

  useEffect(() => { loadTeacherCourses(1); }, [loadTeacherCourses]);

  const handleLoadMore = useCallback(() => {
    if (teacherCourses.length < total && !isLoadingMore) loadTeacherCourses(page + 1, true);
  }, [teacherCourses.length, total, isLoadingMore, page, loadTeacherCourses]);

  const renderCourse = ({ item }: { item: Course }) => <CourseCardVertical course={item} />;

  if (usersLoading || !teacher)
    return <SafeAreaView style={styles.center}><ActivityIndicator size="large" color="#00bfff" /></SafeAreaView>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Teacher's Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      <FlatList
        data={activeTab === 'overview' ? teacherCourses.slice(0, 3) : teacherCourses}
        renderItem={renderCourse}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.coverContainer}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1552664730-d307ca884978' }} style={styles.coverImage} />
              <Image source={{ uri: teacher.avatar_url }} style={styles.avatar} />
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.name}>{teacher.full_name}</Text>
              <Text style={styles.job}>UI/UX Designer</Text>
            </View>

            <View style={styles.tabContainer}>
              {(['overview', 'courses'] as TabType[]).map(tab => (
                <Pressable key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && styles.activeTab]}>
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab.toUpperCase()}</Text>
                </Pressable>
              ))}
            </View>
          </>
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={() => loadTeacherCourses(1)}
        ListEmptyComponent={<Text style={styles.emptyText}>Chưa có khóa học</Text>}
        ListFooterComponent={isLoadingMore ? <ActivityIndicator style={{ padding: 20 }} color="#00bfff" /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  coverContainer: { height: 120, marginBottom: 40 },
  coverImage: { width: '100%', height: '100%' },
  avatar: { width: 80, height: 80, borderRadius: 40, position: 'absolute', bottom: -40, left: 20, borderWidth: 3, borderColor: '#fff' },
  infoSection: { alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 20, fontWeight: 'bold' },
  job: { fontSize: 16, color: '#666' },
  tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee', marginHorizontal: 15 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderColor: '#00bfff' },
  tabText: { color: '#666' },
  activeTabText: { color: '#00bfff', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
});
