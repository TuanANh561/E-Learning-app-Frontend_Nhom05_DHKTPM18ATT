import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useCategories from '../hooks/useCategories'; 
import useCourses from '../hooks/useCourses';
import useUsers from '../hooks/useUsers';
import CategoryListSearch from '../components/category/CategoryListSearch';
import CourseCard from '../components/course/CourseCard';
import CourseCardVertical from '../components/course/CourseCardVertical';
import { Course } from '../types';

// Dữ liệu mô phỏng Topics
const HOT_TOPICS = ['Java', 'SQL', 'Javascript', 'Python', 'Digital marketing', 'Photoshop', 'Watercolor'];

export default function SearchScreen() {
    const { categories, loading: l1, error: e1 } = useCategories();
    const { courses, loading: l2, error: e2 } = useCourses();
    const { users, loading: l3, error: e3 } = useUsers();

    const loading = l1 || l2 || l3;
    const error = e1 || e2 || e3;

    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<Course[]>([]); 

    const allUsers = users;
    
    const recommendedCourses = useMemo(() => courses.slice(0, 2), [courses]);


    useEffect(() => {
        if (error) {
            Alert.alert('Lỗi kết nối', error);
        }
    }, [error]);

    useEffect(() => {
        if (searchText.trim().length > 0 && isSearching) {
            const filtered = courses.filter(course => 
                course.title.toLowerCase().includes(searchText.toLowerCase()) || 
                categories.find(cat => cat.id === course.category_id)?.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setSearchResults(filtered);
        }
    }, [searchText, isSearching, courses, categories]);

    const handleSearchChange = useCallback((text: string) => {
        setSearchText(text);
        if (text.trim() === '') {
            setIsSearching(false);
        }
    }, []);

    const handleSearchSubmit = useCallback(() => {
        if (searchText.trim().length > 0) {
            setIsSearching(true);
        }
    }, [searchText]);
    
    const handleTopicOrCategoryPress = useCallback((topicName: string) => {
        setSearchText(topicName);
        setIsSearching(true);
    }, []);
    
    const renderRecommendedCard = useCallback(({ item }: { item: Course }) => (
        <View>
            <CourseCard course={item} 
                users={allUsers} 
            />
        </View>
    ), [allUsers]);
    
    const renderCourseCardResult = useCallback(({ item }: { item: Course }) => (
        <View style={styles.courseResultItem}>
            <CourseCardVertical 
                course={item} 
                users={allUsers} 
            />
        </View>
    ), [allUsers]);


    if (loading) {
        return <ActivityIndicator size="large" color="#00bfff" style={styles.loadingIndicator} />;
    }

    const renderDefaultState = () => (
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {/* Hot Topics */}
            <Text style={styles.hotTopicsTitle}>Hot topics</Text>
            <View style={styles.hotTopicsContainer}>
                {HOT_TOPICS.map((topic, index) => (
                    <Pressable 
                        key={index} 
                        style={styles.topicTag} 
                        onPress={() => handleTopicOrCategoryPress(topic)}
                    >
                        <Text style={styles.topicText}>{topic}</Text>
                    </Pressable>
                ))}
            </View>

            {/* Categories */}
            <CategoryListSearch categories={categories} onCategoryPress={handleTopicOrCategoryPress} />

            {/* Recommended for you (Cuộn ngang) */}
            <View style={[styles.sectionHeader, { marginTop: 20 }]}>
                <Text style={styles.sectionTitle}>Recommended for you</Text>
                <Pressable onPress={() => {}}><Text style={styles.viewMore}>View more</Text></Pressable>
            </View>
            <FlatList
                data={recommendedCourses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderRecommendedCard}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContainer}
            />

            <View style={{ height: 40 }} />
        </ScrollView>
    );

    const renderResultsState = () => (
        <View style={styles.resultsContainer}>
            <Text style={styles.resultsCount}>{searchResults.length} Results</Text>
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCourseCardResult}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Thanh Tìm kiếm và Filter */}
            <View style={styles.searchBar}>
                <View style={styles.inputContainer}>
                    <Ionicons name="search-outline" size={20} color="#666" />
                    <TextInput
                        style={styles.input}
                        placeholder={isSearching ? searchText : "Search for course"}
                        value={searchText}
                        onChangeText={handleSearchChange}
                        onSubmitEditing={handleSearchSubmit}
                        returnKeyType="search"
                        autoCapitalize="none"
                    />
                </View>
                <Pressable style={styles.filterButton} onPress={() => {}}>
                    <Ionicons name="filter" size={20} color="#fff" />
                    <Text style={styles.filterText}>Filter</Text>
                </Pressable>
            </View>

            {/* Hiển thị trạng thái tương ứng */}
            {isSearching ? renderResultsState() : renderDefaultState()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loadingIndicator: { flex: 1, justifyContent: 'center' },
    contentContainer: { paddingHorizontal: 20 },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginRight: 10,
    },
    input: { flex: 1, marginLeft: 8, fontSize: 16 },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00bfff',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    filterText: { color: '#fff', fontWeight: 'bold', marginLeft: 5 },
    
    // Default State
    hotTopicsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 10 },
    hotTopicsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
    topicTag: {
        borderWidth: 1,
        borderColor: '#00bfff',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    topicText: { color: '#00bfff', fontSize: 14 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold' },
    viewMore: { color: '#00bfff' },
    recommendedCourseCard: { width: 180, marginRight: 10 },
    horizontalListContainer: { paddingRight: 20 },

    // Results State
    resultsContainer: { flex: 1, paddingHorizontal: 20 },
    resultsCount: { fontSize: 14, color: '#666', marginBottom: 10, marginTop: 5 },
    courseResultItem: { marginBottom: 10 },
});