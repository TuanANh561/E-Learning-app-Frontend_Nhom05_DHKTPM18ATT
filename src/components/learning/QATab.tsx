import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

// DỮ LIỆU GIẢ ĐỊNH (có thể di chuyển ra file riêng nếu cần)
const DUMMY_QNA_USERS = [
  {
    id: 10,
    username: 'reviewer02',
    full_name: 'Jane Barry',
    email: '',
    password: '',
    role: 'STUDENT',
    avatar_url: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    id: 12,
    username: 'thomas',
    full_name: 'Thomas',
    email: '',
    password: '',
    role: 'STUDENT',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
  {
    id: 13,
    username: 'jenny',
    full_name: 'Jenny Barry',
    email: '',
    password: '',
    role: 'STUDENT',
    avatar_url: 'https://randomuser.me/api/portraits/women/48.jpg',
  },
];

const DUMMY_QNA_DATA = [
  {
    id: 1,
    user: DUMMY_QNA_USERS[0],
    content: 'Deserunt minim incididunt cillum nostrud do voluptitate...',
    likes: 23,
    comments: 5,
    time: 'A day ago',
  },
  {
    id: 2,
    user: { ...DUMMY_QNA_USERS[1], full_name: 'Thomas' },
    content: 'Deserunt minim incididunt cillum nostrud do voluptitate...',
    likes: 23,
    comments: 5,
    time: 'A day ago',
  },
  {
    id: 3,
    user: DUMMY_QNA_USERS[2],
    content: 'Deserunt minim incididunt cillum nostrud do voluptitate...',
    likes: 23,
    comments: 5,
    time: 'A day ago',
  },
];

const QnAItem: React.FC<{ qna: typeof DUMMY_QNA_DATA[0] }> = ({ qna }) => (
  <View style={styles.qnaItem}>
    <Image source={{ uri: qna.user.avatar_url }} style={styles.qnaAvatar} />
    <View style={styles.qnaContent}>
      <Text style={styles.qnaUserName}>{qna.user.full_name}</Text>
      <Text style={styles.qnaTime}>{qna.time}</Text>
      <Text style={styles.qnaText}>{qna.content}</Text>
      <View style={styles.qnaActions}>
        <Text style={styles.qnaActionText}>Heart {qna.likes}</Text>
        <Text style={[styles.qnaActionText, { marginLeft: 15 }]}>Chat {qna.comments} Comment</Text>
      </View>
    </View>
  </View>
);

const QATab = () => (
  <View style={styles.qaTabContainer}>
    <ScrollView style={{ flex: 1 }}>
      {DUMMY_QNA_DATA.map(qna => (
        <QnAItem key={qna.id} qna={qna} />
      ))}
    </ScrollView>
    <View style={styles.qnaInputContainer}>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dwzjxsdli/image/upload/v1761704109/avatar1_k4i2wd.jpg' }}
        style={styles.qnaAvatarInput}
      />
      <View style={styles.qnaInputInner}>
        <View style={styles.emojiContainer}>
          <Text>Smiling Face</Text>
          <Text>Loving Face</Text>
          <Text>Red Heart</Text>
          <Text>Party Popper</Text>
          <Text>Face with Rolling Eyes</Text>
          <Text>Fire</Text>
        </View>
        <Text style={styles.qnaInputPlaceholder}>Write a Q&A...</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  qaTabContainer: { flex: 1, minHeight: 400 },
  qnaItem: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  qnaAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  qnaContent: { flex: 1 },
  qnaUserName: { fontSize: 14, fontWeight: 'bold' },
  qnaTime: { fontSize: 12, color: '#999', marginBottom: 5 },
  qnaText: { fontSize: 14, color: '#333', marginBottom: 10 },
  qnaActions: { flexDirection: 'row', alignItems: 'center' },
  qnaActionText: { fontSize: 12, color: '#666', marginLeft: 5 },
  qnaInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  qnaAvatarInput: { width: 40, height: 40, borderRadius: 20, marginRight: 10, marginTop: 5 },
  qnaInputInner: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 25, paddingHorizontal: 15, paddingVertical: 8 },
  emojiContainer: { flexDirection: 'row', marginBottom: 5 },
  qnaInputPlaceholder: { color: '#999', fontSize: 14 },
});

export default QATab;