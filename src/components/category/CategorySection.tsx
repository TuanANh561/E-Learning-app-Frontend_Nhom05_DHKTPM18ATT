import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import CategoryCard from './CategoryCard';
import { Category } from '../../types'; 

interface CategorySectionProps {
    categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const MAX_DISPLAY_COUNT = 6;

  const displayedCategories = useMemo(() => {
    if (showAllCategories || categories.length <= MAX_DISPLAY_COUNT) {
      return categories;
    }
    return categories.slice(0, MAX_DISPLAY_COUNT);
  }, [categories, showAllCategories]);
  
  const handleViewMoreCategories = useCallback(() => {
      setShowAllCategories(true);
  }, []);
  
  const handleShowLessCategories = useCallback(() => {
      setShowAllCategories(false);
  }, []);

  const renderCategory = useCallback(({ item }: { item: Category }) => (
    <CategoryCard category={item} onPress={() => {}} />
  ), []);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        
        {categories.length > MAX_DISPLAY_COUNT && !showAllCategories && (
            <Pressable onPress={handleViewMoreCategories} style={styles.moreBtn}>
                <Text style={styles.moreText}>Xem thêm</Text>
            </Pressable>
        )}
        {categories.length > MAX_DISPLAY_COUNT && showAllCategories && (
            <Pressable onPress={handleShowLessCategories} style={styles.moreBtn}>
                <Text style={styles.moreText}>Thu lại</Text>
            </Pressable>
        )}
      </View>
      
      <FlatList
        data={displayedCategories} 
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.categoryList}
        horizontal={false} 
        numColumns={2} 
        scrollEnabled={false} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginHorizontal: 15, marginVertical: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
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
  categoryList: { paddingRight: 5, justifyContent: 'space-between' },
});