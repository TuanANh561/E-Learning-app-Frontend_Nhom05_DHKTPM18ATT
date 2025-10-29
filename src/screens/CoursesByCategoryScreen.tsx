import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CourseCardVertical from '../components/course/CourseCardVertical';
import useCourses from '../hooks/useCourses';
import useUsers from '../hooks/useUsers';
import { Course, RootStackParamList } from '../types';

export default function CoursesByCategoryScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CoursesByCategory'>>();
  const categoryId = route.params.categoryId;
  const categoryName = route.params.categoryName;

  const navigation = useNavigation();

  const { fetchByCategoryId, loading: globalLoading } = useCourses();
  const { users, loading: usersLoading } = useUsers();

  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const limit = 6;

  const loading = globalLoading || usersLoading;

  const loadCourses = useCallback(
    async (pageNum: number, isLoadMore = false, isRefresh = false) => {
      if (!isLoadMore && !isRefresh) setIsLoadingMore(true);
      if (isRefresh) setIsRefreshing(true);

      try {
        const result = await fetchByCategoryId(categoryId, pageNum, limit);
        const newCourses = result.data;

        if (isLoadMore) {
          setCourses((prev) => [...prev, ...newCourses]);
        } else {
          setCourses(newCourses);
        }
        setTotal(result.total);
        if (!isLoadMore) setPage(1);
      } catch (err) {
        Alert.alert('Lỗi', 'Không thể tải khóa học. Vui lòng thử lại.');
      } finally {
        setIsLoadingMore(false);
        setIsRefreshing(false);
      }
    },
    [categoryId, fetchByCategoryId]
  );

  useEffect(() => {
    loadCourses(1, false, false);
  }, [loadCourses]);

  const handleLoadMore = useCallback(() => {
    if (courses.length < total && !isLoadingMore && !isRefreshing) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadCourses(nextPage, true, false);
    }
  }, [courses.length, total, isLoadingMore, isRefreshing, page, loadCourses]);

  const handleRefresh = useCallback(() => {
    loadCourses(1, false, true);
  }, [loadCourses]);

  const renderItem = useCallback(({ item }: { item: Course }) => (
      <CourseCardVertical course={item} />
    ),[users]);

  const keyExtractor = useCallback((item: Course) => item.id.toString(), []);

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#00bfff" />
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="book-outline" size={60} color="#ccc" />
      <Text style={styles.emptyText}>Chưa có khóa học nào trong danh mục này</Text>
    </View>
  );

  if (loading && courses.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00bfff" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginRight: 26,
  },
  list: {
    padding: 15,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});