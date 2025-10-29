import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { Category } from '../../types';
import { useCallback } from 'react';

type CategoryCardProps = {
  category: Category;
  onPress: () => void;
};

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  const colors = ['#00bfff', '#9b59b6', '#e74c3c', '#2ecc71', '#f1c40f'];
  const bgColor = colors[(category.id % colors.length)]; 

  const handlePress = useCallback(() => onPress(), [onPress]);

  return (
    <Pressable 
      onPress={handlePress} 
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      <Image source={{ uri: category.image_Url }} style={{ width: 50, height: 50, marginBottom: 10 }} />
      <Text style={styles.text}>{category.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});