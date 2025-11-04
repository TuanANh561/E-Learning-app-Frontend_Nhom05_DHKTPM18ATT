import React, { useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, Pressable,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useCourses from '../hooks/useCourses';
import CourseCardVertical from '../components/course/CourseCardVertical';

export default function CourseListScreen() {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { title } = route.params as { title: string };

  const { popular, recommended, inspiring, loading } = useCourses();

  const allCourses = useMemo(() => {
    if (title.includes('Popular')) return popular;
    if (title.includes('Recommended')) return recommended;
    if (title.includes('Inspiring')) return inspiring;
    return [];
  }, [title, popular, recommended, inspiring]);

  if (!loading && allCourses.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#1a1a1a" />
          </Pressable>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>0</Text>
          </View>
        </View>

        <View style={styles.empty}>
          <Ionicons name="book-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Chưa có khóa học nào</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="arrow-back" size={26} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{allCourses.length}</Text>
        </View>
      </View>

      <FlatList
        data={allCourses}
        renderItem={({ item }) => <CourseCardVertical course={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
        ListEmptyComponent={
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#00bfff" />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  title: {
    flex: 1,
    marginHorizontal: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    minWidth: 36,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 13,
    color: '#00bfff',
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 30,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { marginTop: 16, fontSize: 16, color: '#999' },
});