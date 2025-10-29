import { useEffect, useMemo } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Alert, Pressable, Image } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useCategories from '../hooks/useCategories';
import useCourses from '../hooks/useCourses';
import useUsers from '../hooks/useUsers';
import CategorySection from '../components/category/CategorySection';
import RecommendedSection from '../components/course/RecommendedSection';
import InspiringCoursesSection from '../components/course/InspiringCoursesSection';
import PopularCoursesSection from '../components/course/PopularCoursesSection';
import TopTeachersSection from '../components/teacher/TopTeachersSection';

export default function HomeScreen() {
  const { categories, loading: l1, error: e1 } = useCategories();
  const { courses, loading: l2, error: e2 } = useCourses();
  const { users, loading: l3, error: e3 } = useUsers();

  const loading = l1 || l2 || l3;
  const error = e1 || e2 || e3;
  
  const allUsers = users; 
  const teachers = useMemo(() => allUsers.filter((u) => u.role === 'TEACHER'), [allUsers]);

  useEffect(() => {
    if (error) {Alert.alert('Lỗi kết nối', error)}
  }, [error]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00bfff" style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      
      {/* App Header (Hello, Cart, Notification) */}
      <View style={styles.appHeader}>
        <View>
            <Text style={styles.greeting}>Hello, Oxy!</Text>
            <Text style={styles.subtitle}>What do you want to learn today?</Text>
        </View>
        <View style={styles.headerIcons}>
            <Ionicons name="cart-outline" size={24} color="white" style={{ marginRight: 10 }} />
            <Ionicons name="notifications-outline" size={24} color="white" />
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} scrollEnabled={true}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>PROJECT MANAGEMENT</Text>
            <Text style={styles.discount}>20% OFF</Text>
            <Pressable style={styles.joinButton} onPress={() => {}}>
              <Text style={styles.joinText}>JOIN NOW</Text>
            </Pressable>
          </View>
          <Image source={{ uri: 'https://res.cloudinary.com/dwzjxsdli/image/upload/v1761705336/banner_jlbyvl.jpg' }} 
            style={styles.bannerImage} resizeMode="cover"/>
        </View>

        <CategorySection categories={categories} />

        <PopularCoursesSection courses={courses} users={allUsers} onViewMore={() => {}} />
        <RecommendedSection courses={courses.slice(4, 6)} users={allUsers} onViewMore={() => {}} />
        <InspiringCoursesSection courses={courses.slice(6, 9)} users={allUsers} onViewMore={() => {}} />

        <TopTeachersSection teachers={teachers} onViewMore={() => {}} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  
  appHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    backgroundColor: '#00bfff',
  },
  headerIcons: { flexDirection: 'row' },
  greeting: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 14, color: 'white' },

  banner: { 
    backgroundColor: '#9b59b6', 
    marginHorizontal: 15,
    marginVertical: 10, 
    padding: 20, 
    borderRadius: 10, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
  },
  bannerText: { maxWidth: '60%' },
  bannerTitle: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  discount: { fontSize: 14, color: '#fff', marginTop: 4, marginBottom: 10 },
  joinButton: { 
    backgroundColor: '#00bfff', 
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    borderRadius: 5, 
  },
  joinText: { color: '#fff', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  bannerImage: { width: '40%', height: 100, borderRadius: 5, marginLeft: 10 },
});