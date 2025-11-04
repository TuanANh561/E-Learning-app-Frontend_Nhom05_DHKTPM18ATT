import { useEffect, useState } from 'react';
import axios from 'axios';
import { Lesson, Section } from '../types';
import { API_URL } from './api';

interface SectionWithLessons extends Section {
  lessons: Lesson[];
}

export default function useCourseLessons(courseId: number) {
  const [sections, setSections] = useState<SectionWithLessons[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [secRes, lesRes] = await Promise.all([
          axios.get(`${API_URL.sections}?course_id=${courseId}`),
          axios.get(API_URL.lessons),
        ]);

        const sectionsData: Section[] = secRes.data;
        const lessonsData: Lesson[] = lesRes.data;

        const merged = sectionsData.map((section) => ({
          ...section, lessons: lessonsData.filter((l) => Number(l.section_id) === Number(section.id)),
        }));

        setSections(merged);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sections/lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  return { sections, loading };
}
