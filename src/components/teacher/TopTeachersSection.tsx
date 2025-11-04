import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import TeacherCard from './TeacherCard';
import { User } from '../../types';

const MAX_SHOW = 4;

export default function TopTeachersSection({ teachers }: { teachers: User[] }) {
  const [expanded, setExpanded] = useState(false);

  const showMoreBtn = teachers.length > MAX_SHOW;

  const list = expanded ? teachers : teachers.slice(0, MAX_SHOW);

  const toggle = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Giáo viên yêu thích</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{teachers.length}</Text>
          </View>
        </View>

        {showMoreBtn && (
          <Pressable onPress={toggle} style={styles.moreBtn}>
            <Text style={styles.moreText}>
              {expanded ? 'Thu lại' : 'Xem thêm'}
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.grid}>
        {list.map((teacher) => (
          <View key={teacher.id} style={styles.card}>
            <TeacherCard teacher={teacher} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#00bfff',
    fontWeight: '600',
  },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00bfff',
  },
  moreText: {
    fontSize: 13,
    color: '#00bfff',
    fontWeight: '600',
    marginRight: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',          
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16,
  },
});