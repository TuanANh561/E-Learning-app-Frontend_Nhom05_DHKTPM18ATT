import { User } from '../../types';
import { Image, StyleSheet, Text, View } from 'react-native';

type TeacherCardProps = {
	teacher: User;
};

export default function TeacherCard({ teacher }: TeacherCardProps) {
	return (
		<View style={styles.container}>
			<Image source={{ uri: teacher.avatar_url || 'https://via.placeholder.com/50' }} style={styles.avatar} />
			<View style={styles.info}>
				<Text style={styles.name}>{teacher.full_name}</Text>
				<Text style={styles.rating}>★ 4.5 (1233)</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', alignItems: 'center', padding: 10 },
	avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
	info: { flex: 1 },
	name: { fontSize: 16, fontWeight: 'bold', color: '#000' },
	rating: { fontSize: 14, color: '#666' },
});