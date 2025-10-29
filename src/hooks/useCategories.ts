import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Category } from '../types';
import { API_URL } from './api';

export default function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await axios.get(API_URL.categories);
			setCategories(res.data);
		} catch (err: any) {
			setError(err.message || 'Lỗi khi tải danh mục');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { categories, loading, error, refetch: fetchData };
}