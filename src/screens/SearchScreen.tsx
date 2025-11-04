import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useCategories from '../hooks/useCategories';
import useCourses from '../hooks/useCourses';
import CategoryListSearch from '../components/category/CategoryListSearch';
import CourseCardVertical from '../components/course/CourseCardVertical';
import RecommendedSection from '../components/course/RecommendedSection';
import FilterModal from '../components/search/FilterModal';
import { Course } from '../types';

const HOT_TOPICS = ['Java', 'SQL', 'Javascript', 'Python', 'Digital marketing', 'Photoshop', 'Watercolor'];

export default function SearchScreen() {
  const { categories, loading: loadCat, error: errCat } = useCategories();
  const { courses, recommended, loading: loadCourse, error: errCourse } = useCourses();
  const navigation = useNavigation<any>();

  const loading = loadCat || loadCourse;
  const error = errCat || errCourse;

  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({ selectedCategoryIds: [], priceRange: 'ALL' });

  useEffect(() => { if (error) Alert.alert('Lỗi kết nối', error); }, [error]);

  const filteredCourses = useMemo(() => {
    const text = searchText.trim().toLowerCase();
    if (!isSearching || !text) return [];
    return courses.filter(c => {
      const cat = categories.find(cat => cat.id === c.category_id)?.name.toLowerCase() || '';
      return c.title.toLowerCase().includes(text) || cat.includes(text);
    });
  }, [isSearching, searchText, courses, categories]);

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
    setIsSearching(!!text.trim());
  }, []);

  const handleTopicPress = useCallback((topic: string) => {
    setSearchText(topic);
    setIsSearching(true);
  }, []);

  const toggleFilterModal = useCallback(() => setIsFilterModalVisible(v => !v), []);
  const handleApplyFilters = useCallback(() => setIsFilterModalVisible(false), []);
  const handleResetFilters = useCallback(() => setFilters({ selectedCategoryIds: [], priceRange: 'ALL' }), []);

  const renderCourseCard = useCallback(({ item }: { item: Course }) => (
    <View style={styles.courseResultItem}>
      <CourseCardVertical course={item} />
    </View>
  ), []);

  if (loading) return <ActivityIndicator size="large" color="#00bfff" style={styles.loadingIndicator} />;

  const DefaultView = (
    <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.hotTopicsTitle}>Từ khóa được tìm nhiều</Text>
      <View style={styles.hotTopicsContainer}>
        {HOT_TOPICS.map(topic => (
          <Pressable key={topic} style={styles.topicTag} onPress={() => handleTopicPress(topic)}>
            <Text style={styles.topicText}>{topic}</Text>
          </Pressable>
        ))}
      </View>
      <CategoryListSearch categories={categories} onCategoryPress={handleTopicPress} />
      <RecommendedSection
        courses={recommended}
        onViewMore={() => navigation.navigate('CourseListScreen', { title: 'Recommended for you' })}
      />
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const ResultsView = (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsCount}>{filteredCourses.length} Kết quả được tìm thấy</Text>
      <FlatList
        data={filteredCourses}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCourseCard}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>Không tìm thấy khóa học nào phù hợp.</Text>}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.inputContainer}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Nhập từ khóa tìm kiếm..."
            value={searchText}
            onChangeText={handleSearch}
            onSubmitEditing={() => setIsSearching(true)}
            returnKeyType="search"
            autoCapitalize="none"
          />
        </View>
        <Pressable style={styles.filterButton} onPress={toggleFilterModal}>
          <Ionicons name="filter" size={20} color="#fff" />
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View>

      {isSearching ? ResultsView : DefaultView}

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={toggleFilterModal}
        // categories={categories}
        // currentFilters={filters}
        // onApply={handleApplyFilters}
        // onReset={handleResetFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingIndicator: { flex: 1, justifyContent: 'center' },
  contentContainer: { paddingHorizontal: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  inputContainer: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f1f1f1', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8, marginRight: 10
  },
  input: { flex: 1, marginLeft: 8, fontSize: 16 },
  filterButton: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#00bfff', borderRadius: 8,
    paddingVertical: 8, paddingHorizontal: 12
  },
  filterText: { color: '#fff', fontWeight: 'bold', marginLeft: 5 },
  hotTopicsTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  hotTopicsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  topicTag: {
    borderWidth: 1, borderColor: '#00bfff', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, marginBottom: 8
  },
  topicText: { color: '#00bfff', fontSize: 14 },
  resultsContainer: { flex: 1, paddingHorizontal: 20 },
  resultsCount: { fontSize: 14, color: '#666', marginVertical: 8 },
  courseResultItem: { marginBottom: 10 },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
});
