import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Course } from '../types';

const API_URL = 'http://192.168.1.4:3000/courses'; 

export default function useCourses() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await axios.get(API_URL);
			setCourses(res.data);
		} catch (err: any) {
			setError(err.message || 'Lỗi khi tải khóa học');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { courses, loading, error, refetch: fetchData };
}