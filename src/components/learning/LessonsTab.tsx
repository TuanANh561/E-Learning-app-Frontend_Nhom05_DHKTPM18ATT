import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Lesson, Section } from '../../types';

interface LessonListProps {
  courseId: number;
  allLessons: Lesson[];
  allSections: Section[];
  currentLessonId: number;
  onLessonPress: (lesson: Lesson) => void;
}

const LessonsTab: React.FC<LessonListProps> = ({
  courseId,
  allLessons,
  allSections,
  currentLessonId,
  onLessonPress,
}) => {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  const sectionsWithLessons = React.useMemo(() => {
    const courseSections = allSections.filter(s => s.course_id === courseId);
    return courseSections.map(section => ({
      ...section,
      lessons: allLessons.filter(l => l.section_id === section.id),
    }));
  }, [courseId, allSections, allLessons]);

  useEffect(() => {
    if (sectionsWithLessons.length > 0) {
      setOpenSections({ [9]: true });
    }
  }, [sectionsWithLessons]);

  const toggleSection = (sectionId: number) => {
    setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  return (
    <View style={styles.tabContent}>
      {sectionsWithLessons.map(section => {
        const isOpen = !!openSections[section.id];
        return (
          <View key={section.id}>
            <Pressable style={styles.sectionHeader} onPress={() => toggleSection(section.id)}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#666" />
            </Pressable>

            {isOpen &&
              section.lessons.map((lesson, idx) => (
                <Pressable
                  key={lesson.id}
                  style={[
                    styles.lessonItem,
                    lesson.id === currentLessonId && { backgroundColor: '#e6f7ff' },
                  ]}
                  onPress={() => onLessonPress(lesson)}
                >
                  <Text style={styles.lessonNumber}>
                    {(idx + 1).toString().padStart(2, '0')}
                  </Text>
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.duration}>{lesson.duration_mins.toFixed(1)} phút</Text>
                  </View>
                  <Ionicons
                    name={
                      lesson.id === currentLessonId
                        ? 'play-circle'
                        : lesson.is_free
                        ? 'play-circle-outline'
                        : 'lock-closed-outline'
                    }
                    size={20}
                    color={lesson.id === currentLessonId ? '#00bfff' : lesson.is_free ? '#00bfff' : '#999'}
                  />
                  {lesson.id === 9 && (
                    <Ionicons name="checkmark-circle" size={20} color="#00bfff" style={{ marginLeft: 8 }} />
                  )}
                </Pressable>
              ))}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContent: { backgroundColor: '#fff' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  lessonNumber: { width: 32, fontSize: 14, color: '#666' },
  lessonInfo: { flex: 1, marginLeft: 12 },
  lessonTitle: { fontSize: 14, color: '#333' },
  duration: { fontSize: 12, color: '#999', marginTop: 2 },
});

export default LessonsTab;