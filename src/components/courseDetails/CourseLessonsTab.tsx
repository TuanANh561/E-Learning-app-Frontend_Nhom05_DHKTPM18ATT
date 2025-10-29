import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Lesson, Section } from '../../types';

// Interfaces được định nghĩa ở ngoài file này (trong types/index.ts)
interface OpenSectionsState { [key: number]: boolean; }
interface CourseLessonsTabProps { lessons: Lesson[]; sections: Section[]; }
interface SectionWithLessons extends Section { lessons: Lesson[]; } 

export default function CourseLessonsTab({ lessons, sections }: CourseLessonsTabProps) {
    const [openSections, setOpenSections] = useState<OpenSectionsState>({ 9: true }); 
    const activeLessonId = 105; 

    const toggleSection = (sectionId: number) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    }
    
    // ✅ GOM NHÓM BÀI HỌC VÀO TỪNG SECTION
    const sectionsWithLessons: SectionWithLessons[] = useMemo(() => {
        const lessonMap = lessons.reduce((acc, l) => {
            acc[l.section_id] = acc[l.section_id] || []; 
            acc[l.section_id].push(l);
            return acc;
        }, {} as Record<number, Lesson[]>);
        
        return sections.map(section => ({
            ...section,
            lessons: lessonMap[section.id] || []
        }));
    }, [sections, lessons]);
    
    return (
        <View style={styles.tabContent}>
            {sectionsWithLessons.map((section) => {
                const isOpen = !!openSections[section.id];
                
                return (
                    // PHẦN HEADER CỦA ACCORDION
                    <View key={section.id}>
                        <Pressable style={styles.sectionHeaderLesson} onPress={() => toggleSection(section.id)}>
                            <Text style={styles.sectionTitleLesson}>{section.title}</Text>
                            <Ionicons name={isOpen ? "chevron-up-outline" : "chevron-down-outline"} size={24} color="#000" />
                        </Pressable>
                        
                        {/* DANH SÁCH BÀI HỌC (CHỈ HIỂN THỊ KHI MỞ) */}
                        {isOpen && section.lessons.map((lesson, lessonIndex) => {
                            const isPlaying = lesson.id === activeLessonId; 
                            
                            return (
                                <View key={lesson.id} style={[styles.lessonItem, isPlaying && styles.lessonItemActive]}>
                                    <Text style={[styles.lessonNumber, isPlaying && styles.lessonNumberActive]}>
                                        {(lessonIndex + 1).toString().padStart(2, '0')}
                                    </Text>
                                    <View style={styles.lessonInfo}>
                                        <Text style={[styles.lessonTitle, isPlaying && styles.lessonTitleActive]}>{lesson.title}</Text>
                                        <Text style={styles.lessonDuration}>{lesson.duration_mins.toFixed(2)} mins</Text>
                                    </View>
                                    <Ionicons 
                                        name={isPlaying ? "play-circle" : lesson.is_free ? "play-outline" : "lock-closed-outline"} 
                                        size={24} 
                                        color={isPlaying ? "#00bfff" : lesson.is_free ? "#00bfff" : "#666"} 
                                    />
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabContent: { padding: 0 },
    sectionHeaderLesson: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    sectionTitleLesson: { fontSize: 16, fontWeight: 'bold' },
    lessonItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    lessonItemActive: { backgroundColor: '#e0f7ff', borderRadius: 5, paddingHorizontal: 5 },
    lessonNumber: { fontSize: 14, width: 30, color: '#666', marginRight: 10, textAlign: 'center' },
    lessonNumberActive: { color: '#00bfff' },
    lessonInfo: { flex: 1 },
    lessonTitle: { fontSize: 14, color: '#000' },
    lessonTitleActive: { fontWeight: 'bold' },
    lessonDuration: { fontSize: 12, color: '#999' },
});