import { Course, User } from '../../types';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useMemo, useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type CourseCardVerticalProps = {
  course: Course;
  users: User[];
};

export default function CourseCardVertical({ course, users }: CourseCardVerticalProps) {
  const teacher = useMemo(
    () => users.find((u) => u.id === course.teacher_id && u.role === 'TEACHER'),
    [course.teacher_id, users]
  );

  const [isSaved, setIsSaved] = useState(false);

  const navigation = useNavigation();

  const toggleSaved = useCallback(() => {
    setIsSaved(prev => !prev);
  }, [isSaved]);

  const handlePress = useCallback(() => {
    (navigation as any).navigate('CourseDetail', { courseId: course.id });
  }, [navigation, course.id]);

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{course.title}</Text>
          <Pressable onPress={toggleSaved} hitSlop={10}>
            <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={24} color={isSaved ? "#00bfff" : "#666"} />
          </Pressable>
        </View>
        <Text style={styles.teacher}>{teacher ? teacher.full_name : 'Unknown'}</Text>
        <Text style={styles.price}>${course.price}</Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>★ {course.rating_avg.toFixed(1)} ({course.rating_count})</Text>
          <Text style={styles.lessons}>• {course.lesson_count} lessons</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row',
  },
  thumbnail: { 
    width: 80, 
    height: 80, 
    borderRadius: 5, 
    marginRight: 10,
    resizeMode: 'cover',
  },
  info: { 
    flex: 1, 
    justifyContent: 'space-between', 
    paddingVertical: 2 
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#000',
    maxWidth: '85%',
  },
  teacher: { fontSize: 13, color: '#666', marginBottom: 5 },
  price: { fontSize: 16, color: '#00bfff', fontWeight: 'bold' },
  rating: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { fontSize: 13, color: '#000', marginRight: 5 },
  lessons: { fontSize: 13, color: '#666' },
});