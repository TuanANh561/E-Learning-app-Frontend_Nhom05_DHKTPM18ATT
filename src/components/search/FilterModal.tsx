import React from 'react';
import { View, Text, Modal, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FilterModal({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  return (
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Bộ lọc Khóa học</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close-circle-outline" size={28} color="#666" />
            </Pressable>
          </View>

          {/* Content */}
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>Lọc theo Giá</Text>
            <View style={styles.row}>
              {['Tất cả', 'Miễn phí', 'Có phí'].map((label, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{label}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Lọc theo Danh mục</Text>
            <View style={styles.row}>
              {['Frontend', 'Backend', 'Design', 'Marketing'].map((name, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Pressable style={[styles.button, styles.resetBtn]}>
              <Text style={styles.resetText}>Đặt lại</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.applyBtn]}>
              <Text style={styles.applyText}>Áp dụng</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '80%' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: '#333' },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  tag: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  tagText: { color: '#666' },
  footer: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderTopColor: '#eee' },
  button: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  resetBtn: { backgroundColor: '#eee' },
  applyBtn: { backgroundColor: '#00bfff' },
  resetText: { color: '#666', fontWeight: 'bold' },
  applyText: { color: '#fff', fontWeight: 'bold' },
});
