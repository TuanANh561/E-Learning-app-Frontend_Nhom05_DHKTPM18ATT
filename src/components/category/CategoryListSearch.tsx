import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../../types';

interface CategoryListSearchProps {
    categories: Category[];
    onCategoryPress: (topicName: string) => void; 
}

// Nhận categories và hàm xử lý khi nhấn
export default function CategoryListSearch({ categories, onCategoryPress }: CategoryListSearchProps) {
    
    const displayedCategories = categories.slice(0, 5);

    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <Pressable onPress={() => {}}><Text style={styles.viewMore}>View more</Text></Pressable>
            </View>
            
            {displayedCategories.map((cat) => (
                <Pressable 
                    key={cat.id} 
                    style={styles.categoryItem} 
                    onPress={() => onCategoryPress(cat.name)}
                >
                    <Ionicons 
                        name={cat.icon_name as any}
                        size={24} 
                        color="#00bfff" 
                        style={styles.categoryIcon} 
                    />
                    <Text style={styles.categoryText}>{cat.name}</Text>
                    <Ionicons name="chevron-forward-outline" size={20} color="#666" />
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewMore: {
        color: '#00bfff',
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    categoryIcon: {
        width: 30,
        marginRight: 10,
    },
    categoryText: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
});