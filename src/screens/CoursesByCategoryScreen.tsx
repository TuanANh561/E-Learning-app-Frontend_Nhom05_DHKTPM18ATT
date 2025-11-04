import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable, Alert,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

import CourseCardVertical from '../components/course/CourseCardVertical';
import useCourses from '../hooks/useCourses';
import { Course, RootStackParamList } from '../types';

const PAGE_SIZE = 6;

export default function CoursesByCategoryScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CoursesByCategory'>>();
  const { categoryId, categoryName } = route.params;
  const navigation = useNavigation<any>();

  const { fetchByCategoryId } = useCourses();

  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    async (pageNum: number, append = false, refresh = false) => {
      const setLoad = refresh ? setRefreshing : append ? setLoadingMore : setLoading;
      setLoad(true);

      try {
        const { data, total } = await fetchByCategoryId(categoryId, pageNum, PAGE_SIZE);
        setCourses(append ? (prev) => [...prev, ...data] : data);
        setTotal(total);
        if (!append) setPage(1);
      } catch {
        Alert.alert('Lỗi', 'Không thể tải khóa học');
      } finally {
        setLoad(false);
      }
    },
    [categoryId, fetchByCategoryId]
  );

  useEffect(() => {
    load(1);
  }, [load]);

  const onLoadMore = useCallback(() => {
    if (courses.length < total && !loadingMore && !refreshing) {
      load(page + 1, true);
      setPage((p) => p + 1);
    }
  }, [courses.length, total, loadingMore, refreshing, page, load]);

  const onRefresh = useCallback(() => {
    load(1, false, true);
  }, [load]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          {categoryName}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={courses}
        renderItem={({ item }) => <CourseCardVertical course={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loadingMore ? (
            <ActivityIndicator style={styles.footer} color="#00bfff" />
          ) : null
        }
        ListEmptyComponent={
          loading ? null : (
            <View style={styles.empty}>
              <Ionicons name="book-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>Chưa có khóa học nào</Text>
            </View>
          )
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />

      {loading && courses.length === 0 && (
        <View style={styles.fullLoader}>
          <ActivityIndicator size="large" color="#00bfff" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 26,
  },
  list: { padding: 15 },
  footer: { paddingVertical: 20 },
  fullLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
});